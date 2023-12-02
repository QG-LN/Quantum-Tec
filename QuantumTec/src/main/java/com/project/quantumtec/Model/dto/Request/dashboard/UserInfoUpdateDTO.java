package com.project.quantumtec.Model.dto.Request.dashboard;

import lombok.Data;

@Data
public class UserInfoUpdateDTO {
    // USER_INFO
    private int userIndex;         // 사용자 번호(수정불가, 고유값)
    private String userName;        // 사용자 이름
    private String userNickname;    // 사용자 닉네임
    private String userGender;          // 사용자 성별
    private String userAddress;         // 사용자 기본주소
    private String userAddressDetail;   // 사용자 상세주소
    private String userPostal;          // 사용자 우편번호
    private String userEmail;           // 사용자 이메일
    private String userBirth;       // 사용자 생일
    private String userRole;            // 사용자 권한

    // USER_STATUS
    private String userMemo;            // 사용자 메모
    private int userCash;               // 사용자 캐시
    private int userFreeCash;           // 사용자 프리캐시

    private Integer update_result;

}
