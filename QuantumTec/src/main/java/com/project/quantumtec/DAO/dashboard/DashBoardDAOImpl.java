package com.project.quantumtec.DAO.dashboard;

import com.project.quantumtec.DTO.Request.dashboard.UserDTO;
import com.project.quantumtec.DTO.Response.dashboard.UserInfoDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DashBoardDAOImpl implements DashBoardDAO{

    @Autowired
    private SqlSession sqlSession;

    // 사용자 상세정보 페이지에 담길 프로필 정보를 받아오는 메소드
    @Override
    public UserInfoDTO getUserInfo(UserDTO user) {
        try {
            return sqlSession.selectOne("DashBoardDAO.getUserInfo", user);
        }catch (Exception e){
            return null;
        }
    }
}
