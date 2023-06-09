package com.project.quantumtec.DAO.game;

import com.project.quantumtec.DTO.game.GameDTO;
import com.project.quantumtec.DTO.game.GameSearchDTO;
import com.project.quantumtec.DTO.game.GameSearchRequestDTO;
import com.project.quantumtec.DTO.game.GameSearchResponseDTO;

import java.util.List;

public interface GameDAO {
    // 게임 검색 리스트 가져오기
    public List<GameSearchResponseDTO> getGameSearchList(GameSearchRequestDTO game);

    // 게임 정보 가져오기
    public GameDTO getGameInfo(GameSearchDTO gameSearchDTO);
}
