package com.project.quantumtec.Model.dto.user;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private String userNickname;        // 사용자 닉네임
    private String userStatus;          // 사용자 상태 [active, inactive, ban]
    private int userAttendance;         // 사용자 출석일
    private int userCash;               // 사용자 유료 재화
    private int userFreeCash;           // 사용자 무료 재화
    //private String userAvatar; // 사용자 아바타 (임시)
}
