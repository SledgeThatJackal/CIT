package dev.adamico.cit.Services;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.adamico.cit.Exceptions.GeneralExportException;
import dev.adamico.cit.Repositories.EximFetch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.DataSource;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
public class EximService {

    @Autowired
    private DataSource dataSource;

    @Autowired
    EximFetch eximFetch;

    private static final Logger logger = LoggerFactory.getLogger(EximService.class);

    public Resource exportDatabase() throws Exception {
        File output = new File("cit_export.json");

        logger.debug("Starting Database Export. Export file path: {}", output.getAbsolutePath());

        try(Connection connection = dataSource.getConnection();
            FileOutputStream fos = new FileOutputStream(output);
            OutputStreamWriter writer = new OutputStreamWriter(fos, StandardCharsets.UTF_8);
            JsonGenerator generator = new JsonFactory().createGenerator(writer)) {

            List<String> tableOrder = getOrder(connection);
            Iterator<String> tables = tableOrder.iterator();

            generator.writeStartObject();

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

    private void streamJsonArray(ResultSet rs, JsonGenerator generator) throws Exception{
        ResultSetMetaData metaData = rs.getMetaData();
        int columnCount = metaData.getColumnCount();

        logger.debug("Generating current table's data");

        // Turn every row into a JSON Object
        while(rs.next()){
            generator.writeStartObject(); // Row Start

            for(int i = 1; i <= columnCount; i++){
                String columnName = metaData.getColumnName(i);
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

    private String fetchQuery(String tableName) throws SQLException {
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
        try(InputStream is = file.getInputStream()){
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(is);

            Iterator<Map.Entry<String, JsonNode>> tables = rootNode.fields();

            while(tables.hasNext()){
                Map.Entry<String, JsonNode> tableEntry = tables.next();

                String tableName = tableEntry.getKey();
                JsonNode tableRows = tableEntry.getValue();

                System.out.println("Table: " + tableName);

                switch(tableName) {
                    case "container_table" -> {
                        System.out.println("Container Table");
                    }
                    case "item_table" -> {
                        System.out.println("Item Table");
                    }
                    case "typeattributes_table" -> {
                        System.out.println("TypeAttributes Table");
                    }
                    case "itemtag_table" -> {
                        System.out.println("Item Tag Table");
                    }
                    case "itemimages_table" -> {
                        System.out.println("ItemImages Table");
                    }
                    case "containerimages_table" -> {
                        System.out.println("ContainerImages Table");
                    }
                    case "containeritem_table" -> {
                        System.out.println("ContainerItem Table");
                    }
                    case "itemattributes_table" -> {
                        System.out.println("ItemAttributes Table");
                    }
                    default -> {
                        Class<?> currentClass = eximFetch.fetchClass(tableName);
                        JpaRepository currentRepository = eximFetch.fetchRepository(tableName);

                        processIndependentTable(currentClass, tableRows, currentRepository);
                    }
                }
            }
        }
    }

    private <T> void processIndependentTable(Class<T> entityClass, JsonNode tableRows, JpaRepository repository){
        if(tableRows.isArray()){
            for(JsonNode rowNode: tableRows){
                try {
                    T entity = entityClass.getDeclaredConstructor().newInstance();

                    Iterator<Map.Entry<String, JsonNode>> fields = rowNode.fields();

                    while(fields.hasNext()){
                        Map.Entry<String, JsonNode> field = fields.next();

                        String key = field.getKey();

                        String columnName = key.contains("_") ? covertToCamelCase(key) : key;
                        JsonNode columnValue = field.getValue();

                        Field entityField = entityClass.getDeclaredField(columnName);
                        entityField.setAccessible(true);

                        switch(entityField.getType().getSimpleName()){
                            case "String" -> entityField.set(entity, columnValue.textValue());
                            case "Double" -> entityField.set(entity, columnValue.doubleValue());
                            case "Integer" -> entityField.set(entity, columnValue.intValue());
                            case "Long" -> entityField.set(entity, columnValue.longValue());
                            default -> throw new RuntimeException("Column: " + columnName + " does not exist.");
                        }
                    }

                    System.out.println(entity);

                    System.out.println("Row\n");

//                    repository.save(entity);

                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    private String covertToCamelCase(String snakeCase) {
        String[] parts = snakeCase.split("_");
        StringBuilder camelCase = new StringBuilder(parts[0].toLowerCase());

        for(int i = 1; i < parts.length; i++){
            camelCase.append(parts[i].substring(0, 1).toUpperCase())
                     .append(parts[i].substring((1)).toLowerCase());
        }

        return camelCase.toString();
    }
}