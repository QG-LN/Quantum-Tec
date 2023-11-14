package com.project.quantumtec.Model.DTO.game;

import lombok.Data;

/**
 * PackageName : com.project.quantumtec.DTO.game
 * FileName : GameDetailsInfoDTO
 * Author : Argonaut
 * Date : 2023-06-11
 * Description : 게임 상세 페이지로 전달할 게임 정보와 유저의 게임 플레이 정보를 담고 있는 DTO
 */

@Data
public class GameDetailsInfoDTO {


    private String developerName;           // 게임 개발자 이름
    private String gameReleaseDate;         // 게임 출시일
    private String gamePrice;               // 게임 가격
    private String gameDescription;         // 게임 정보
    private String gameShortDescription;    // 게임 짧은 정보
    private String gameImageLocation;       // 게임 이미지
    private String gamePlatForm;            // 게임 플랫폼
    private String gameVersionUpdateDate;   // 게임 업데이트일
    private String gameVersion;             // 게임 버전
    private String gameCategoryName;        // 게임 장르
    private String gameRating;              // 게임 등급


    private String userGamePlayRecentPlayDateTime;  // 유저가 최근에 플레이한 날짜
    private String userGamePlayTotalPlayTime ;  // 유저가 총 플레이한 시간
}
