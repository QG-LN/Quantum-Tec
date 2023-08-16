package com.project.quantumtec.Service.board;

import com.project.quantumtec.DTO.Request.board.*;
import com.project.quantumtec.DTO.Response.board.CommentListResponseDTO;
import com.project.quantumtec.DTO.Response.board.ListResponseDTO;
import com.project.quantumtec.DTO.Response.board.ViewResponseDTO;


import java.util.List;

public interface BoardService {
    // 게시물 리스트 불러오기 (검색 포함)
    public List<ListResponseDTO> getPostSearchList(ListDTO request);

    public int getPostListCount(ListDTO request);

    // 게시물 조회
    public ViewResponseDTO getPost(ViewDTO request);

    // 게시물 조회수 증가
    public boolean viewCountUp(ViewDTO request);

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

    // 다음 게시글 존재 여부 파악 후 있으면 가져오고 없으면 null 반환
    public int getNextPost(NavigateViewDTO request); // 다음 게시글

    // 이전 게시글 존재 여부 파악 후 있으면 가져오고 없으면 null 반환
    public int getPrevPost(NavigateViewDTO request); // 이전 게시글

    // 댓글 리스트
    public List<CommentListResponseDTO> getCommentList(com.project.quantumtec.DTO.Request.board.CommentListDTO request);

    // 해당 게시글의 총 댓글 수
    public int getCommentCount(CommentCountDTO request);

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
