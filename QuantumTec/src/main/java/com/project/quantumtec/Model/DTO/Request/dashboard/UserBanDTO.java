package com.project.quantumtec.Model.DTO.Request.dashboard;

import lombok.Data;

@Data
public class UserBanDTO {
    private int userIndex;          // 사용자 인덱스
    private String banReason;       // 차단 사유
    private int banSchedule;        // 차단 기간
}
