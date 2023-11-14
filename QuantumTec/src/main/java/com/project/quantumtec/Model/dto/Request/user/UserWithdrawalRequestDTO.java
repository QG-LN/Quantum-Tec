package com.project.quantumtec.Model.dto.Request.user;

import lombok.Data;

/**
 * 회원탈퇴 진행 시 클라이언트로부터 전달받은 데이터를 가진 DTO
 */
@Data
public class UserWithdrawalRequestDTO {
    private String userID;                  // 사용자 아이디
    private String userPW;                  // 사용자 비밀번호
    private int userReasonCode;             // 사용자 탈퇴 사유 코드
    private String userReason;              // 사용자 탈퇴 사유
}
