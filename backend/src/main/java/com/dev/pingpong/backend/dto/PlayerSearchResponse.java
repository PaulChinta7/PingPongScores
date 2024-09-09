package com.dev.pingpong.backend.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayerSearchResponse {
    private String id;
    private String name;
    private String email;
    private int gamesWon;
    private int gamesLost;
    private List<GameResponse> games;
    private List<Integer> last10;
    private List<String> friends;
    private boolean Requested;
}
