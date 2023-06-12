package com.project.quantumtec.Service.board;

import com.project.quantumtec.DAO.board.BoardDAO;
import com.project.quantumtec.DTO.Request.board.*;
import com.project.quantumtec.DTO.Response.board.CommentListResponseDTO;
import com.project.quantumtec.DTO.Response.board.ListResponseDTO;
import com.project.quantumtec.DTO.Response.board.ViewResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("BoardServiceImpl")
public class BoardServiceImpl implements BoardService{

    @Autowired
    private BoardDAO boardDAO;

    @Override
    public List<ListResponseDTO> getPostSearchList(ListDTO request) {
        int itemNum = 10; // 한 페이지 당 게시글 수
        request.setStartIndex((request.getPageNum()-1)*itemNum); // 페이지에 따른 시작 게시글 인덱스 계산
        request.setEndIndex(itemNum); // 한 페이지 당 게시글 수
        return boardDAO.getPostSearchList(request);
    }

    @Override
    public ViewResponseDTO getPost(ViewDTO request) {
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

    // 다음 게시글 인덱스를 가져오고, 존재할 경우 해당 게시글 조회
    @Override
    public int getNextPost(NavigateViewDTO request) {
        int nextPostIndex = boardDAO.getNextPost(request); // 다음 게시글 인덱스 가져오기
        if (nextPostIndex > 0){ // 다음 게시글 존재하면
            return nextPostIndex;
        }
        else {
            return 0;
        }
    }

    // 이전 게시글 인덱스를 가져오고, 존재할 경우 해당 게시글 조회
    @Override
    public int getPrevPost(NavigateViewDTO request) {
        int prevPostIndex = boardDAO.getPrevPost(request); // 이전 게시글 인덱스 가져오기
        if (prevPostIndex > 0){ // 이전 게시글 존재하면
            return prevPostIndex;
        }
        else {
            return 0;
        }
    }

    @Override
    public List<CommentListResponseDTO> getCommentList(com.project.quantumtec.DTO.Request.board.CommentListDTO request) {
        int itemNum = 10; // 한 페이지(로딩 단위) 당 표시할 댓글 수
        request.setStartIndex((request.getPageNum()-1)*itemNum); // 페이지 (로딩 단위)에 따른 시작 댓글 인덱스 계산
        request.setEndIndex(itemNum); // 한 페이지(로딩 단위) 당 댓글 수
        return boardDAO.getCommentList(request);
    }

    @Override
    public boolean writeComment(CommentWriteDTO request) {
        return boardDAO.writeComment(request);
    }

    @Override
    public boolean modifyComment(CommentModifyDTO request) {
        return boardDAO.modifyComment(request);
    }

    @Override
    public boolean deleteComment(CommentDeleteDTO request) { return boardDAO.deleteComment(request); }

    @Override
    public boolean upvoteComment(CommentVoteDTO request) {
        return boardDAO.upvoteComment(request);
    }

    @Override
    public boolean downvoteComment(CommentVoteDTO request) {
        return boardDAO.downvoteComment(request);
    }

}
