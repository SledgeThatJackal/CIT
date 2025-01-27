package dev.adamico.cit.Services;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import dev.adamico.cit.Exceptions.GeneralExportException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.Iterator;
import java.util.List;

@Service
public class EximService {

    @Autowired
    private DataSource dataSource;

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
}