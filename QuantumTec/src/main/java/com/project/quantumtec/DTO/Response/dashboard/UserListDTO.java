package com.project.quantumtec.DTO.Response.dashboard;

import lombok.Data;

@Data
public class UserListDTO {
    // 목록 내에 표시될 정보
    private int num;   // 번호
    private int userLevel;   // 레벨
    private String nickname;   // 닉네임
    private String name;   // 사용자명
    private String userStatus;   // 사용자 상태
    private int userCash;   // 보유 캐시
    private int userAttendanceCount; // 사용자 출석 일수

    // 클릭 시 우측 정보란에 추가적으로 표시될 정보
    private String userID;    // 사용자 아이디
    private String userBirth;    // 사용자 생일
    private String userEmail;    // 사용자 이메일
    private String userGender;    // 사용자 성별
    private String userAddress;    // 사용자 기본주소
    private String userAddressDetail;    // 사용자 상세주소
    private String userJoinDate;    // 사용자 가입일
    private String userMemo;    // 사용자 메모
}
