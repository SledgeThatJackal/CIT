package dev.adamico.cit.Services;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.adamico.cit.Exceptions.GeneralExportException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.DataSource;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.*;

@Service
public class EximService {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    ObjectMapper objectMapper;

    private final HashMap<String, HashMap<String, String>> tableSetup = new HashMap<>();

    private final HashMap<String, HashMap<Long, Long>> ids = new HashMap<>();

    private final Set<String> rootRowTables = new HashSet<>(List.of("itemtype_table"));

    private final HashMap<String, List<String>> uniqueRowTables = new HashMap<>();
    private final HashMap<String, HashMap<String, Integer>> columnTypes = new HashMap<>();

    private final String HIERARCHICAL_VARIABLE = "level";

    private final String PLACEHOLDER_COLUMN_NAME = "placeholder";

    private static final Logger logger = LoggerFactory.getLogger(EximService.class);

    public Resource exportDatabase() {
        File output = new File("cit_export.json");

        logger.debug("Starting Database Export. Export file path: {}", output.getAbsolutePath());

        try(Connection connection = dataSource.getConnection();
            FileOutputStream fos = new FileOutputStream(output);
            OutputStreamWriter writer = new OutputStreamWriter(fos, StandardCharsets.UTF_8);
            JsonGenerator generator = new JsonFactory().createGenerator(writer)) {

            List<String> tableOrder = getOrder(connection);
            Iterator<String> tables = tableOrder.iterator();

            generator.writeStartObject();

            createTableSetupObject(connection, tableOrder, generator);

            while (tables.hasNext()) {
                String tableName = tables.next();

                if("flyway_schema_history".equalsIgnoreCase(tableName)) {
                    logger.debug("Skipping table: {}", tableName);
                    continue;
                }

                logger.debug("Starting on table: {}", tableName);

                generator.writeFieldName(tableName);
                generator.writeStartArray();

                String query = fetchQuery(tableName);

                try (Statement stmt = connection.createStatement();
                     ResultSet tableData = stmt.executeQuery(query)) {

                    streamJsonArray(tableData, generator);
                }

                generator.writeEndArray();
            }

            generator.writeEndObject();
            generator.flush();
        } catch(Exception ex){
            logger.debug("Error during export: {}", ex.getLocalizedMessage());
            System.out.println(ex.getLocalizedMessage());
            throw new GeneralExportException("Location: EximService | Exception Type: " + ex.getClass(), ex);
        }

        return new FileSystemResource(output);
    }

    private void createTableSetupObject(Connection connection, List<String> tables, JsonGenerator generator) throws Exception {
        DatabaseMetaData metaData = connection.getMetaData();

        logger.debug("Starting Table Setup");

        generator.writeFieldName("tableSetup");
        generator.writeStartArray();

        for(String tableName: tables){
            logger.debug("Starting setup table: {}", tableName);
            generator.writeStartObject();

            generator.writeFieldName(tableName);
            generator.writeStartObject();

            ResultSet foreignKeys = metaData.getImportedKeys(null, null, tableName);

            while(foreignKeys.next()){
                logger.debug("Getting current table's foreign keys");
                String foreignTable = foreignKeys.getString("PKTABLE_NAME");
                String columnName = foreignKeys.getString("FKCOLUMN_NAME");

                generator.writeStringField(columnName, foreignTable);
            }

            generator.writeEndObject();
            generator.writeEndObject();
        }


        generator.writeEndArray();
    }

    private void streamJsonArray(ResultSet rs, JsonGenerator generator) throws Exception{
        ResultSetMetaData metaData = rs.getMetaData();
        int columnCount = metaData.getColumnCount();

        logger.debug("Generating current table's data");

        // Turn every row into a JSON Object
        while(rs.next()){
            generator.writeStartObject(); // Row Start

            for(int i = 1; i <= columnCount; i++){
                String columnName = metaData.getColumnName(i);
                if(columnName.equals(PLACEHOLDER_COLUMN_NAME)) continue;

                Object value = rs.getObject(i);

                generator.writeObjectField(columnName, value);
            }

            generator.writeEndObject(); // Row End
        }
    }

    private List<String> getOrder(Connection connection) throws SQLException {
        String query = "SELECT value FROM settings_table WHERE key = 'exim_order'";

        try(PreparedStatement statement = connection.prepareStatement(query);
            ResultSet rs = statement.executeQuery()) {

            if(rs.next()){
                return List.of(rs.getString("value").split(","));
            } else {
                throw new RuntimeException("The order was not found in settings");
            }
        }
    }

    private String fetchQuery(String tableName) {
        if(tableName.equalsIgnoreCase("container_table")) {
            return "WITH RECURSIVE OrderedContainers AS (" +
                        "SELECT *, 0 as level " +
                        "FROM container_table " +
                        "WHERE parent_id IS NULL " +
                        "UNION ALL " +
                        "SELECT c.*, oc.level + 1 " +
                        "FROM container_table c " +
                        "INNER JOIN OrderedContainers oc " +
                        "ON c.parent_id = oc.id " +
                    ") " +
                    "SELECT * " +
                    "FROM OrderedContainers " +
                    "ORDER BY level;";
        } else {
            return  "SELECT * FROM " + tableName;
        }
    }

