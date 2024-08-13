package com.dev.pingpong.backend.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "Game")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Game {
    @Id
    private String id;
    private String player1;
    private String player2;
    private int player1Score;
    private int player2Score;
    private int gamePoint;
    private String status;
    
}
