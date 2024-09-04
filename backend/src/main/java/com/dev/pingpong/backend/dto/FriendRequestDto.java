package com.dev.pingpong.backend.dto;

import lombok.*;

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
}
