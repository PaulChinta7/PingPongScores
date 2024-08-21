package com.dev.pingpong.backend.exception;

public class PlayerNotFoundException extends RuntimeException {
    public PlayerNotFoundException(String playerNotFound) {
        super(playerNotFound);
    }
}
