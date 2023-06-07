package com.project.quantumtec.Service.game;

import com.project.quantumtec.DAO.game.GameDAO;
import com.project.quantumtec.DTO.game.GameDTO;
import com.project.quantumtec.DTO.game.GameSearchRequestDTO;
import com.project.quantumtec.DTO.game.GameSearchResponseDTO;
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
        int itemNum = 16; // 한페이지 아이템 갯수
        game.setStartIndex((game.getPageNum() - 1) * itemNum); // DB에서 시작하는 인덱스 값을 받기로 함 (시작번호)
        game.setEndIndex(itemNum); // DB에서 한페이지 아이템 갯수를 받기로 함 (표시할 아이템 갯수)
        return gameDAO.getGameSearchList(game);
    }

    @Override
    public GameDTO getGameInfo(int gameID) {
        return gameDAO.getGameInfo(gameID);
    }
}
