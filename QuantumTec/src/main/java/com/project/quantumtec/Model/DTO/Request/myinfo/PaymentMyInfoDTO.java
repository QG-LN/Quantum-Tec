package com.project.quantumtec.Model.DTO.Request.myinfo;

import lombok.Data;

/***
 * 결제 내역을 확인하기 위한 DTO
 * @todo 추후 필요한 정보 추가
 */
@Data
public class PaymentMyInfoDTO {
    private String userID;          // 유저 아이디
    private int currentPage;        // 현재 페이지
    private int startNum;           // 시작 번호
    private int endNum;             // 끝 번호
    private String searchKeyword;   // 검색 키워드
    private String listType;        // 리스트 타입
}
