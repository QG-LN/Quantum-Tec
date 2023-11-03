package com.project.quantumtec.DAO.dashboard;

import com.project.quantumtec.DTO.Request.dashboard.UserDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;

public interface DashBoardDAO {
    // 사용자 상세정보 요청시 프로필 영역 데이터를 가져오는 메소드
    UserInfoDTO getUserInfo(UserDTO user);
}
