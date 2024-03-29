package com.project.quantumtec.service.game;

import com.project.quantumtec.Model.dto.Request.dashboard.game.GameIdDTO;
import com.project.quantumtec.dao.game.GameDAO;
import com.project.quantumtec.Model.dto.game.*;
import com.project.quantumtec.Model.vo.game.GameCommentVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        List<GameCommentDTO> commentList = new ArrayList<>();
        List<GameCommentVO> commentVOList = gameDAO.getPostGameComment(request);
        for(int i = 0; i < commentVOList.size(); i++){
            GameCommentDTO dto = new GameCommentDTO();
            dto = dto.mapGameCommentVOToDTO(commentVOList.get(i));

            commentList.add(dto);
        }
        return commentList;
    }

    @Override
    public List<GameCategoryInfoDTO> getGameCategoryInfo(GameCategoryRequestDTO request) {
        return gameDAO.getGameCategoryInfo(request);
    }

    @Override
    public List<GameCategoryDTO> getGameCategoryNameList() {
        return gameDAO.getGameCategoryNameList();
    }

    @Override
    public boolean deleteGame(GameIdDTO gameIdDTO) {
        return gameDAO.deleteGame(gameIdDTO);
    }

}
