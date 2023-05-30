package com.project.quantumtec.DTO.game;

import lombok.Data;

@Data
public class GameDTO {
    private int gameID; // 게임 아이디
    private String gameName; // 게임 이름
    private String gameDeveloper; // 게임 개발사
    private String gameReleaseDate; // 게임 출시일
    private String gamePrice; // 게임 가격
    private String gameInfo; // 게임 정보
    private String[] gameGenre; // 게임 장르, 장르는 여러개일 수 있으므로 배열로 받음
    private String gameImage; // 게임 이미지
    private String gameFlatForm; // 게임 플랫폼
    private String gameUpdateDate; // 게임 업데이트일
    private String gameVersion; // 게임 버전
}
