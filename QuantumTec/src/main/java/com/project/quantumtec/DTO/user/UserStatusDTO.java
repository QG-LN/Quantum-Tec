package com.project.quantumtec.DTO.user;

import lombok.Data;

/**
 * 회원의 상태 정보를 담는 DTO
 */
@Data
public class UserStatusDTO {
    private int userIndex;            // 사용자 인덱스
    private String userStatus;      // 사용자 상태
    private String userCash;        // 사용자 캐시
    private String userFreeCash;    // 사용자 무료캐시
    // 추후 추가
}
