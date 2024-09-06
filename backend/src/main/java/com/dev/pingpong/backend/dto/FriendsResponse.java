package com.dev.pingpong.backend.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendsResponse {
    private String id;
    private String name;
    private String email;
    private int gamesWon;
    private int gamesLost;
    private List<Integer> last5;
    private List<String> friends;

}
