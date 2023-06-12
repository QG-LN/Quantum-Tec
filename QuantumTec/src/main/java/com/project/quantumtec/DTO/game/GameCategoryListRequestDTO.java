package com.project.quantumtec.DTO.game;

import lombok.Data;

/**
 * PackageName : com.project.quantumtec.DTO.game
 * FileName : GameCategoryListRequestDTO
 * Author : Argonaut
 * Date : 2023-06-13
 * Description :
 */

@Data
public class GameCategoryListRequestDTO {
    private String gameCategoryName;
    private int startIndex;
    private int endIndex;
}
