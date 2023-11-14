package com.project.quantumtec.Model.VO.user;

import lombok.Getter;

@Getter
public class UserPaymentVO {
    private int paymentIndex;       // 결제 번호
    private int userIndex;          // 사용자 인덱스
    private String itemName;        // 아이템 이름
    private String paymentDate;     // 결제 날짜
    private String paymentMethod;   // 결제 방법
    private String paymentAmount;   // 결제 금액
    private String paymentStatus;   // 결제 상태
}
