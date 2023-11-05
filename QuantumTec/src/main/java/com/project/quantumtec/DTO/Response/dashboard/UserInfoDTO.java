package com.project.quantumtec.DTO.Response.dashboard;

import lombok.Data;

import java.util.List;

@Data
public class UserInfoDTO {
    // 프로필 정보
    private String userUpdateDate;  // 사용자 정보 수정일
    private String userRole;            // 사용자 권한
    private int userAvartaCount; // 사용자 아바타 개수
    private int userBlockCount; // 사용자 차단 횟수
    //  사용자 보유 항목 일부
    private int userFreeCash;            // 사용자 무료 캐시
}
