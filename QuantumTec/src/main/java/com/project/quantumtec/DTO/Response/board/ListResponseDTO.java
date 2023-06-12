package com.project.quantumtec.DTO.Response.board;

import lombok.Data;

@Data
public class ListResponseDTO { // 게시글 리스트를 담는 Response DTO

    private int postIndex;           // 게시글 인덱스
    private String boardTitle;          //게시판 제목
    private String postTitle;      // 게시글 제목
    private String postAuthor;  // 게시글 작성자
    private String postDate;        // 게시글 작성일
    private int postView;           // 게시글 조회수
    private int postUpvotes;           // 게시글 좋아요
}
