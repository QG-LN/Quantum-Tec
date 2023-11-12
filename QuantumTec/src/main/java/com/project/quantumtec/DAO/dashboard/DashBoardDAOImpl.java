package com.project.quantumtec.DAO.dashboard;

import com.project.quantumtec.DTO.Request.dashboard.UserBanDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserIdDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserIndexDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserInfoUpdateDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserItemSearchDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserActivityLogDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserItemDTO;
import com.project.quantumtec.VO.dashboard.UserListVO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DashBoardDAOImpl implements DashBoardDAO{

    @Autowired
    private SqlSession sqlSession;

    // 사용자 상세정보 페이지에 담길 프로필 정보를 받아오는 메소드
    @Override
    public UserInfoDTO getUserInfo(UserIndexDTO user) {
        try {
            return sqlSession.selectOne("DashBoardService.getUserInfo", user);
        }catch (Exception e){
            return null;
        }
    }

    // 사용자 프로필 정보를 수정하고 결과값을 boolean 자료형으로 반환하는 메소드
    @Override
    public boolean updateUserInfo(UserInfoUpdateDTO user) {
        try {
            return sqlSession.update("DashBoardService.updateUserInfo", user) == 1;
        }catch (Exception e){
            return false;
        }
    }

    // 사용자 상태 조회 후 그에 반대 되는 상태로 변경 후 결과를 String 으로 반환 (성공시 변경된 상태, 실패시 "fail")
    @Override
    public boolean convertUserStatus(UserBanDTO userBanDTO) {
        try {
            if(userBanDTO.getBanReason() == null || userBanDTO.getBanReason().equals("")){
                // 밴 취소
                sqlSession.delete("DashBoardService.cancelUserBan", userBanDTO);
                return true;
            }
            else{
                return sqlSession.insert("DashBoardService.insertUserBan", userBanDTO) == 1;
            }
            
        }catch (Exception e){
            return false;
        }
    }

    // 사용자 보유 항목(전체)을 반환하는 메소드
    @Override
    public List<UserItemDTO> getUserItemList(UserItemSearchDTO userItemSearchDTO) {
        return sqlSession.selectList("DashBoardService.getUserItemList", userItemSearchDTO);
    }

    //사용자 활동 로그를 항목별 한가지씩만 불러오기
    @Override
    public List<UserActivityLogDTO> getUserActivityLog(UserIndexDTO user) {
        return sqlSession.selectList("DashBoardService.getUserActivityLog", user);
    }

    // 사용자 활동 로그를 전부 불러오기
    @Override
    public List<UserActivityLogDTO> getUserActivityLogDetail(UserIdDTO userIdDTO) {
        return sqlSession.selectList("DashBoardService.getUserActivityLogDetail", userIdDTO);
    }

    // 사용자 목록 페이지에 담길 사용자 리스트를 받아오는 메소드
    @Override
    public List<UserListVO> getUserList() {
        try {
            return sqlSession.selectList("DashBoardService.getUserList");
        }catch (Exception e){
            return null;
        }
    }
}
