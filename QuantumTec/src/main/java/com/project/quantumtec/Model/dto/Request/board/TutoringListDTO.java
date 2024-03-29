package com.project.quantumtec.Model.dto.Request.board;

import lombok.Data;

@Data
public class TutoringListDTO {
    /**
     * @todo 임시로 페이지 번호와 키워드 받도록 변경 추후 변경 예정
     */
    private int pageNum; // 페이지 번호
//    private int startIndex; // 시작 인덱스
//    private int endIndex; // 끝 인덱스
    private String keyword; // 검색 키워드
    private String[] subject; // 과목
//    private String[] day; // 기간
//    private int[] person; // 인원
//    private String tutorType; // 튜터, 튜티
}
