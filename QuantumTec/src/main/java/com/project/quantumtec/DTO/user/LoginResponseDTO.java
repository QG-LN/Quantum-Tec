package com.project.quantumtec.DTO.user;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private String userNickname; // 사용자 닉네임
    private String userAttendanceDays; // 사용자 출석일 수
    private int userCash; // 사용자 유료 재화
    private int userFreeCash; // 사용자 무료 재화
    //private String userAvatar; // 사용자 아바타 (임시)
}
