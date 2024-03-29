package com.project.quantumtec.Model.dto.Response.dashboard.game;

import com.project.quantumtec.Model.dto.Response.board.CommentListResponseDTO;
import lombok.Data;

import java.util.List;

@Data
public class GameInfoDTO {
    // 게임 상세 정보
    private String gameImageLocation; // 게임 이미지 위치
    private int gameSales; // 게임 판매량
    private int gamePrice; // 게임 구매 가격
    private String gameDescription; // 게임 설명
    // private String gameSaleInfo; // 게임 할인 정보
    private int gameDiscountRate; // 게임 할인율
    private String gameDiscountStartDate; // 게임 할인 시작일
    private String gameDiscountEndDate; // 게임 할인 종료일
    // private String gameSaveDirectory; // 게임 저장 위치
    // private String gameVideoLocation; // 게임 비디오 위치
    // private String gamePurchaseTrend; // 게임 구매 추이
    private String gameRefund; // 게임 환불
    // private String gameReport; // 게임 신고

    // TODO: 수정 부탁드립니다. (일, 주, 월, 총별)
    // private int gameCommentCount; // 게임 댓글 작성량
}
