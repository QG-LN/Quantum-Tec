package com.project.quantumtec.DTO.game;

import lombok.Data;

/**
 * PackageName : com.project.quantumtec.DTO.game
 * FileName : GameSearchDTO
 * Author : Argonaut
 * Date : 2023-06-09
 * Description : 게임을 검색하기위한 정보를 담고 있는 DTO
 */
@Data
public class GameSearchDTO {

    private int gameIndex;       // 게임 Index
    private String gameName;    // 게임 이름
    private String userId;      // 유저 ID
}
