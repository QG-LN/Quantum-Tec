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
}
