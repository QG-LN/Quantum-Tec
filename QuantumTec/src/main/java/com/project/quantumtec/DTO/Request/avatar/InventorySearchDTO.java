package com.project.quantumtec.DTO.Request.avatar;

import lombok.Data;

@Data
public class InventorySearchDTO {
    private String userId; // 유저 아이디
    private String searchValue; // 검색 값
}
