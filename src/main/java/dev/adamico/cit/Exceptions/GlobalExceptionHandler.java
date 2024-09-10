package dev.adamico.cit.Exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLException;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionHandler.class);

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<String> handleSqlException(SQLException ex){
        logger.error("SQL Exception occurred: " + ex.getMessage());

        return new ResponseEntity<>("A problem arose with the database. Pleas try again later", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(GeneralExportException.class)
    public ResponseEntity<String> handleGeneralServerExceptions(GeneralExportException ex){
        logger.error(ex.getMessage());

        return new ResponseEntity<>("An unexpected error occurred when generating the export file.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
