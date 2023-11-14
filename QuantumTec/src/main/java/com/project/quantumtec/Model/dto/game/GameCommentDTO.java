package com.project.quantumtec.Model.dto.game;

import lombok.Data;

/**
 * PackageName : com.project.quantumtec.DTO.game
 * FileName : GameCommentDTO
 * Author : Argonaut
 * Date : 2023-06-11
 * Description : 게임 속 댓글 정보를 담고 있는 DTO
 */
@Data
public class GameCommentDTO {
    private String userId;              // 댓글 작성자 ID
    private String userName;            // 댓글 작성자 이름
    private String commentContent;      // 댓글 내용
    private String commentCreatedDate;  // 댓글 작성일자
    private int commentUpvote;          // 댓글 추천수
    private int commentDownvote;        // 댓글 비추천수
    private int commentRating;          // 댓글 평점
}
