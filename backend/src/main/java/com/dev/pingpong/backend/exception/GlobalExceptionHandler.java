package com.dev.pingpong.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(GameNotFoundException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleGameNotFoundException(GameNotFoundException ex){
        return new ResponseEntity<>(ErrorResponse.builder().msg(ex.getMessage()).status(HttpStatus.OK.value()).build(), HttpStatus.OK);
        
    }

    @ExceptionHandler(PlayerNotFoundException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleGameNotFoundException(PlayerNotFoundException ex){
        return new ResponseEntity<>(ErrorResponse.builder().msg(ex.getMessage()).status(HttpStatus.OK.value()).build(), HttpStatus.OK);

    }

    @ExceptionHandler(GameCompletedException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleGameNotFoundException(GameCompletedException ex){
        return new ResponseEntity<>(ErrorResponse.builder().msg(ex.getMessage()).status(HttpStatus.OK.value()).build(), HttpStatus.OK);

    }
}
