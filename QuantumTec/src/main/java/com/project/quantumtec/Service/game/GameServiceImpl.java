package com.project.quantumtec.Service.game;

import com.project.quantumtec.DAO.game.GameDAO;
import com.project.quantumtec.DTO.game.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("GameServiceImpl")
public class GameServiceImpl implements GameService{

    @Autowired
    private GameDAO gameDAO;
    @Override
    public List<GameSearchResponseDTO> getGameSearchList(GameSearchRequestDTO game){
        // 페이지 처리
        int itemNum = 8; // 한페이지 아이템 갯수
        game.setStartIndex((game.getPageNum() - 1) * itemNum); // DB에서 시작하는 인덱스 값을 받기로 함 (시작번호)
        game.setEndIndex(itemNum); // DB에서 한페이지 아이템 갯수를 받기로 함 (표시할 아이템 갯수)
        return gameDAO.getGameSearchList(game);
    }

    @Override
    public GameDetailsInfoDTO getGameInfo(GameSearchDTO gameSearchDTO) {

        return gameDAO.getGameInfo(gameSearchDTO);
    }

    @Override
    public List<GameCommentDTO> getPostGameComment(GameCommentListDTO request) {
        int itemNum = 10; // 한 페이지(로딩 단위) 당 표시할 댓글 수
        request.setStartIndex((request.getPageNum()-1)*itemNum); // 페이지 (로딩 단위)에 따른 시작 댓글 인덱스 계산
        request.setEndIndex(itemNum); // 한 페이지(로딩 단위) 당 댓글 수
        return gameDAO.getPostGameComment(request);
    }

    @Override
    public List<GameCategoryListInfoDTO> getGameCategoryInfo(GameCategoryListRequestDTO request) {
        return gameDAO.getGameCategoryInfo(request);
    }

}
