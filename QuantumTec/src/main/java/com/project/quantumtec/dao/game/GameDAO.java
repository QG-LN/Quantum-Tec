package com.project.quantumtec.dao.game;

import com.project.quantumtec.Model.dto.game.*;

import java.util.List;

public interface GameDAO {
    // 게임 검색 리스트 가져오기
    public List<GameSearchResponseDTO> getGameSearchList(GameSearchRequestDTO game);

    // 게임 정보 가져오기
    public GameDetailsInfoDTO getGameInfo(GameSearchDTO gameSearchDTO);

    public List<GameCommentDTO> getPostGameComment(GameCommentListDTO request);

    public List<GameCategoryInfoDTO> getGameCategoryInfo(GameCategoryRequestDTO request);

    // 게임 카테고리 리스트 가져오기
    public List<GameCategoryDTO> getGameCategoryNameList();
}
