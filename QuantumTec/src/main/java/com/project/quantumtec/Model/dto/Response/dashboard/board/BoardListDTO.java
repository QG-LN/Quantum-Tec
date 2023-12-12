package com.project.quantumtec.Model.dto.Response.dashboard.board;

import lombok.Data;

@Data
public class BoardListDTO {
    private int postIndex;           // 게시글 번호
    private String boardCategoryName;          //게시판 명칭
    private String postTitle;      // 게시글 제목
    private String postAuthorName;  // 게시글 작성자
    private int postAuthorIndex;  // 게시글 작성자 번호
    private String postCreatedDate;        // 게시글 작성일
    private int postViews;           // 게시글 조회수
    private int postUpvotes;           // 게시글 좋아요
    private int postDownvotes;           // 게시글 싫어요
    private int postComments;           // 게시글 댓글 수
}
