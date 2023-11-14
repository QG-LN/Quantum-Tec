package com.project.quantumtec.Model.dto.Request.dashboard;

import lombok.Data;

@Data
public class UserSearchDTO {
    private int startNum;   // 시작 번호
    private int endNum;     // 끝 번호
    private String sortType;      // 정렬 종류(이름, 닉네임, 등록일 등등)
    private String searchValue;     // 검색 값
}
