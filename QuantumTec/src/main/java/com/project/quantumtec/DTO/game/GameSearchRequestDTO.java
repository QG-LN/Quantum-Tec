package com.project.quantumtec.DTO.game;

import lombok.Data;

@Data
public class GameSearchRequestDTO {
    private int startIndex; // 시작 인덱스
    private int endIndex; // 끝 인덱스
    private String gameName; // 게임 이름
    private String gameCategoryName; // 게임 장르
    private int gamePrice; // 게임 가격
}
