package com.project.quantumtec.Model.dto.Response.dashboard;

import lombok.Data;

@Data
public class UserItemDTO {
    private int paymentIndex;            // 구매 번호
    private String productType;        // 상품 종류
    private String productName;        // 상품 이름
    private int paymentAmount;       // 구매 가격
    private String paymentMethod;     // 구매 결제 방식
    private String paymentStatus; // 구매 결제 상태
    private String paymentDate; // 구매 날짜

}
