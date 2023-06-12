package com.project.quantumtec.DAO.game;

import com.project.quantumtec.DTO.game.*;

import java.util.List;

public interface GameDAO {
    // 게임 검색 리스트 가져오기
    public List<GameSearchResponseDTO> getGameSearchList(GameSearchRequestDTO game);

    // 게임 정보 가져오기
    public GameDetailsInfoDTO getGameInfo(GameSearchDTO gameSearchDTO);

    public List<GameCommentDTO> getPostGameComment(GameCommentListDTO request);

    public List<GameCategoryListInfoDTO> getGameCategoryInfo(GameCategoryListRequestDTO request);
}
