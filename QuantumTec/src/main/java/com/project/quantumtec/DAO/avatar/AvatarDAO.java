package com.project.quantumtec.DAO.avatar;

import java.util.List;

import com.project.quantumtec.DTO.Request.avatar.AvatarInventoryDTO;

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
}
