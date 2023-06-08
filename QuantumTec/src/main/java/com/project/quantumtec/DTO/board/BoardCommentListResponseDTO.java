package com.project.quantumtec.DTO.board;

import lombok.Data;

@Data
public class BoardCommentListResponseDTO {

    private int commentIndex; // 댓글 번호
    private String commentContent; // 댓글 내용
    private String commentDate; // 댓글 작성일
    private String commentWriter; // 댓글 작성자
    private int commentUpvote; // 댓글 추천 수
    private int commentDownvote; // 댓글 비추천 수
    private int commentRating; // 댓글 평점
}
