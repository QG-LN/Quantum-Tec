package com.project.quantumtec.Model.vo.game;

import lombok.Data;

@Data
public class GameCommentVO {
    
    private String userId;              // 댓글 작성자 ID
    private String userName;            // 댓글 작성자 이름
    private String commentContent;      // 댓글 내용
    private String commentCreatedDate;  // 댓글 작성일자
    private int commentUpvote;          // 댓글 추천수
    private int commentDownvote;        // 댓글 비추천수
    private int commentRating;          // 댓글 평점

    // 착용중인 아바타 정보
    private String avatarItemList; // 착용중인 아바타 아이템 리스트

}
