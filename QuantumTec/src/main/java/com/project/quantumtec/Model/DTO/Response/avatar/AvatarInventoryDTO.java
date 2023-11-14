package com.project.quantumtec.Model.DTO.Response.avatar;

import lombok.Data;

@Data
public class AvatarInventoryDTO {
    private int itemIndex; // 아이템 번호
    private String itemName; // 아이템 이름
    private String itemDesc; // 아이템 설명
    private String itemCategoryName; // 아이템 카테고리 이름
    private String paymentDate; // 아이템 구매 날짜
    private boolean itemUsageStatus; // 아이템 사용 여부
}
