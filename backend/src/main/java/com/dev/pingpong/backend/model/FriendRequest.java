package com.dev.pingpong.backend.model;


import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "FriendRequest")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequest {
    private String id;
    private String requestorId;
    private String acceptorId;
    private String status;
}
