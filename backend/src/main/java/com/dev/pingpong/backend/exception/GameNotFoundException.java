package com.dev.pingpong.backend.exception;

public class GameNotFoundException extends RuntimeException {
    public GameNotFoundException(String s) {
        super(s);
    }
}
