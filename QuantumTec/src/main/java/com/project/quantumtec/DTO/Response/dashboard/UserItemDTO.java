package com.project.quantumtec.DTO.Response.dashboard;

import lombok.Data;

@Data
public class UserItemDTO {
    private int itemNum;            // 아이템 번호
    private String itemType;        // 아이템 종류
    private String itemName;        // 아이템 이름
    private int itemPrice;       // 아이템 가격
    private String itemPayment;     // 아이템 결제 방식
    private String itemPaymentStatus; // 아이템 결제 상태
    private String itemPurchaseDate; // 아이템 구매 날짜

}
