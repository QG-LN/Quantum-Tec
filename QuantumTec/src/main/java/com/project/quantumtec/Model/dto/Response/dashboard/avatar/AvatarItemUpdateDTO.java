package com.project.quantumtec.Model.dto.Response.dashboard.avatar;

import lombok.Data;

@Data
public class AvatarItemUpdateDTO {
    private String itemName; // 아이템 이름
    private int itemPrice; // 아이템 가격
    private String itemDesc; // 아이템 설명
    private int itemIndex; // 아이템 번호
}
