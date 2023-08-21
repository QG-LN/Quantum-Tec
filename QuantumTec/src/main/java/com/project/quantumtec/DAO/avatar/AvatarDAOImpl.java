package com.project.quantumtec.DAO.avatar;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.project.quantumtec.DTO.Request.avatar.CategoryInventoryDTO;
import com.project.quantumtec.DTO.Request.avatar.CategoryInventorySearchDTO;
import com.project.quantumtec.DTO.Request.avatar.InventoryItemDTO;
import com.project.quantumtec.DTO.Request.avatar.InventorySearchDTO;
import com.project.quantumtec.DTO.Response.avatar.AvatarInventoryDTO;

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
}
