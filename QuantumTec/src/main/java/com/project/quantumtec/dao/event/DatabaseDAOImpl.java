package com.project.quantumtec.dao.event;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import com.project.quantumtec.Model.db.DatabaseColumnNameModel;
@Repository
public class DatabaseDAOImpl implements DatabaseDAO{
    
    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<DatabaseColumnNameModel> getColumnName() throws Exception {
        return sqlSession.selectList("EventService.getColumnName");
    }
}
