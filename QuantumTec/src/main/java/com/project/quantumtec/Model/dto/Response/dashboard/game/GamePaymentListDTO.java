package com.project.quantumtec.Model.dto.Response.dashboard.game;

import lombok.Data;

@Data
public class GamePaymentListDTO {
    private int paymentIndex;            // 구매 번호
    private String userId;        // 사용자 아이디
    private int paymentAmount;       // 구매 가격
    private String paymentMethod;     // 결제 수단
    private String paymentStatus; // 결제 상태
    private String paymentDate; // 결제 날짜
    private int userIndex; // 사용자 번호
}
