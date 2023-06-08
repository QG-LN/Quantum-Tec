package com.project.quantumtec.Service.board;

import com.project.quantumtec.DAO.board.BoardDAO;
import com.project.quantumtec.DAO.user.UserDAO;
import com.project.quantumtec.DTO.board.BoardListRequestDTO;
import com.project.quantumtec.DTO.board.BoardListResponseDTO;
import com.project.quantumtec.DTO.board.BoardViewRequestDTO;
import com.project.quantumtec.DTO.board.BoardViewResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("BoardServiceImpl")
public class BoardServiceImpl implements BoardService{

    @Autowired
    private BoardDAO boardDAO;

    @Override
    public List<BoardListResponseDTO> getPostSearchList(BoardListRequestDTO board) {
        int itemNum = 10; // 한 페이지 당 게시글 수
        board.setStartIndex((board.getPageNum()-1)*itemNum); // 페이지에 따른 시작 게시글 인덱스 계산
        board.setEndIndex(itemNum); // 한 페이지 당 게시글 수
        return boardDAO.getPostSearchList(board);
    }

    @Override
    public BoardViewResponseDTO getPost(BoardViewRequestDTO board) {
        return boardDAO.getPost(board);
    }
}
