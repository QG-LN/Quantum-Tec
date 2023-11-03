package com.project.quantumtec.Service.dashboard;

import com.project.quantumtec.DTO.Request.dashboard.UserDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserSearchDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserListDTO;

import java.util.List;

public interface DashBoardService {

    // 사용자 상세 정보를 불러오는 메서드 (사용자 프로필만)
    public UserInfoDTO getUserInfo(UserDTO user);

    // 사용자 목록에 표시할 정보들을 불러오는 메서드 (사용자 리스트 & 추가 정보)
    List<UserListDTO> getUserList(UserSearchDTO user);
}
