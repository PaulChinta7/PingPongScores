package com.dev.pingpong.backend.dto;


import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String id;
    private int status;
}
