package com.dev.pingpong.backend.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "Player")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Player {
    private String id;
    private String name;
    private String email;
    private int gamesWon;
    private int gamesLost;
}
