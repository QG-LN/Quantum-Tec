package com.project.quantumtec.service.avatar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.quantumtec.dao.avatar.AvatarDAO;
import com.project.quantumtec.Model.dto.Request.avatar.BuyItemDTO;
import com.project.quantumtec.Model.dto.Request.avatar.CategoryInventoryDTO;
import com.project.quantumtec.Model.dto.Request.avatar.CategoryInventorySearchDTO;
import com.project.quantumtec.Model.dto.Request.avatar.InventoryItemDTO;
import com.project.quantumtec.Model.dto.Request.avatar.InventorySearchDTO;
import com.project.quantumtec.Model.dto.Response.avatar.AvatarInventoryDTO;
import com.project.quantumtec.Model.dto.Response.avatar.ItemInfoDTO;

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

    // 상점

    // 아바타 모든 아이템 10개씩 정보 조회
    @Override
    public List<ItemInfoDTO> getAvatarShopMain(String userId){
        // userId가 있을 경우, 해당 유저가 가지고 있는 아이템은 제외하고 조회
        return avatarDAO.getAvatarShopMain(userId);
    }

    // 아바타 카테고리별 아이템 모든 정보 조회
    @Override
    public List<ItemInfoDTO> getAvatarShopCategoryItem(CategoryInventoryDTO categoryInventoryDTO){
        return avatarDAO.getAvatarShopCategoryItem(categoryInventoryDTO);
    }

    // 아바타 카테고리를 searchValue로 인벤토리 정보 조회
    @Override
    public List<ItemInfoDTO> getAvatarShopCategorySearchItem(CategoryInventorySearchDTO categoryInventorySearchDTO){
        return avatarDAO.getAvatarShopCategorySearchItem(categoryInventorySearchDTO);
    }
    
    // 아바타 searchValue로 인벤토리 정보 조회
    @Override
    public List<ItemInfoDTO> getAvatarShopSearchItem(InventorySearchDTO inventorySearchDTO){
        return avatarDAO.getAvatarShopSearchItem(inventorySearchDTO);
    }

    // 아바타 아이템 구매
    @Override
    public boolean setBuyAvatarItem(BuyItemDTO buyItemDTO){
        return avatarDAO.setBuyAvatarItem(buyItemDTO);
    }

    // 구매한 아바타인지 확인
    public boolean checkBuyAvatarItem(BuyItemDTO buyItemDTO){
        return avatarDAO.checkBuyAvatarItem(buyItemDTO);
    }
    
}
