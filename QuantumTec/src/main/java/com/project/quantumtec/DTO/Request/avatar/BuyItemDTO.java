package com.project.quantumtec.DTO.Request.avatar;

import lombok.Data;

@Data
public class BuyItemDTO {
    private int userIndex; // 유저 인덱스
    private String userId; // 유저 아이디
    private int itemIndex; // 아이템 인덱스
    private String paymentMethod; // 결제 방법
    private String paymentStatus; // 결제 상태
    private int paymentAmount; // 결제 금액
}
