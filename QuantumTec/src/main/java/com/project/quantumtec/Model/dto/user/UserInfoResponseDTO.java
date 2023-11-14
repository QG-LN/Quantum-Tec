package com.project.quantumtec.Model.dto.user;

import lombok.Data;

@Data
public class UserInfoResponseDTO {
    private String userID;          // 사용자 아이디
    private String userNickname;    // 사용자 닉네임
    private String userName;        // 사용자 이름
    private String userBirth;       // 사용자 생일
    private String userAddress;         // 사용자 기본주소
    private String userAddressDetail;   // 사용자 상세주소
    private String userPostal;          // 사용자 우편번호
    private String userEmail;           // 사용자 이메일
    private String userRole;            // 사용자 권한
    private String userCash;            // 사용자 캐시
    private String userStatus;           // 사용자 상태
    private String userGender;          // 사용자 성별
}
