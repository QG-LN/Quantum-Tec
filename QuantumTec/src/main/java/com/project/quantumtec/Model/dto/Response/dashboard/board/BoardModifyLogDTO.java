package com.project.quantumtec.Model.dto.Response.dashboard.board;

import lombok.Data;

@Data
public class BoardModifyLogDTO {
    private String userID; // 수정자 아이디
    private String postTitle; // 게시글 제목
    private String postContent; // 게시글 내용
    private String postUpdateDate; // 게시글 수정일
    private int boardIndex; // 게시판 번호
}
