package dev.adamico.cit.Exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.SQLException;
import java.util.NoSuchElementException;

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

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException ex){
        logger.error(ex.getMessage());

        return new ResponseEntity<>("Container ID does not exist", HttpStatus.ACCEPTED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleExceptions(Exception ex){
        logger.error(ex.getMessage());

        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "You cannot make this container's parent container, it's child.")
    public void handleIllegalArgumentException(Exception ex){
        logger.error(ex.getMessage());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex){
        System.out.println(ex.getMessage());

        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("JSON parse error: " + ex.getMessage());
    }
}
