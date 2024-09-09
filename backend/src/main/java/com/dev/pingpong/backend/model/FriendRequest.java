package com.dev.pingpong.backend.model;


import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

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

    @CreatedDate
    private LocalDateTime requestDate;

}
