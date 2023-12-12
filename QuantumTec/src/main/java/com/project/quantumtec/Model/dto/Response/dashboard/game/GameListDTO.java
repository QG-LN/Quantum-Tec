package com.project.quantumtec.Model.dto.Response.dashboard.game;

import com.project.quantumtec.Model.vo.dashboard.GameListVO;
import lombok.Data;

@Data
public class GameListDTO {
    private int gameIndex; // 게임 번호
    private String gameName; // 게임 이름
    private int gamePrice; // 게임 가격
    private String gameDeveloper; // 게임 개발사
    private int gameDeveloperIndex; // 게임 개발사 번호
    private String gameCategoryName; // 게임 카테고리 번호
    private String gameReleaseDate; // 게임 출시일
    private float gameRating; // 게임 평점

    // 우측 상자에 표시될 정보
    private String gamePlatform; // 게임 플랫폼
    private String gameVersion; // 게임 버전
    private String gameVersionUpdateDate; // 게임 버전 업데이트 날짜
    private String gameShortDescription; // 게임 짧은 설명
    private String gameMemo; // 게임 메모

    public GameListDTO mapGameListVOToDTO(GameListVO gameListVO){
        GameListDTO gameListDTO = new GameListDTO();
        gameListDTO.setGameIndex(gameListVO.getGameIndex());
        gameListDTO.setGameName(gameListVO.getGameName());
        gameListDTO.setGamePrice(gameListVO.getGamePrice());
        gameListDTO.setGameDeveloper(gameListVO.getGameDeveloper());
        gameListDTO.setGameDeveloperIndex(gameListVO.getGameDeveloperIndex());
        gameListDTO.setGameCategoryName(gameListVO.getGameCategoryName());
        gameListDTO.setGameReleaseDate(gameListVO.getGameReleaseDate());
        gameListDTO.setGameRating(gameListVO.getGameRating());
        gameListDTO.setGamePlatform(gameListVO.getGamePlatform());
        gameListDTO.setGameVersion(gameListVO.getGameVersion());
        gameListDTO.setGameVersionUpdateDate(gameListVO.getGameVersionUpdateDate());
        gameListDTO.setGameShortDescription(gameListVO.getGameShortDescription());
        gameListDTO.setGameMemo(gameListVO.getGameMemo());
        return gameListDTO;
    }
}
