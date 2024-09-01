package com.dev.pingpong.backend.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

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
    private String password;
    private int gamesWon;
    private int gamesLost;
    private List<String> friends;
}
