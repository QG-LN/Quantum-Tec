package com.project.quantumtec.Model.dto.Request.dashboard.game;

import lombok.Data;

@Data
public class GameTimeListDTO {
    private String StartTime; // 게임 시작 시간
    private String EndTime; // 게임 종료 시간
}
