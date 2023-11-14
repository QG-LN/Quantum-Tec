package com.project.quantumtec.Model.DTO.Response.myInfo;

import lombok.Data;

import java.util.List;

/**
 * 임시 DTO
 * 추후 필요한 정보 추가 및 수정
 * */
@Data
public class PaymentHistoryListDTO {
    private List<PaymentHistoryDTO> paymentHistoryList;     // 결제 내역 리스트
    private int paymentHistoryCount;                        // 결제 내역 개수
    private int itemMaxCount;                                // 한 페이지 당 게시글 수
}
