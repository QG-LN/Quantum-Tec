package com.project.quantumtec.DTO.user;

import lombok.Data;

/**
 * PackageName : com.project.quantumtec.DTO.user
 * FileName : UserGraceDTO
 * Author : Argonaut
 * Date : 2023-08-17
 * Description : 사용자 유예 확인용 DTO
 */

@Data
public class UserGraceDTO {
    private int userIndex;              // 사용자 인덱스
    private String userStatus;          // 사용자 상태
    private String statusUpdatedAt;     // 상태 변경 시간

}
