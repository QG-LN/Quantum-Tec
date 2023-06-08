package com.project.quantumtec.DTO.board;

import lombok.Data;

@Data
public class BoardWriteRequestDTO {

    private int boardIndex; // 게시판 번호
    private int userIndex; // 유저 번호
    private String title; // 제목
    private String content; // 내용
}
