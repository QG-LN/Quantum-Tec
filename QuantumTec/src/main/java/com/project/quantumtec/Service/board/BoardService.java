package com.project.quantumtec.Service.board;

import com.project.quantumtec.DTO.Request.board.*;
import com.project.quantumtec.DTO.Response.board.CommentListDTO;
import com.project.quantumtec.DTO.Response.board.ListDTO;
import com.project.quantumtec.DTO.Response.board.ViewDTO;


import java.util.List;

public interface BoardService {
    // 게시물 리스트 불러오기 (검색 포함)
    public List<ListDTO> getPostSearchList(com.project.quantumtec.DTO.Request.board.ListDTO request);

    // 게시물 조회
    public ViewDTO getPost(com.project.quantumtec.DTO.Request.board.ViewDTO request);

    // 게시물 작성
    public boolean writePost(WriteDTO request);

    // 게시물 수정
    public boolean modifyPost(ModifyDTO request);

    // 게시물 삭제
    public boolean deletePost(DeleteDTO request);

    // 게시물 좋아요
    public boolean upvotePost(VoteDTO request);

    // 게시물 싫어요
    public boolean downvotePost(VoteDTO request);

    // 댓글 리스트
    public List<CommentListDTO> getCommentList(com.project.quantumtec.DTO.Request.board.CommentListDTO request);

    // 댓글 작성
    public boolean writeComment(CommentWriteDTO request);

    // 댓글 수정
    public boolean modifyComment(CommentModifyDTO request);

    // 댓글 삭제
    public boolean deleteComment(CommentDeleteDTO request);

    // 댓글 추천
    public boolean upvoteComment(CommentVoteDTO request);

    // 댓글 비추천
    public boolean downvoteComment(CommentVoteDTO request);
}
