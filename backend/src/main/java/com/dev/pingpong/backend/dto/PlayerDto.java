package com.dev.pingpong.backend.dto;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDto {
    private String id;
    private String name;
    private String email;
    private int gamesWon;
    private int gamesLost;
}
