package com.project.quantumtec.DAO.event;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.project.quantumtec.Model.exp.ExpToLevelModel;

@Repository
public class ExpDAOImpl implements ExpDAO {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<ExpToLevelModel> getExpToLevel(){
        return sqlSession.selectList("EventService.getExpToLevel");
    }
}
