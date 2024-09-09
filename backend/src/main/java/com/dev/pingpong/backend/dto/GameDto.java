package com.dev.pingpong.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GameDto {
    private String id;
    private String player1Id;
    private String player2Id;
    private int player1Score;
    private int player2Score;
    private int gamePoint;
    private String status;
    private LocalDateTime gameDate;
}
