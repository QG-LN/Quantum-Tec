package com.project.quantumtec.Model.dto.user;

import lombok.Data;

/**
 * 회원 탈퇴 사유 정보를 담는 DTO
 */
@Data
public class UserWithdrawalDTO {
    private int withdrawalIndex;                // 회원 탈퇴 인덱스
    private int withdrawalListIndex;            // 회원 탈퇴 사유 인덱스
    private String withdrawalOtherReason;       // 회원 탈퇴 사유
    private String withdrawalDate;              // 회원 탈퇴 날짜
    private int withdrawalUserIndex;            // 회원 인덱스
}
