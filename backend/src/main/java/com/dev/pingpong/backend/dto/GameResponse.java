package com.dev.pingpong.backend.dto;


import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameResponse {
    private String id;
    private String player1Id;
    private String player1;
    private String player2Id;
    private String player2;
    private int player1Score;
    private int player2Score;
    private int gamePoint;
    private String status;
    private LocalDateTime gameDate;

    
}
