package com.project.quantumtec.DAO.dashboard;

import com.project.quantumtec.DTO.Request.dashboard.UserIdDTO;
import com.project.quantumtec.DTO.Request.dashboard.UserSearchDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserListDTO;
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
    public UserInfoDTO getUserInfo(UserIdDTO user) {
        try {
            return sqlSession.selectOne("DashBoardDAO.getUserInfo", user);
        }catch (Exception e){
            return null;
        }
    }

    // 사용자 목록 페이지에 담길 사용자 리스트를 받아오는 메소드
    @Override
    public List<UserListVO> getUserList(UserSearchDTO user) {
        try {
            return sqlSession.selectList("DashBoardDAO.getUserList", user);
        }catch (Exception e){
            return null;
        }
    }
}
