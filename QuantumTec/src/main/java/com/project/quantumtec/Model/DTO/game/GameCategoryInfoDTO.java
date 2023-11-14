package com.project.quantumtec.Model.DTO.game;

import lombok.Data;

/**
 * PackageName : com.project.quantumtec.DTO.game
 * FileName : GameCategoryListInfoDTO
 * Author : Argonaut
 * Date : 2023-06-13
 * Description : 카테고리에 따른 관련 게임정보를 담고 있는 DTO
 */

@Data
public class GameCategoryInfoDTO {
    private int gameIndex;              // 게임 번호
    private String gameName;            // 게임 이름
    private String gamePrice;           // 게임 가격
    private String gameImageLocation;   // 게임 이미지 위치
}
