package com.project.quantumtec.DAO.avatar;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.project.quantumtec.DTO.Request.avatar.CategoryInventoryDTO;
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

    // 아바타 카테고리 별 인벤토리 정보 조회
    @Override
    public List<AvatarInventoryDTO> getAvatarCategoryInventory(CategoryInventoryDTO categoryInventoryDTO) {
        return sqlSession.selectList("AvatarService.getAvatarCategoryInventory", categoryInventoryDTO);
    }

}
