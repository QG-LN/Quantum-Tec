package com.project.quantumtec.Service.dashboard;

import com.project.quantumtec.DTO.Request.dashboard.UserBanDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserIdDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserIndexDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserInfoUpdateDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserItemSearchDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserActivityLogDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserItemDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserListDTO;

import java.util.List;

public interface DashBoardService {

    // 사용자 상세 정보를 불러오는 메서드 (사용자 프로필만)
    public UserInfoDTO getUserInfo(UserIndexDTO user);

    // 사용자 프로필 정보를 변경하는 메서드
    boolean updateUserInfo(UserInfoUpdateDTO user);

    // 사용자 계정 활성화/비활성화를 변경하고 결과를 문자열로 반환하는 메서드
    boolean convertUserStatus(UserBanDTO userBanDTO);

    //사용자 보유 항목 리스트 불러오기 (모든 아이템)
    List<UserItemDTO> getUserItemList(UserItemSearchDTO user);

    //사용자 활동 로그 항목별 일부 불러오기
    List<UserActivityLogDTO> getUserActivityLog(UserIndexDTO user);

    //사용자 활동 로그 전체 불러오기
    List<UserActivityLogDTO> getUserActivityLogDetail(UserIdDTO user);

    // 사용자 목록에 표시할 정보들을 불러오는 메서드 (사용자 리스트 & 추가 정보)
    List<UserListDTO> getUserList();
}
