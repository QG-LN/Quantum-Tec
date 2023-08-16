package com.project.quantumtec.DAO.avatar;

import java.util.List;

import com.project.quantumtec.DTO.Request.avatar.CategoryInventoryDTO;
import com.project.quantumtec.DTO.Request.avatar.InventorySearchDTO;
import com.project.quantumtec.DTO.Response.avatar.AvatarInventoryDTO;

/**
 * PackageName : com.project.quantumtec.DAO.avatar
 * FileName : avatarDAO
 * Author : MayoneJY
 * Date : 2023-08-16
 * Description : 아바타 관련 DAO
 */
public interface AvatarDAO {
    // 아바타 모든 인벤토리 정보 조회
    public List<AvatarInventoryDTO> getAvatarInventory(String userId);

    // 아바타 카테고리 정보 조회
    public String[] getAvatarCategory();

    // 아바타 카테고리 별 인벤토리 정보 조회
    public List<AvatarInventoryDTO> getAvatarCategoryInventory(CategoryInventoryDTO categoryInventoryDTO);

    // 아바타 searchValue로 인벤토리 정보 조회
    public List<AvatarInventoryDTO> getAvatarSearchInventory(InventorySearchDTO inventorySearchDTO);
}
