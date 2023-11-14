package com.project.quantumtec.Model.DTO.Request.board;

import lombok.Data;

@Data
public class TutoringEnrollRequestDTO {
    private String userID;                          // 유저 아이디
    private String postTutoringIndex;               // 게시글 인덱스
    private String enrollState;                     // 등록 상태    [신청,취소,수락,거절]

    private String userNickname;                        // 유저 이름
    private String userEmail;                           // 유저 이메일
    private String tutoringLink;                        // 튜터링 링크
}
