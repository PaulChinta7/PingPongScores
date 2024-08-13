package com.dev.pingpong.backend.dto;

import lombok.*;

@Data
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GameDto {
    private String id;
    private String player1;
    private String player2;
    private int player1Score;
    private int player2Score;
    private int gamePoint;
    private String status;
}
