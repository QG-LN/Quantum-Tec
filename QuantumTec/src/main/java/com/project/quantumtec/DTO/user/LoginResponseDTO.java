package com.project.quantumtec.DTO.user;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private String userNickname; // 사용자 닉네임
    private int userCash; // 사용자 재화
}
