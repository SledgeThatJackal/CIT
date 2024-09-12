package dev.adamico.cit.Exceptions;

public class GeneralExportException extends RuntimeException{
    public GeneralExportException(String message, Throwable cause){
        super(message, cause);
    }
}
