package com.project.quantumtec.Service.avatar;

import java.util.List;

import com.project.quantumtec.DTO.Request.avatar.CategoryInventoryDTO;
import com.project.quantumtec.DTO.Request.avatar.CategoryInventorySearchDTO;
import com.project.quantumtec.DTO.Request.avatar.InventoryItemDTO;
import com.project.quantumtec.DTO.Request.avatar.InventorySearchDTO;
import com.project.quantumtec.DTO.Response.avatar.AvatarInventoryDTO;
import com.project.quantumtec.DTO.Response.avatar.ItemInfoDTO;

public interface AvatarService {
    
    // 아바타 모든 인벤토리 정보 조회
    public List<AvatarInventoryDTO> getAvatarInventory(String userId);

    // 아바타 카테고리 정보 조회
    public String[] getAvatarCategory();

    // 아바타 카테고리 별 인벤토리 정보 조회
    public List<AvatarInventoryDTO> getAvatarCategoryInventory(CategoryInventoryDTO categoryInventoryDTO);

    // 아바타 searchValue로 인벤토리 정보 조회
    public List<AvatarInventoryDTO> getAvatarSearchInventory(InventorySearchDTO inventorySearchDTO);

    // 착용중인 아바타 아이템 정보 조회
    public List<AvatarInventoryDTO> getAvatarActiveInventory(String userId);

    // 아바타 카테고리를 searchValue로 인벤토리 정보 조회
    public List<AvatarInventoryDTO> getAvatarCategorySearchInventory(CategoryInventorySearchDTO categoryInventorySearchDTO);

    // 아바타 아이템 착용
    public boolean setActiveAvatarItem(InventoryItemDTO inventoryItemDTO);

    // 아바타 아이템 착용 해제
    public boolean setInactiveAvatarItem(InventoryItemDTO inventoryItemDTO);

    // 아바타 모든 아이템 10개씩 정보 조회
    public List<ItemInfoDTO> getAvatarShopMain(String userId);

    // 아바타 카테고리별 아이템 모든 정보 조회
    public List<ItemInfoDTO> getAvatarShopCategoryItem(CategoryInventoryDTO categoryInventoryDTO);
}
