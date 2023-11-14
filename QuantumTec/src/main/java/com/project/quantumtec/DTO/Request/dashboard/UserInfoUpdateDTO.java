package com.project.quantumtec.DTO.Request.dashboard;

import lombok.Data;

@Data
public class UserInfoUpdateDTO {
    // 프로필 정보
    private int userIndex;         // 사용자 번호(수정불가, 고유값)
    private String userName;        // 사용자 이름
    private String userNickname;    // 사용자 닉네임
    private String userGender;          // 사용자 성별
    private String userAddress;         // 사용자 기본주소
    private String userAddressDetail;   // 사용자 상세주소
    private String userEmail;           // 사용자 이메일
    private String userBirth;       // 사용자 생일
    private String userRole;            // 사용자 권한
    private String userMemo;            // 사용자 메모
}
