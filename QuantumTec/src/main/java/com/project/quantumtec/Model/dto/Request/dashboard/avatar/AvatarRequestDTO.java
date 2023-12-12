package com.project.quantumtec.Model.dto.Request.dashboard.avatar;

import lombok.Data;

@Data
public class AvatarRequestDTO {
    private String itemCategoryName; // 아이템 카테고리 이름
    private int startIndex; // 시작 인덱스
    private int offset; // 가져올 데이터 개수
}
