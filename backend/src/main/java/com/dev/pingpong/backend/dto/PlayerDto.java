package com.dev.pingpong.backend.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDto {
    private String id;
    private String name;
    private String email;
    private  String password;
    private int gamesWon;
    private int gamesLost;
    private List<String> friends;
}
