package com.project.quantumtec.DTO.user;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String userID; // 사용자 아이디
    private String userPW; // 사용자 비밀번호
}
