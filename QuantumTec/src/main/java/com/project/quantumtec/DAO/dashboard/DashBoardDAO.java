package com.project.quantumtec.DAO.dashboard;

import com.project.quantumtec.DTO.Request.dashboard.UserIdDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserItemSearchDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserActivityLogDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserItemDTO;
import com.project.quantumtec.VO.dashboard.UserListVO;

import java.util.List;

public interface DashBoardDAO {
    // 사용자 상세정보 요청시 프로필 영역 데이터를 가져오는 메소드
    public UserInfoDTO getUserInfo(UserIdDTO user);

    // 사용자 프로필 정보를 변경하는 메서드
    public boolean updateUserInfo(UserInfoDTO user);

    // 사용자 계정 활성화/비활성화를 변경하는 메서드
    public String convertUserStatus(UserIdDTO user);

    //사용자 보유 항목 리스트 불러오기 (모든 아이템)
    public List<UserItemDTO> getUserItemList(UserItemSearchDTO user);

    //사용자 활동 로그 항목별 일부 불러오기
    public List<UserActivityLogDTO> getUserActivityLog(UserIdDTO user);

    //사용자 활동 로그 전체 불러오기
    public List<UserActivityLogDTO> getUserActivityLogDetail(UserIdDTO user);

    // 사용자 목록 요청시 사용자 리스트 데이터를 가져오는 메소드
    public List<UserListVO> getUserList();

}
