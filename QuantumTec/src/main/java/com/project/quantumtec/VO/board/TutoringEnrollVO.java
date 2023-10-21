package com.project.quantumtec.VO.board;

import lombok.Getter;

@Getter
public class TutoringEnrollVO {
    private int postTutoringIndex;               // 게시글 인덱스
    private int userIndex;                          // 유저 인덱스
    private String userNickname;                    // 유저 닉네임
    private String enrollCreatedAt;                 // 등록 날짜
    private String enrollUpdatedAt;                 // 수정 날짜
    private String enrollState;                     // 등록 상태    [신청,취소,수락,거절]
}
