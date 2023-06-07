package com.project.quantumtec.DTO.game;

import lombok.Data;

@Data
public class GameSearchResponseDTO {
    private int gameIndex; // 게임 아이디
    private String gameName; // 게임 이름
    private String gamePrice; // 게임 가격
    private String gameCartegoryName; // 게임 장르
    private String gameImage; // 게임 이미지
}
