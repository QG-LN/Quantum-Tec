package com.project.quantumtec.dao.game;

import com.project.quantumtec.Model.dto.game.*;
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
            // 만약 카테고리가 빈값으로 넘어왔을 경우 null로 변환
            if(game.getGameCategoryName().equals("")){
                game.setGameCategoryName(null);
            }
            return sqlSession.selectList("GameService.getGameSearchList", game);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public GameDetailsInfoDTO getGameInfo(GameSearchDTO gameSearchDTO) {
        try {
            return sqlSession.selectOne("GameService.getGameInfo", gameSearchDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public List<GameCommentDTO> getPostGameComment(GameCommentListDTO request) {
        try{
            return sqlSession.selectList("GameService.getGameCommentList", request);
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<GameCategoryInfoDTO> getGameCategoryInfo(GameCategoryRequestDTO request) {
        try{
            return sqlSession.selectList("GameService.getGameCategoryList", request);
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<GameCategoryDTO> getGameCategoryNameList() {
        return sqlSession.selectList("GameService.getGameCategoryNameList");
    }
}
