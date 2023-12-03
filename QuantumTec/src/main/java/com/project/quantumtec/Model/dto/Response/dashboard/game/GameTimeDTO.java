package com.project.quantumtec.Model.dto.Response.dashboard.game;

import lombok.Data;
import lombok.Setter;

import java.util.List;

@Data
public class GameTimeDTO {
    private int[] accessCount; // 게임 시간 (0시~23시)

    // public void init(){
    //     time = new int[24];
    //     for(int i = 0; i < 24; i++){
    //         time[i] = 0;
    //     }
    // }
    // public void setTime(int index, int value){
    //     time[index] = value;
    // }
}
