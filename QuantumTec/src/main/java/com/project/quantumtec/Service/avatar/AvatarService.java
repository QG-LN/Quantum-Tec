package com.project.quantumtec.Service.avatar;

import java.util.List;

import com.project.quantumtec.DTO.Response.avatar.AvatarInventoryDTO;

public interface AvatarService {
    
    // 아바타 모든 인벤토리 정보 조회
    public List<AvatarInventoryDTO> getAvatarInventory(String userId);
}
