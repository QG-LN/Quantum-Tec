package com.project.quantumtec.dao.avatar;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.project.quantumtec.Model.dto.Request.avatar.BuyItemDTO;
import com.project.quantumtec.Model.dto.Request.avatar.CategoryInventoryDTO;
import com.project.quantumtec.Model.dto.Request.avatar.CategoryInventorySearchDTO;
import com.project.quantumtec.Model.dto.Request.avatar.InventoryItemDTO;
import com.project.quantumtec.Model.dto.Request.avatar.InventorySearchDTO;
import com.project.quantumtec.Model.dto.Response.avatar.AvatarInventoryDTO;
import com.project.quantumtec.Model.dto.Response.avatar.ItemInfoDTO;

/**
 * PackageName : com.project.quantumtec.DAO.avatar
 * FileName : avatarDAOImpl
 * Author : MayoneJY
 * Date : 2023-08-16
 * Description : 아바타 관련 DAOImpl
 */

@Repository
public class AvatarDAOImpl implements AvatarDAO{
    @Autowired
    private SqlSession sqlSession;

    // 아바타 모든 인벤토리 정보 조회
    @Override
    public List<AvatarInventoryDTO> getAvatarInventory(String userId) {
        return sqlSession.selectList("AvatarService.getAvatarInventory", userId);
    }

    // 아바타 카테고리 정보 조회
    @Override
    public String[] getAvatarCategory() {
        List<String> result = sqlSession.selectList("AvatarService.getAvatarCategory");
        String[] array = result.toArray(new String[0]);
        return array;
    }

    // 아바타 카테고리 별 인벤토리 정보 조회
    @Override
    public List<AvatarInventoryDTO> getAvatarCategoryInventory(CategoryInventoryDTO categoryInventoryDTO) {
        return sqlSession.selectList("AvatarService.getAvatarCategoryInventory", categoryInventoryDTO);
    }

    // 아바타 searchValue로 인벤토리 정보 조회
    @Override
    public List<AvatarInventoryDTO> getAvatarSearchInventory(InventorySearchDTO inventorySearchDTO) {
        return sqlSession.selectList("AvatarService.getAvatarSearchInventory", inventorySearchDTO);
    }

    // 착용중인 아바타 아이템 정보 조회
    @Override
    public List<AvatarInventoryDTO> getAvatarActiveInventory(String userId) {
        return sqlSession.selectList("AvatarService.getAvatarActiveInventory", userId);
    }

    // 아바타 카테고리를 searchValue로 인벤토리 정보 조회
    @Override
    public List<AvatarInventoryDTO> getAvatarCategorySearchInventory(CategoryInventorySearchDTO categoryInventorySearchDTO) {
        return sqlSession.selectList("AvatarService.getAvatarCategorySearchInventory", categoryInventorySearchDTO);
    }

    // 아바타 아이템 착용
    @Override
    public boolean setActiveAvatarItem(InventoryItemDTO inventoryItemDTO) {
        return sqlSession.update("AvatarService.setActiveAvatarItem", inventoryItemDTO) > 0;
    }

    // 아바타 아이템 착용 해제
    @Override
    public boolean setInactiveAvatarItem(InventoryItemDTO inventoryItemDTO) {
        return sqlSession.update("AvatarService.setInactiveAvatarItem", inventoryItemDTO) > 0;
    }

    // 상점

    // 아바타 모든 아이템 10개씩 정보 조회
    @Override
    public List<ItemInfoDTO> getAvatarShopMain(String userId) {
        // userId가 있을 경우, 해당 유저가 가지고 있는 아이템은 제외하고 조회
        List<ItemInfoDTO> allItems = new ArrayList<>();

        // 카테고리 리스트를 조회합니다.
        List<String> categories = sqlSession.selectList("AvatarService.getAvatarCategory");

        for (String category : categories) {
            Map<String, Object> params = new HashMap<>();
            params.put("userId", userId);
            params.put("category", category);

            // 각 카테고리별로 아이템을 조회합니다.
            List<ItemInfoDTO> itemsForCategory = sqlSession.selectList("AvatarService.getItemsByCategory", params);

            allItems.addAll(itemsForCategory);
        }

        return allItems;
    }

    // 아바타 카테고리별 아이템 모든 정보 조회
    @Override
    public List<ItemInfoDTO> getAvatarShopCategoryItem(CategoryInventoryDTO categoryInventoryDTO) {
        return sqlSession.selectList("AvatarService.getAvatarShopCategoryItem", categoryInventoryDTO);
    }

    // 아바타 카테고리를 searchValue로 인벤토리 정보 조회
    @Override
    public List<ItemInfoDTO> getAvatarShopCategorySearchItem(CategoryInventorySearchDTO categoryInventorySearchDTO) {
        return sqlSession.selectList("AvatarService.getAvatarShopCategorySearchItem", categoryInventorySearchDTO);
    }

    // 아바타 searchValue로 인벤토리 정보 조회
    @Override
    public List<ItemInfoDTO> getAvatarShopSearchItem(InventorySearchDTO inventorySearchDTO){
        return sqlSession.selectList("AvatarService.getAvatarShopSearchItem", inventorySearchDTO);
    }
    
    // 아바타 아이템 구매
    @Override
    public boolean setBuyAvatarItem(BuyItemDTO buyItemDTO){
        // userIndex 조회
        int userIndex = sqlSession.selectOne("AvatarService.getUserIndex", buyItemDTO.getUserId());
        buyItemDTO.setUserIndex(userIndex);
        
        // 캐시 조회
        int cash = sqlSession.selectOne("AvatarService.getUserCash", buyItemDTO.getUserIndex());

        if (cash < buyItemDTO.getPaymentAmount()) {
            return false;
        }
        else{
            // 캐시 차감
            if (sqlSession.update("AvatarService.setUserCash", buyItemDTO) <= 0) {
                return false;
            }
            boolean checkInsert = sqlSession.insert("AvatarService.setBuyAvatarItem", buyItemDTO) > 0;
            if (checkInsert == false) {
                sqlSession.update("AvatarService.setUserCashRollback", buyItemDTO);
                return false;
            }
            return checkInsert;
        }

    }

    // 구매한 아바타인지 확인
    @Override
    public boolean checkBuyAvatarItem(BuyItemDTO buyItemDTO){
        return (int)sqlSession.selectOne("AvatarService.checkBuyAvatarItem", buyItemDTO) > 0;
    }
}
