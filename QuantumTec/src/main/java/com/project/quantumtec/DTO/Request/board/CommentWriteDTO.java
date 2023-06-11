package com.project.quantumtec.DTO.Request.board;

import lombok.Data;

@Data
public class CommentWriteDTO { // 댓글 작성 요청 DTO
    private int postIndex; // 게시글 번호
    private int userIndex; // 유저 번호
    private String commentContent; // 댓글 내용
}
