package com.project.quantumtec.DTO.Request.avatar;

import lombok.Data;

@Data
public class CashChargeDTO {
    private String userId; // 유저 아이디
    private int amount; // 충전 금액
}
