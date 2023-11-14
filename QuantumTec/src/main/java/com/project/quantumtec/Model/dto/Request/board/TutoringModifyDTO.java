package com.project.quantumtec.Model.dto.Request.board;

import lombok.Data;

@Data
public class TutoringModifyDTO {
    private int postIndex;                          // 게시글 번호
    private String userID;                          // 유저 아이디
    private String postTitle;                       // 튜터링 게시물 제목
    private boolean runningType;                    // 온라인 여부
    private String link;                            // 연락처 - 카톡 오픈채팅방 링크
    private String startDate;                       // 시작 날짜
    private String expectedTime;                    // 예상 기간
    private int maxUserCount;                       // 모집 인원
    private String category;                        // 모집 분야
    private String tag;                             // 모집 구분
    private String postIntro;                       // 튜터링 소개글
    private String postContent;                     // 튜터링 내용
}
