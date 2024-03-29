package com.project.quantumtec.service.game;

import com.project.quantumtec.Model.dto.Request.dashboard.game.GameIdDTO;
import com.project.quantumtec.Model.dto.game.*;

import java.util.List;

public interface GameService {
    // 게임 이름, 장르, 가격을 입력받아 게임 검색 리스트를 가져오는 메소드
    public List<GameSearchResponseDTO> getGameSearchList(GameSearchRequestDTO game);

    // 게임 ID를 받아서 게임 정보 가져오는 메소드
    public GameDetailsInfoDTO getGameInfo(GameSearchDTO gameSearchDTO);

    public List<GameCommentDTO> getPostGameComment(GameCommentListDTO request);

    public List<GameCategoryInfoDTO> getGameCategoryInfo(GameCategoryRequestDTO request);

    // 게임 카테고리 리스트 가져오기
    public List<GameCategoryDTO> getGameCategoryNameList();

    // 게임을 삭제하는 메소드
    boolean deleteGame(GameIdDTO gameIdDTO);
}
