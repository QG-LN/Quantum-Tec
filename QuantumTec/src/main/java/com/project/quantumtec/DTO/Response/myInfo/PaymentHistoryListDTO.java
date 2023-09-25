package com.project.quantumtec.DTO.Response.myInfo;

import lombok.Data;
/**
 * 임시 DTO
 * 추후 필요한 정보 추가 및 수정
 * */
@Data
public class PaymentHistoryListDTO {
    private int paymentIndex;       // 결제 번호
    private String paymentDesc;     // 결제 내역
    private String paymentAmount;   // 결제 금액
    private String paymentDate;     // 결제 날짜
    private String paymentType;     // 결제 타입
    private String paymentStatus;   // 결제 상태
}
