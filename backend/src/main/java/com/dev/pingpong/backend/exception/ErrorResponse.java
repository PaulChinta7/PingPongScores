package com.dev.pingpong.backend.exception;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private String msg;
    private int status;
}
