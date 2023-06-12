package com.project.quantumtec.DTO.Request.board;

import lombok.Data;

@Data
public class CommentModifyDTO { // 댓글 수정 요청 DTO
    private int postIndex; // 게시글 번호
    private int commentIndex; // 댓글 번호
    private int userIndex; // 유저 번호
    private String commentContent; // 댓글 내용
}
