package com.project.quantumtec.VO.user;

import lombok.Getter;

/**
 * PackageName : com.project.quantumtec.VO.user
 * FileName : UserVO
 * Author : Argonaut
 * Date : 2023-05-07
 * Description :
 */
@Getter
public class UserVO {
    private int userIdx;            // 사용자 인덱스
    private String userID;          // 사용자 아이디
    private String userPW;          // 사용자 비밀번호
    private String userNickname;    // 사용자 닉네임
    private String userName;        // 사용자 이름
    private String userBirth;       // 사용자 생일
    private String userAddress;         // 사용자 기본주소
    private String userAddressDetail;   // 사용자 상세주소
    private String userPostal;          // 사용자 우편번호
    private String userEmail;           // 사용자 이메일
}
