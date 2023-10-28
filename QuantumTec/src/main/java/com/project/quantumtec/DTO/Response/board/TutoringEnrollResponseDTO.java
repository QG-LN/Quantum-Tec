package com.project.quantumtec.DTO.Response.board;

import lombok.Data;

@Data
public class TutoringEnrollResponseDTO {
    private String userNickname;                    // 유저 이름
    private String userEmail;                       // 유저 이메일
    private String enrollCreatedAt;                 // 등록 날짜
    private String enrollUpdatedAt;                 // 수정 날짜
    private String enrollState;                     // 등록 상태    [신청,취소,수락,거절]
}
