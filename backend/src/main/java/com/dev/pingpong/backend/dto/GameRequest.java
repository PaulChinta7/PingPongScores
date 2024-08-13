package com.dev.pingpong.backend.dto;

import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GameRequest {
    private String player1;
    private String player2;
    private int gamePoint;
}
