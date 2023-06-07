package com.project.quantumtec.Service.board;

import com.project.quantumtec.DAO.board.BoardDAO;
import com.project.quantumtec.DAO.user.UserDAO;
import com.project.quantumtec.DTO.board.BoardRequestDTO;
import com.project.quantumtec.DTO.board.BoardResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("BoardServiceImpl")
public class BoardServiceImpl implements BoardService{

    @Autowired
    private BoardDAO boardDAO;

    @Override
    public List<BoardResponseDTO> getPostSearchList(BoardRequestDTO board) {
        int itemNum = 10; // 한 페이지 당 게시글 수
        board.setStartIndex((board.getPageNum()-1)*itemNum); // 페이지에 따른 시작 게시글 인덱스 계산
        board.setEndIndex(itemNum); // 한 페이지 당 게시글 수
        return boardDAO.getPostSearchList(board);
    }
}
