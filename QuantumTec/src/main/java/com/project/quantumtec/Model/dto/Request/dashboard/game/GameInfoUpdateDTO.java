package com.project.quantumtec.Model.dto.Request.dashboard.game;

import com.project.quantumtec.Model.dto.game.GameCommentDTO;
import lombok.Data;

@Data
public class GameInfoUpdateDTO {
    private int gameIndex; // 게임 번호
    private String gameName; // 게임 이름
    private int gamePrice; // 게임 가격
    private int gameCategoryId; // 게임 카테고리 번호

    // 우측 상자에 표시될 정보
    private String gamePlatform; // 게임 플랫폼
    private String gameVersion; // 게임 버전
    private String gameVersionUpdateDate; // 게임 버전 업데이트 날짜
    private String gameShortDescription; // 게임 짧은 설명
    private String gameMemo; // 게임 메모

    // 게임 상세 정보
    private String gameImageLocation; // 게임 이미지 위치
    private int gamePurchasePrice; // 게임 구매 가격
    private String gameDescription; // 게임 설명
    // private String gameSaleInfo; // 게임 할인 정보
    private int gameDiscountRate; // 게임 할인율
    private String gameDiscountStartDate; // 게임 할인 시작 날짜
    private String gameDiscountEndDate; // 게임 할인 종료 날짜
    private String gameSaveDirectory; // 게임 저장 위치

    private String gameVideoLocation; // 게임 비디오 위치
}
