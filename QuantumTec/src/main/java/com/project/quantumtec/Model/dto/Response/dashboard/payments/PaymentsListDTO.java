package com.project.quantumtec.Model.dto.Response.dashboard.payments;

import lombok.Data;

@Data
public class PaymentsListDTO {          
    private int paymentIndex;           // 결제 번호
    private String paymentName;            // 결제 내역
    private String userId;              // 결제한 유저 아이디
    private String paymentMethod;           // 결제 수단
    private String paymentDate;             // 결제 일자
    private String paymentStatus;           // 결제 상태

    private int userIndex;              // 결제한 유저 번호
    private String paymentCategory;         // 결제한 아이템 종류 (Avatar, Game, Cash)
    private int paymentItemIndex;           // 결제한 아이템 번호 (있을 경우)
    private int paymentPrice;               // 결제 금액

    private int update_result;
}
