package com.project.quantumtec.Service.board;

import com.project.quantumtec.DAO.board.BoardDAO;
import com.project.quantumtec.DTO.Request.board.*;
import com.project.quantumtec.DTO.Response.board.CommentListDTO;
import com.project.quantumtec.DTO.Response.board.ListDTO;
import com.project.quantumtec.DTO.Response.board.ViewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("BoardServiceImpl")
public class BoardServiceImpl implements BoardService{

    @Autowired
    private BoardDAO boardDAO;

    @Override
    public List<ListDTO> getPostSearchList(com.project.quantumtec.DTO.Request.board.ListDTO request) {
        int itemNum = 10; // 한 페이지 당 게시글 수
        request.setStartIndex((request.getPageNum()-1)*itemNum); // 페이지에 따른 시작 게시글 인덱스 계산
        request.setEndIndex(itemNum); // 한 페이지 당 게시글 수
        return boardDAO.getPostSearchList(request);
    }

    @Override
    public ViewDTO getPost(com.project.quantumtec.DTO.Request.board.ViewDTO request) {
        return boardDAO.getPost(request);
    }

    @Override
    public boolean writePost(WriteDTO request) {
        return boardDAO.writePost(request);
    }

    @Override
    public boolean modifyPost(ModifyDTO request) {
        return boardDAO.modifyPost(request);
    }

    @Override
    public boolean deletePost(DeleteDTO request) {
        return boardDAO.deletePost(request);
    }

    @Override
    public boolean upvotePost(VoteDTO request) {
        return boardDAO.upvotePost(request);
    }

    @Override
    public boolean downvotePost(VoteDTO request) {
        return boardDAO.downvotePost(request);
    }

    @Override
    public List<CommentListDTO> getCommentList(com.project.quantumtec.DTO.Request.board.CommentListDTO request) {
        int itemNum = 15; // 한 페이지(로딩 단위) 당 표시할 댓글 수
        request.setStartIndex((request.getPageNum()-1)*itemNum); // 페이지 (로딩 단위)에 따른 시작 댓글 인덱스 계산
        request.setEndIndex(itemNum); // 한 페이지(로딩 단위) 당 댓글 수
        return boardDAO.getCommentList(request);
    }

    @Override
    public boolean writeComment(CommentWriteDTO request) {
        return false;
    }

    @Override
    public boolean modifyComment(CommentModifyDTO request) {
        return false;
    }

    @Override
    public boolean deleteComment(CommentDeleteDTO request) {
        return false;
    }

    @Override
    public boolean upvoteComment(CommentVoteDTO request) {
        return false;
    }

    @Override
    public boolean downvoteComment(CommentVoteDTO request) {
        return false;
    }

}
