package com.project.quantumtec.Model.dto.Response.myInfo;

import lombok.Data;

/**
 * 결제 리스트에 포함될 항목들
 * */
@Data
public class PaymentHistoryDTO {
    private int paymentIndex;       // 결제 번호
    private String paymentDesc;     // 결제 내역
    private String paymentAmount;   // 결제 금액
    private String paymentDate;     // 결제 날짜
    private String paymentType;     // 결제 타입
    private String paymentStatus;   // 결제 상태
}
