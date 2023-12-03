package com.project.quantumtec.Model.dto.Response.dashboard.game;

public class GameDateDTO {
    private int[] date; // 게임 날짜 (31일)

    public void init(){
        date = new int[31];
        for(int i = 0; i < 31; i++){
            date[i] = 0;
        }
    }
    public void setDate(int index, int value){
        date[index] = value;
    }
}
