package com.dev.pingpong.backend.exception;

public class GameCompletedException extends RuntimeException {
    public GameCompletedException(String gameIsComplete) {
        super(gameIsComplete);
    }
}
