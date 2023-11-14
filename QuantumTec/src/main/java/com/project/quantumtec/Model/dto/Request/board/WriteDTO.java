package com.project.quantumtec.Model.dto.Request.board;

import lombok.Data;

@Data
public class WriteDTO { // 게시글 작성 요청 DTO

    private int boardIndex; // 게시판 번호
    private String userID; // 유저 아이디
    private String title; // 제목
    private String content; // 내용
}
