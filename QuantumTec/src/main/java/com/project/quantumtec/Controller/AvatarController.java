package com.project.quantumtec.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.quantumtec.DTO.Request.avatar.CategoryInventoryDTO;
import com.project.quantumtec.DTO.Request.avatar.InventorySearchDTO;
import com.project.quantumtec.DTO.Response.avatar.AvatarInventoryDTO;
import com.project.quantumtec.Service.avatar.AvatarService;

/**
 * PackageName : com.project.quantumtec.Controller
 * FileName : AvatarController
 * Author : MayoneJY
 * Date : 2023-08-16
 * Description : 아바타 관련 컨트롤러
 */
@RestController
@RequestMapping("/avatar")
public class AvatarController {
    
    @Autowired
    private AvatarService avatarService;

    // 아바타 모든 인벤토리 정보 조회
    @PostMapping("/inventory")
    public List<AvatarInventoryDTO> getAvatarInventory(@RequestBody Map<String, String> userId){
        return avatarService.getAvatarInventory(userId.get("userId"));
    }

    // 아바타 카테고리 정보 조회
    @RequestMapping("/category")
    public String[] getAvatarCategory(){
        return avatarService.getAvatarCategory();
    }

    // 아바타 카테고리 별 인벤토리 정보 조회
    @PostMapping("/category/inventory")
    public List<AvatarInventoryDTO> getAvatarCategoryInventory(@RequestBody CategoryInventoryDTO categoryInventoryDTO){
        return avatarService.getAvatarCategoryInventory(categoryInventoryDTO);
    }

    // 아바타 searchValue로 인벤토리 정보 조회
    @PostMapping("/inventory/search")
    public List<AvatarInventoryDTO> getAvatarSearchInventory(@RequestBody InventorySearchDTO inventorySearchDTO){
        return avatarService.getAvatarSearchInventory(inventorySearchDTO);
    }
}
