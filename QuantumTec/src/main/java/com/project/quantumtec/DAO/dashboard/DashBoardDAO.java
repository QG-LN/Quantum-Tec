package com.project.quantumtec.DAO.dashboard;

import com.project.quantumtec.DTO.Request.dashboard.UserDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserSearchDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserListDTO;

import java.util.List;

public interface DashBoardDAO {
    // 사용자 상세정보 요청시 프로필 영역 데이터를 가져오는 메소드
    UserInfoDTO getUserInfo(UserDTO user);

    // 사용자 목록 요청시 사용자 리스트 데이터를 가져오는 메소드
    List<UserListDTO> getUserList(UserSearchDTO user);
}
