package com.dev.pingpong.backend.dto;

import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GameRequest {
    private String player1Id;
    private String player2Id;
    private int gamePoint;
}
