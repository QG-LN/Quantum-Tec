package com.project.quantumtec.VO.user;

import lombok.Getter;

/**
 * PackageName : com.project.quantumtec.VO.user
 * FileName : UserStatusVO
 * Author : MayoneJY
 * Date : 2023-05-09
 * Description :
 */
@Getter
public class UserStatusVO {
    private int statusIdx;            // 상태 고유 식별자
    private int userIdx;          // 사용자 고유 식별자
    private String userRole;          // 사용자 역할
    private String userStatus;    // 사용자 상태
    private String userUpdatedAt;        // 사용자 수정 날짜
    private String userCash;       // 사용자 게임 돈

}