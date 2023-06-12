package com.project.quantumtec.DTO.Request.board;

import lombok.Data;

@Data
public class CommentVoteDTO { // 댓글 추천/비추천 요청 DTO
    private int commentIndex; // 댓글 번호
    private int postIndex; // 게시글 번호
    private String userID; // 유저 아이디
}
