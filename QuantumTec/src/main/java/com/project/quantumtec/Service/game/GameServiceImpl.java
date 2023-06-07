package com.project.quantumtec.Service.game;

import com.project.quantumtec.DAO.game.GameDAO;
import com.project.quantumtec.DTO.game.GameDTO;
import com.project.quantumtec.DTO.game.GameSearchRequestDTO;
import com.project.quantumtec.DTO.game.GameSearchResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("GameServiceImpl")
public class GameServiceImpl implements GameService{

    @Autowired
    private GameDAO gameDAO;
    @Override
    public GameSearchResponseDTO[] getGameSearchList(GameSearchRequestDTO game) {
        return gameDAO.getGameSearchList(game);
    }

    @Override
    public GameDTO getGameInfo(int gameID) {
        return gameDAO.getGameInfo(gameID);
    }
}