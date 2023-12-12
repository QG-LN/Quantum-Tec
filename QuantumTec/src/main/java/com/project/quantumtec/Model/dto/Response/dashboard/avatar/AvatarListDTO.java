package com.project.quantumtec.Model.dto.Response.dashboard.avatar;

import lombok.Data;

@Data
public class AvatarListDTO {
    private int itemIndex; // 아이템 번호
    private String itemName; // 아이템 이름
    private String itemCategoryName; // 아이템 카테고리 이름
}
