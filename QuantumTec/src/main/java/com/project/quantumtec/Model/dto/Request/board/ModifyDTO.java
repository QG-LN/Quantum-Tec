package com.project.quantumtec.Model.dto.Request.board;

import lombok.Data;

@Data
public class ModifyDTO { //게시글 수정 요청 DTO
    private int boardIndex; // 게시판 번호
    private int postIndex; // 게시글 번호
    private String userID; // 유저 아이디
    private String title; // 제목
    private String content; // 내용
}
