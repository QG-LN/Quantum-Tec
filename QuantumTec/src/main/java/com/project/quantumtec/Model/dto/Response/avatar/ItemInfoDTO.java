package com.project.quantumtec.Model.dto.Response.avatar;

import lombok.Data;

@Data
public class ItemInfoDTO {
    private int itemIndex;
    private String itemName;
    private String itemDesc;
    private String itemPrice;
    private String itemCategoryName;
    private String userNickname;    // itemCreatorNickname
}
