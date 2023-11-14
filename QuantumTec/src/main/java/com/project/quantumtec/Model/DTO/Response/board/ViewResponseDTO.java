package com.project.quantumtec.Model.DTO.Response.board;

import lombok.Data;

@Data
public class ViewResponseDTO {
    private String boardTitle;          //게시판 제목
    private String postTitle;           // 게시글 제목
    private String postAuthor;      // 게시글 작성자
    private String postDate;        // 게시글 작성일
    private int postView;           // 게시글 조회수
    private int postUpvotes;           // 게시글 좋아요
    private int postDownvotes;           // 게시글 싫어요
    private String postContent;     // 게시글 내용
}