    public void importData(MultipartFile file) throws Exception {
        JsonFactory jsonFactory = new JsonFactory();

        try(InputStream is = file.getInputStream();
            JsonParser parser = jsonFactory.createParser(is)) {

            if(parser.nextToken() != JsonToken.START_OBJECT){
                throw new IllegalArgumentException("The JSON file is invalid: The root element in the file must be an object");
            }

            while(parser.nextToken() != JsonToken.END_OBJECT){
                String tableName = parser.currentName();
                parser.nextToken();

                if(parser.currentToken() == JsonToken.START_ARRAY){
                    if(tableName.equals("tableSetup")) {
                        initTableSetup(parser);
                    } else {
                        List<JsonNode> tableRows = getAllTableRows(parser);

                        if(tableRows.isEmpty()) continue;

                        String query = createQueryString(tableRows.get(0), tableName);

                        List<String> uniqueTables = uniqueRowTables.get(tableName);
                        if(uniqueTables != null)
                            query += String.format(" ON CONFLICT (%s) DO UPDATE SET %s = EXCLUDED.%s", String.join(", ", uniqueTables), PLACEHOLDER_COLUMN_NAME, PLACEHOLDER_COLUMN_NAME);


                        insertRows(tableName, tableRows, query);

                        getNewIds(tableName);
                    }
                }
            }
        }
    }

    private void initTableSetup(JsonParser parser) throws Exception {
        while(parser.nextToken() != JsonToken.END_ARRAY) {
            JsonNode node = objectMapper.readTree(parser);

            String tableName = node.fieldNames().next();

            String query = String.format("UPDATE %s SET %s = NULL", tableName, PLACEHOLDER_COLUMN_NAME);

            if(rootRowTables.contains(tableName)) query += " WHERE id != -1";

            jdbcTemplate.update(query);

            JsonNode currentTable = node.fields().next().getValue();

            HashMap<String, String> tableKeys = new HashMap<>();

            for (Iterator<Map.Entry<String, JsonNode>> it = currentTable.fields(); it.hasNext(); ) {
                Map.Entry<String, JsonNode> field = it.next();

                String columnName = field.getKey();
                String foreignTable = field.getValue().textValue();

                tableKeys.put(columnName, foreignTable);
            }

            tableSetup.put(tableName, tableKeys);

            fetchColumnTypes(tableName);
            fetchUniqueColumns(tableName);
        }
    }

    private void fetchColumnTypes(String tableName) throws Exception {
        try(Connection connection = dataSource.getConnection()){
            DatabaseMetaData metaData = connection.getMetaData();
            ResultSet rs = metaData.getColumns(null, null, tableName, null);
            HashMap<String, Integer> columns = new HashMap<>();

            while(rs.next())  {
                String columnName = rs.getString("COLUMN_NAME");
                int columnType = rs.getInt("DATA_TYPE");

                columns.put(columnName, columnType);
            }

            columnTypes.put(tableName, columns);
        }
    }

    private void fetchUniqueColumns(String tableName) throws Exception {
        try(Connection connection = dataSource.getConnection()){
            DatabaseMetaData metaData = connection.getMetaData();
            ResultSet rs = metaData.getIndexInfo(null, null, tableName, true, false);
            List<String> columns = new ArrayList<>();

            while(rs.next()) {
                String indexName = rs.getString("INDEX_NAME");
                String columnName = rs.getString("COLUMN_NAME");

                if(columnName != null && !columnName.isEmpty() && !indexName.toLowerCase().contains("pkey")){
                    columns.add(columnName);
                }
            }

            if(!columns.isEmpty()) {
                uniqueRowTables.put(tableName, columns);
            }
        }
    }

    private List<JsonNode> getAllTableRows(JsonParser parser) throws IOException {
            List<JsonNode> tableRows = new ArrayList<>();

            while(parser.nextToken() != JsonToken.END_ARRAY) {
                JsonNode rowNode = objectMapper.readTree(parser);
                tableRows.add(rowNode);
            }

            return tableRows;
    }

    private String createQueryString(JsonNode rowNode, String tableName) {
        StringBuilder columns = new StringBuilder();
        StringBuilder placeholders = new StringBuilder();

        for(Iterator<String> it = rowNode.fieldNames(); it.hasNext(); ) {
            String column = it.next();

            if(HIERARCHICAL_VARIABLE.equals(column)) continue;

            if(!columns.isEmpty()) {
                columns.append(", ");
                placeholders.append(", ");
            }

            if("id".equals(column)) {
                columns.append("placeholder");
            } else {
                columns.append(column);
            }

            placeholders.append("?");
        }

        return String.format("INSERT INTO %s (%s, id) VALUES (%s, nextVal('%s_seq'))", tableName, columns, placeholders, tableName);
    }

