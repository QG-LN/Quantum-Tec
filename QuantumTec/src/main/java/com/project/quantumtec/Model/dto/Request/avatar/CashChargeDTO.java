package com.project.quantumtec.Model.dto.Request.avatar;

import lombok.Data;

@Data
public class CashChargeDTO {
    private String userId; // 유저 아이디
    private int amount; // 충전 금액
    private String orderId; // 주문 번호
}
