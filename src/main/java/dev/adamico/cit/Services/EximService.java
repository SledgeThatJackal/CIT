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
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
public class EximService {

    @Autowired
    private DataSource dataSource;

    private static final Logger logger = LoggerFactory.getLogger(EximService.class);

    public Resource exportDataBase() throws Exception {
        DatabaseMetaData metaData = dataSource.getConnection().getMetaData();
        ResultSet tables = metaData.getTables(null, null, null, new String[]{"TABLE"});

        File output = new File("cit_export.json");

        logger.debug("Starting Database Export");

        // Creating a new thread since this exports all data in the database
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<Void> future = executor.submit(() -> {
            try(FileOutputStream fos = new FileOutputStream(output);
                OutputStreamWriter writer = new OutputStreamWriter(fos, StandardCharsets.UTF_8);
                JsonGenerator generator = new JsonFactory().createGenerator(writer)){

                generator.writeStartObject();

                while(tables.next()){
                    String tableName = tables.getString("TABLE_NAME");
                    logger.debug("Starting on table: " + tableName);


                    generator.writeFieldName(tableName);
                    generator.writeStartArray();

                    try(Statement stmt = dataSource.getConnection().createStatement();
                        ResultSet tableData = stmt.executeQuery("SELECT * FROM " + tableName)){

                        streamJsonArray(tableData, generator);
                    }

                    generator.writeEndArray();
                }

                generator.writeEndObject();
                generator.flush();
            } catch(FileNotFoundException | SQLException e){
                throw e;
            }

            return null;
        });

        try{
            future.get();
        } catch(Exception ex){
            Throwable cause = ex.getCause();

            if(cause instanceof FileNotFoundException){
                throw new GeneralExportException("JSON File not found on server", ex);
            }

            if(cause instanceof SQLException){
                throw new SQLException(ex);
            }

            throw new Exception(ex);
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
}
