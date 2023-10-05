package com.project.quantumtec.DTO.Request.board;

import lombok.Data;

@Data
public class TutoringListDTO {
    private int pageNum; // 페이지 번호
    private int startIndex; // 시작 인덱스
    private int endIndex; // 끝 인덱스
    private String keyword; // 검색 키워드
    private String[] subject; // 과목
    private String period; // 기간
    private int participant; // 인원
}
