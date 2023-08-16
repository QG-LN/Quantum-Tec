package com.project.quantumtec.Service.avatar;

import java.util.List;

import com.project.quantumtec.DTO.Request.avatar.CategoryInventoryDTO;
import com.project.quantumtec.DTO.Request.avatar.InventorySearchDTO;
import com.project.quantumtec.DTO.Response.avatar.AvatarInventoryDTO;

public interface AvatarService {
    
    // 아바타 모든 인벤토리 정보 조회
    public List<AvatarInventoryDTO> getAvatarInventory(String userId);

    // 아바타 카테고리 정보 조회
    public String[] getAvatarCategory();

    // 아바타 카테고리 별 인벤토리 정보 조회
    public List<AvatarInventoryDTO> getAvatarCategoryInventory(CategoryInventoryDTO categoryInventoryDTO);

    // 아바타 searchValue로 인벤토리 정보 조회
    public List<AvatarInventoryDTO> getAvatarSearchInventory(InventorySearchDTO inventorySearchDTO);
}
