package com.project.quantumtec.DTO.Request.dashboard;

import lombok.Data;

@Data
public class UserItemSearchDTO {
    private int userIndex;          // 사용자 고유번호
    private String category;            // 기준(전체, 아바타, 게임)
    // 한번에 항목들을 불러오는 것으로 수정.
//    private int StartNum;            // 시작 번호
//    private int EndNum;              // 끝 번호
    private String keyword;             // 검색어(있을수도 있고 없을수도 있지만 일단추가)
}
