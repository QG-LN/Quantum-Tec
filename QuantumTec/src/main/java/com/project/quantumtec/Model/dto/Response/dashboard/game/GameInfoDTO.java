package com.project.quantumtec.Model.dto.Response.dashboard.game;

import com.project.quantumtec.Model.dto.game.GameCommentDTO;
import lombok.Data;

import java.util.List;
@Data
public class GameInfoDTO {
    // 게임 상세 정보
    private String gameImageLocation; // 게임 이미지 위치
    private int gameSales; // 게임 판매량
    private int gamePurchasePrice; // 게임 구매 가격
    private String gameDescription; // 게임 설명
    private String gameSaleInfo; // 게임 할인 정보
    private String gameSaveDirectory; // 게임 저장 위치

    // 게임 사용자 평가
    private List<GameCommentDTO> gameCommentList; // 게임 댓글 리스트
    // private List<리뷰 게시글 DTO> gameReviewList; // 게임 리뷰 리스트

    private String gameVideoLocation; // 게임 비디오 위치
    private String gamePurchaseTrend; // 게임 구매 추이
    private int gameAccessByTime; // 시간대 별 게임 접속량
    private int gameAccessByDate; // 일일 게임 접속량
    private int gameCommentCount; // 게임 댓글 개수
    private int gameRatingVolatility; // 게임 평점 변동성
    private int gameTopRankTime; // 게임 탑 랭킹 시간
    private String gameRefund; // 게임 환불
    private String gameReport; // 게임 신고
}
