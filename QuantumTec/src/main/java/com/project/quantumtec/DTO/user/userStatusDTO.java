package com.project.quantumtec.DTO.user;

import lombok.Data;

@Data
public class userStatusDTO {
    private int statusIdx; // 상태 고유 식별자
    private int userIdx; // 사용자 고유 식별자
    private String userStatus;  // 사용자 상태
    private String userUpdatedAt; // 사용자 수정 날짜
    private int userCash; // 사용자 게임 돈
}
