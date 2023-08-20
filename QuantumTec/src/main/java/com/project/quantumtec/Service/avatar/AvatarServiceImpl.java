package com.project.quantumtec.Service.avatar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.quantumtec.DAO.avatar.AvatarDAO;
import com.project.quantumtec.DTO.Request.avatar.CategoryInventoryDTO;
import com.project.quantumtec.DTO.Request.avatar.CategoryInventorySearchDTO;
import com.project.quantumtec.DTO.Request.avatar.InventoryItemDTO;
import com.project.quantumtec.DTO.Request.avatar.InventorySearchDTO;
import com.project.quantumtec.DTO.Response.avatar.AvatarInventoryDTO;

/**
 * PackageName : com.project.quantumtec.Service.avatar
 * FileName : AvatarServiceImpl
 * Author : MayoneJY
 * Date : 2023-08-16
 * Description : 아바타 관련 서비스
 */
@Service("AvatarServiceImpl")
public class AvatarServiceImpl implements AvatarService{
    
    @Autowired
    private AvatarDAO avatarDAO;

    // 아바타 모든 인벤토리 정보 조회
    @Override
    public List<AvatarInventoryDTO> getAvatarInventory(String userId){
        return avatarDAO.getAvatarInventory(userId);
    }

    // 아바타 카테고리 정보 조회
    @Override
    public String[] getAvatarCategory(){
        return avatarDAO.getAvatarCategory();
    }

    // 아바타 카테고리 별 인벤토리 정보 조회
    @Override
    public List<AvatarInventoryDTO> getAvatarCategoryInventory(CategoryInventoryDTO categoryInventoryDTO){
        return avatarDAO.getAvatarCategoryInventory(categoryInventoryDTO);
    }

    // 아바타 searchValue로 인벤토리 정보 조회
    @Override
    public List<AvatarInventoryDTO> getAvatarSearchInventory(InventorySearchDTO inventorySearchDTO){
        return avatarDAO.getAvatarSearchInventory(inventorySearchDTO);
    }

    // 착용중인 아바타 아이템 정보 조회
    @Override
    public List<AvatarInventoryDTO> getAvatarActiveInventory(String userId){
        return avatarDAO.getAvatarActiveInventory(userId);
    }

    // 아바타 카테고리를 searchValue로 인벤토리 정보 조회
    @Override
    public List<AvatarInventoryDTO> getAvatarCategorySearchInventory(CategoryInventorySearchDTO categoryInventorySearchDTO){
        return avatarDAO.getAvatarCategorySearchInventory(categoryInventorySearchDTO);
    }

    // 아바타 아이템 착용
    @Override
    public boolean setActiveAvatarItem(InventoryItemDTO inventoryItemDTO){
        return avatarDAO.setActiveAvatarItem(inventoryItemDTO);
    }

    // 아바타 아이템 착용 해제
    @Override
    public boolean setInactiveAvatarItem(InventoryItemDTO inventoryItemDTO){
        return avatarDAO.setInactiveAvatarItem(inventoryItemDTO);
    }
}
