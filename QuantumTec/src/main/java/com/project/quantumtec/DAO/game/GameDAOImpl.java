package com.project.quantumtec.DAO.game;

import com.project.quantumtec.DTO.game.GameDTO;
import com.project.quantumtec.DTO.game.GameSearchRequestDTO;
import com.project.quantumtec.DTO.game.GameSearchResponseDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GameDAOImpl implements GameDAO{

    @Autowired
    private SqlSession sqlSession;
    @Override
    public List<GameSearchResponseDTO> getGameSearchList(GameSearchRequestDTO game){
        try{
            return sqlSession.selectList("GameService.getGameSearchList", game);
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
