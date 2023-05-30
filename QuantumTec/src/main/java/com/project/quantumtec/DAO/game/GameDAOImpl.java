package com.project.quantumtec.DAO.game;

import com.project.quantumtec.DTO.game.GameDTO;
import com.project.quantumtec.DTO.game.GameSearchRequestDTO;
import com.project.quantumtec.DTO.game.GameSearchResponseDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class GameDAOImpl implements GameDAO{

    @Autowired
    private SqlSession sqlSession;
    @Override
    public GameSearchResponseDTO[] getGameSearchList(GameSearchRequestDTO game) {
        try{
            List<Map<String, Object>> dtos = sqlSession.selectList("GameService.getGameSearchList", game);
            return dtos.toArray(new GameSearchResponseDTO[dtos.size()]);
        } catch (Exception e) {
            return null;
        }

    }

    @Override
    public GameDTO getGameInfo(int gameID) {
        try {
            return sqlSession.selectOne("GameService.getGameInfo", gameID);
        } catch (Exception e) {
            return null;
        }

    }
}
