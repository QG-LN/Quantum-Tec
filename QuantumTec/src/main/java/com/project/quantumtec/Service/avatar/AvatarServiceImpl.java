package com.project.quantumtec.Service.avatar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.quantumtec.DAO.avatar.AvatarDAO;
import com.project.quantumtec.DTO.Request.avatar.CategoryInventoryDTO;
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
}
