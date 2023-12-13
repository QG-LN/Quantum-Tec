package com.project.quantumtec.Model.dto.Response.dashboard.avatar;

import lombok.Data;

@Data
public class AvatarPaymentHistoryDTO {
    private int paymentIndex; // 결제 번호
    private int paymentAmount; // 결제 금액
    private String paymentMethod; // 결제 방법
    private String paymentDate; // 결제 날짜
    private String paymentStatus; // 결제 상태
    private String userId; // 유저 아이디
}
