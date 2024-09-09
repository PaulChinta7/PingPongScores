package com.dev.pingpong.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequestDto {
    private String id;
    private String requestorId;
    private String requestorName;
    private String acceptorId;
    private String status;
    private LocalDateTime requestDate;
}
