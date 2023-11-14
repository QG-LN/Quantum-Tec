package com.project.quantumtec.Model.dto.game;

import lombok.Data;

@Data
public class GameSearchResponseDTO {
    private int gameIndex; // 게임 아이디
    private String gameName; // 게임 이름
    private String gamePrice; // 게임 가격
    private String gameCategoryName; // 게임 장르
    private String gameImageLocation; // 게임 이미지
}
