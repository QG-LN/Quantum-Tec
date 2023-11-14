package com.project.quantumtec.Model.DTO.Request.board;

import lombok.Data;

@Data
public class CommentModifyDTO { // 댓글 수정 요청 DTO
    private int postIndex; // 게시글 번호
    private int commentIndex; // 댓글 번호
    private String userID; // 유저 아이디
    private String commentContent; // 댓글 내용
}
