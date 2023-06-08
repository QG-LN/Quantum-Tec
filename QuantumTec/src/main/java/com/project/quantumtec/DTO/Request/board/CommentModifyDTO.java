package com.project.quantumtec.DTO.Request.board;

public class CommentModifyDTO { // 댓글 수정 요청 DTO
    private int post_index; // 게시글 번호
    private int comment_index; // 댓글 번호
    private int user_index; // 유저 번호
    private String comment_content; // 댓글 내용
}
