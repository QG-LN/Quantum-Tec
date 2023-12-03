package com.project.quantumtec.Model.dto.Response.dashboard.game;

import com.project.quantumtec.Model.dto.Response.board.CommentListResponseDTO;
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
    private String gameVideoLocation; // 게임 비디오 위치
    private String gamePurchaseTrend; // 게임 구매 추이
    private String gameRefund; // 게임 환불
    private String gameReport; // 게임 신고
    private int gameCommentCount; // 게임 댓글 작성량
}