    private List<JsonNode> filterRows(List<JsonNode> tableRows) {
        return tableRows.stream().filter(node -> node.has("id") && node.get("id").asInt() != -1).toList();
    }

    private void insertRows(String tableName, List<JsonNode> tableRows, String query) throws SQLException {
        switch(tableName){
            case "container_table" -> insertRowsWithSelfRefFKey(tableName, tableRows, query);
            case "itemtype_table" -> insertRowsWithFKey(tableName, filterRows(tableRows), query);
            default -> insertRowsWithFKey(tableName, tableRows, query);
        }
    }

    @Transactional
    private void insertRowsWithFKey(String tableName, List<JsonNode> tableRows, String query){
        jdbcTemplate.batchUpdate(query, tableRows, 1000, (ps, row) -> {
            int index = 1;
            boolean hasForeignKeys = hasForeignKeys(tableName);

            for (Iterator<String> it = row.fieldNames(); it.hasNext(); ) {
                String column = it.next();

                setParameter(ps, column, row, tableName, index++, hasForeignKeys, true);
            }
        });
    }

    @Transactional
    private void setParameter(PreparedStatement ps, String column, JsonNode row, String tableName, int index, boolean hasForeignKeys, boolean optional) throws SQLException {
        switch(columnTypes.get(tableName).get(column)){
            case Types.INTEGER -> ps.setInt(index, row.get(column).asInt());
            case Types.BIGINT -> {
                String value = row.get(column).asText();
                Long id;

                try {
                    id = Long.parseLong(value);
                } catch (NumberFormatException ignored){
                    id = null;
                }

                if(hasForeignKeys && optional && tableSetup.get(tableName).containsKey(column))
                    id = getForeignKey(tableName, column, id);

                if(id == null) {
                    ps.setNull(index, Types.BIGINT);
                } else {
                    ps.setLong(index, id);
                }
            }
            case Types.SMALLINT -> ps.setShort(index, (short) row.get(column).asInt());
            case Types.DOUBLE -> ps.setDouble(index, row.get(column).asDouble());

            default -> {
                Object value = row.get(column).asText();
                if(value.equals("null")) value = null;

                ps.setObject(index, value);
            }
        }
    }

    @Transactional
    private void insertRowsWithSelfRefFKey(String tableName, List<JsonNode> tableRows, String query) throws SQLException {
        String updatedQuery = String.format("%s RETURNING id, %s", query, PLACEHOLDER_COLUMN_NAME);
        Map<Integer, List<JsonNode>> groupedRows = new HashMap<>();
        boolean hasForeignKeys = hasForeignKeys(tableName);

        for(JsonNode node: tableRows) {
            int level = node.get(HIERARCHICAL_VARIABLE).asInt();

            groupedRows.computeIfAbsent(level, k -> new ArrayList<>()).add(node);
        }

        int level = 0;
        while(groupedRows.containsKey(level)){
            List<JsonNode> currentLevel = groupedRows.get(level);

            try(Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(updatedQuery)){

                for(JsonNode row: currentLevel){
                    int index = 1;

                    for(Iterator<String> it = row.fieldNames(); it.hasNext(); ) {
                        String column = it.next();

                        if(HIERARCHICAL_VARIABLE.equals(column)) continue;

                        setParameter(statement, column, row, tableName, index++, hasForeignKeys, level != 0);
                    }

                    statement.addBatch();
                }

                statement.executeBatch();

                try(ResultSet rs = statement.getGeneratedKeys()) {
                    HashMap<Long, Long> newIds = new HashMap<>();
                    while(rs.next()){
                        newIds.put((Long) rs.getObject("id"),
                                   (Long) rs.getObject(PLACEHOLDER_COLUMN_NAME));
                    }

                    ids.put(tableName, newIds);
                }
            }

            level++;
        }
    }

    private void getNewIds(String tableName) throws SQLException {
        String query = "SELECT id, placeholder " +
                       "FROM " + tableName + " " +
                       "WHERE placeholder IS NOT NULL";

        try(Connection connection = dataSource.getConnection();
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet rs = statement.executeQuery()){

            HashMap<Long, Long> currentIds = new HashMap<>();

            while(rs.next()){
                Long id = rs.getLong("id");
                Long placeholder = rs.getLong("placeholder");

                currentIds.put(placeholder, id);
            }

            ids.put(tableName, currentIds);
        }

    }

    private String getForeignKeyTable(String primaryTable, String columnName) {
        return tableSetup.get(primaryTable).get(columnName);
    }

    private Long getForeignKey(String primaryTable, String columnName, Long oldId) {
        String foreignTable = getForeignKeyTable(primaryTable, columnName);

        if(primaryTable.equals("item_table") && columnName.equals("itemtype_id") && oldId == -1)
            return oldId;

        return ids.get(foreignTable).get(oldId);
    }

    private boolean hasForeignKeys(String tableName) {
        return !tableSetup.get(tableName).isEmpty();
    }
}