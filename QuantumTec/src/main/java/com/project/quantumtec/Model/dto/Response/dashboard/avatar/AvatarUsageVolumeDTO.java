package com.project.quantumtec.Model.dto.Response.dashboard.avatar;

import lombok.Data;

@Data
public class AvatarUsageVolumeDTO {
    private int paymentSuccessCount; // 결제 성공 횟수
    private int itemUsageCount; // 아이템 사용량
    private int itemNotUsageCount; // 아이템 미사용량
}
