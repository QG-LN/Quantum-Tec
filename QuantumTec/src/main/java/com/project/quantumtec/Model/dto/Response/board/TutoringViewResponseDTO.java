package com.project.quantumtec.Model.dto.Response.board;

import lombok.Data;

@Data
public class TutoringViewResponseDTO {
    private String userNickname; // 작성자 닉네임
    private String userIcon; // 작성자 아이콘
    private int postTitle; // 튜터링 게시물 제목
    private String postDate; // 게시글 등록일
    private String[] type; // 모집 구분 (스터디/학습위주)
    private String online; // 온라인 여부
    private String contact; // 연락처 - 카톡 오픈채팅방 링크
    private String startDate; // 시작 날짜
    private String period; // 예상 기간
    private int participant; // 모집 인원
    private String[] subject; // 과목
    private String postInfo; // 튜터링 소개글
    private String content; // 튜터링 내용
}

