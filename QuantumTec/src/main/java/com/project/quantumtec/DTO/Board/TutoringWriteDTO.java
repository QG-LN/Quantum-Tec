package com.project.quantumtec.DTO.Board;

import lombok.Data;

@Data
public class TutoringWriteDTO {
    private String userID;                          // 게시글 작성자 아이디
    private String postTutoringTitle;               // 튜터링 게시물 제목
    private String postTutoringContent;             // 튜터링 내용
    private int postTutoringMaxUserCount;           // 모집 인원
    private int postTutoringUserCount;              // 현재 인원
    
    private String[] postTutoringCategory;            // 모집 분야
    private String[] postTutoringTags;                // 모집 구분

    private int postTutoringIndex;                  // 게시글 인덱스
}
