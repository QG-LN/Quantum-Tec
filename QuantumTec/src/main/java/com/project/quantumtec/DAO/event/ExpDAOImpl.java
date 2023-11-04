package com.project.quantumtec.DAO.event;

import com.project.quantumtec.Model.ExpToLevelModel;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ExpDAOImpl implements ExpDAO {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<ExpToLevelModel> getExpToLevel(){
        return sqlSession.selectList("ExpDAO.getExpToLevel");
    }
}
