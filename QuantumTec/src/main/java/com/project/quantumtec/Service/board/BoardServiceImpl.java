package com.project.quantumtec.Service.board;

import com.project.quantumtec.DAO.board.BoardDAO;
import com.project.quantumtec.DAO.user.UserDAO;
import com.project.quantumtec.DTO.board.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("BoardServiceImpl")
public class BoardServiceImpl implements BoardService{

    @Autowired
    private BoardDAO boardDAO;

    @Override
    public List<BoardListResponseDTO> getPostSearchList(BoardListRequestDTO request) {
        int itemNum = 10; // 한 페이지 당 게시글 수
        request.setStartIndex((request.getPageNum()-1)*itemNum); // 페이지에 따른 시작 게시글 인덱스 계산
        request.setEndIndex(itemNum); // 한 페이지 당 게시글 수
        return boardDAO.getPostSearchList(request);
    }

    @Override
    public BoardViewResponseDTO getPost(BoardViewRequestDTO request) {
        return boardDAO.getPost(request);
    }

    @Override
    public boolean writePost(BoardWriteRequestDTO request) {
        return boardDAO.writePost(request);
    }

    @Override
    public boolean modifyPost(BoardModifyRequestDTO request) {
        return boardDAO.modifyPost(request);
    }

    @Override
    public boolean deletePost(BoardDeleteRequestDTO request) {
        return boardDAO.deletePost(request);
    }

    @Override
    public boolean upvotePost(BoardUpvoteRequestDTO request) {
        return boardDAO.upvotePost(request);
    }

    @Override
    public boolean downvotePost(BoardDownvoteRequestDTO request) {
        return boardDAO.downvotePost(request);
    }

    @Override
    public List<BoardCommentListResponseDTO> getCommentList(BoardCommentListRequestDTO request) {
        int itemNum = 15; // 한 페이지(로딩 단위) 당 표시할 댓글 수
        request.setStartIndex((request.getPageNum()-1)*itemNum); // 페이지 (로딩 단위)에 따른 시작 댓글 인덱스 계산
        request.setEndIndex(itemNum); // 한 페이지(로딩 단위) 당 댓글 수
        return boardDAO.getCommentList(request);
    }

}
