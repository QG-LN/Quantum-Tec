package com.project.quantumtec.DAO.board;

import com.project.quantumtec.DTO.board.*;


import java.util.List;

public interface BoardDAO {
    // 게시물 리스트 불러오기 (검색 포함)
    public List<BoardListResponseDTO> getPostSearchList(BoardListRequestDTO request);

    // 게시물 조회
    public BoardViewResponseDTO getPost(BoardViewRequestDTO request);

    // 게시물 작성
    public boolean writePost(BoardWriteRequestDTO request);

    // 게시물 수정
    public boolean modifyPost(BoardModifyRequestDTO request);

    // 게시물 삭제
    public boolean deletePost(BoardDeleteRequestDTO request);

    // 게시물 추천
    public boolean upvotePost(BoardVoteRequestDTO request);

    // 게시물 비추천
    public boolean downvotePost(BoardVoteRequestDTO request);

    // 댓글 리스트
    public List<BoardCommentListResponseDTO> getCommentList(BoardCommentListRequestDTO request);

    // 댓글 작성
    public boolean writeComment(BoardCommentWriteRequestDTO request);

    // 댓글 수정
    public boolean modifyComment(BoardCommentModifyRequestDTO request);

    // 댓글 삭제
    public boolean deleteComment(BoardCommentDeleteRequestDTO request);

    // 댓글 추천
    public boolean upvoteComment(BoardCommentVoteRequestDTO request);

    // 댓글 비추천
    public boolean downvoteComment(BoardCommentVoteRequestDTO request);
}
