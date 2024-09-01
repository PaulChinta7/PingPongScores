package com.dev.pingpong.backend.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayerResponse {
    private String id;
    private String name;
    private String email;
    private int gamesWon;
    private int gamesLost;
    private List<GameResponse> games;
    private List<String> friends;
    
}
