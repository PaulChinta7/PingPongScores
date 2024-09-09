package com.dev.pingpong.backend.exception;

public class EmailAlreadyExistException extends RuntimeException {
    public EmailAlreadyExistException(String s) {
        super(s);
    }
}
