package com.dev.pingpong.backend.exception;

public class JwtTokenExpiredException extends RuntimeException {
    public JwtTokenExpiredException(String jwtTokenIsExpired) {
        super(jwtTokenIsExpired);
    }
}
