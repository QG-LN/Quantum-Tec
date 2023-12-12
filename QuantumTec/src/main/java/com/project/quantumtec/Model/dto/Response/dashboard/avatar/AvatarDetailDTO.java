package com.project.quantumtec.Model.dto.Response.dashboard.avatar;

import lombok.Data;

@Data
public class AvatarDetailDTO {
    private int itemPrice; // 아이템 가격
    private String userName; // 사용자 이름
    private String itemCreateorName; // 아이템 제작자 이름
    private String itemCreateDate; // 아이템 제작 날짜
    private String itemDesc; // 아이템 설명

}
