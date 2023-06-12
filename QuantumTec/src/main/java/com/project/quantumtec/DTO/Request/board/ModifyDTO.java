package com.project.quantumtec.DTO.Request.board;

import lombok.Data;

@Data
public class ModifyDTO { //게시글 수정 요청 DTO
    private int boardIndex; // 게시판 번호
    private int postIndex; // 게시글 번호
    private int userIndex; // 유저 번호
    private String title; // 제목
    private String content; // 내용
}
