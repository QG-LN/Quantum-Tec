package com.project.quantumtec.DAO.user;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.project.quantumtec.VO.user.UserStatusVO;

@Repository
public class UserStatusDAOImpl implements UserStatusDAO{

    @Autowired
    private SqlSession sqlSession;

    @Override
    public UserStatusVO getUserStatus(int userIdx) throws Exception {
        return sqlSession.selectOne("LoginService.getUserStatus", userIdx);
    }
    
}
