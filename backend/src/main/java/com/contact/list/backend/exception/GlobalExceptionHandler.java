package com.contact.list.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorObject> handleCustomException(CustomException ex, WebRequest request) {
        ErrorObject errorObject = ErrorObject.builder()
                .statusCode(ex.getStatus().value())
                .message(ex.getMessage())
                .timestamp(new Date())
                .build();

        return new ResponseEntity<>(errorObject, ex.getStatus());
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorObject> handleGlobalException(Exception ex, WebRequest request) {
        ErrorObject errorObject = ErrorObject.builder().statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value()).message(ex.getMessage()).timestamp(new Date()).build();

        return new ResponseEntity<>(errorObject, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
