package com.project.quantumtec.Model.DTO.Request.avatar;

import lombok.Data;

@Data
public class CategoryInventorySearchDTO {
    private String userId; // 유저 아이디
    private String itemCategoryName; // 아이템 카테고리 이름
    private String searchValue; // 검색 값
}
