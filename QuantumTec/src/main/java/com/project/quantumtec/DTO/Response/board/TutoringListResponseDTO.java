package com.project.quantumtec.DTO.Response.board;

import lombok.Data;

@Data
public class TutoringListResponseDTO {
    private int postIndex;      // 게시글 번호
    private String[] tags;        // 게시글 태그
    private String postTitle;   // 게시글 제목
    private String userNickname;  // 작성자 닉네임
    private String userIcon;      // 작성자 아이콘
    private String postDate;    // 게시글 등록일
    private int participant;    // 튜터링 참여 인원
    private String subject;     // 튜터링 과목
}
