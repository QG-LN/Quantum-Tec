package com.project.quantumtec.dao.game;

import com.project.quantumtec.Model.dto.Request.dashboard.game.GameIdDTO;
import com.project.quantumtec.Model.dto.game.*;
import com.project.quantumtec.Model.vo.game.GameCommentVO;

import java.util.List;

public interface GameDAO {
    // 게임 검색 리스트 가져오기
    public List<GameSearchResponseDTO> getGameSearchList(GameSearchRequestDTO game);

    // 게임 정보 가져오기
    public GameDetailsInfoDTO getGameInfo(GameSearchDTO gameSearchDTO);

    public List<GameCommentVO> getPostGameComment(GameCommentListDTO request);

    public List<GameCategoryInfoDTO> getGameCategoryInfo(GameCategoryRequestDTO request);

    // 게임 카테고리 리스트 가져오기
    public List<GameCategoryDTO> getGameCategoryNameList();

    // 게임을 삭제하는 메소드
    boolean deleteGame(GameIdDTO gameIdDTO);
}
