package com.project.quantumtec.Service.dashboard;

import com.project.quantumtec.DTO.Request.dashboard.UserDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;

public interface DashBoardService {

    // 사용자 상세 정보를 불러오는 메서드 (사용자 프로필만)
    public UserInfoDTO getUserInfo(UserDTO user);
}
