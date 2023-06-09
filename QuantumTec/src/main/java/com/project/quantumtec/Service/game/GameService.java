package com.project.quantumtec.Service.game;

import com.project.quantumtec.DTO.game.*;

import java.util.List;

public interface GameService {
    // 게임 이름, 장르, 가격을 입력받아 게임 검색 리스트를 가져오는 메소드
    public List<GameSearchResponseDTO> getGameSearchList(GameSearchRequestDTO game);

    // 게임 ID를 받아서 게임 정보 가져오는 메소드
    public GameDetailsInfoDTO getGameInfo(GameSearchDTO gameSearchDTO);

    public List<GameCommentDTO> getPostGameComment(GameCommentListDTO request);

    public List<GameCategoryListInfoDTO> getGameCategoryInfo(GameCategoryListRequestDTO request);

}
