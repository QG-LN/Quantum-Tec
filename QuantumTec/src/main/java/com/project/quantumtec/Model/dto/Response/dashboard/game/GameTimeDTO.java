package com.project.quantumtec.Model.dto.Response.dashboard.game;

import lombok.Data;

@Data
public class GameTimeDTO {
    private int[] timeArray;

    // 기본 생성자
    public GameTimeDTO(){
        timeArray = new int[24];
    }

    // 복사 생성자
    public GameTimeDTO(GameTimeDTO gameTimeDTO){
        this.timeArray = gameTimeDTO.getTimeArray();
    }

    public void countTime(String startTime, String endTime){
    int start = Integer.parseInt(startTime.substring(0,2));
    int end = Integer.parseInt(endTime.substring(0,2));
        for (int i = start; i <= end; i++){
            timeArray[i]++;
            }
    }
}

