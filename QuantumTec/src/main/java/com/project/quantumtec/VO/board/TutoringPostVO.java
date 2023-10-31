package com.project.quantumtec.VO.board;

import lombok.Getter;

/**
 * 튜터링 게시글 VO
 * 
 */
@Getter
public class TutoringPostVO {
    private int postTutoringIndex;              // 게시글 번호
    private String authorNickname;              // 게시글 작성자 닉네임
    private String postTutoringTitle;           // 게시글 제목
    private String postTutoringContent;         // 게시글 내용
    private String postCreatedDate;             // 게시글 작성일
    private int postTutoringUserCount;          // 게시글 참여 인원
    private int postTutoringMaxUserCount;       // 게시글 최대 참여 인원
    private boolean postTutoringState;          // 게시글 상태
    private String gameCategories;              // 게임 카테고리
    private String tags;                        // 게시글 태그
}