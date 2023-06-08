package com.project.quantumtec.Controller;


import com.project.quantumtec.DTO.Request.board.*;
import com.project.quantumtec.DTO.Response.board.CommentListResponseDTO;
import com.project.quantumtec.DTO.Response.board.ListResponseDTO;
import com.project.quantumtec.DTO.Response.board.ViewResponseDTO;
import com.project.quantumtec.Service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    // 게시물 리스트 조회
    @PostMapping("/list")
    public List<ListResponseDTO> getPostSearchList(@RequestBody ListDTO request) throws Exception {
        return boardService.getPostSearchList(request);
    }

    // 게시물 조회
    @PostMapping("/view")
    public ViewResponseDTO getPost(@RequestBody ViewDTO request) throws Exception {
        return boardService.getPost(request);
    }

    // 게시물 작성
    @PostMapping("/write")
    public boolean writePost(@RequestBody WriteDTO request) throws Exception {
        return boardService.writePost(request);
    }

    // 게시물 수정
    @PostMapping("/modify")
    public boolean modifyPost(@RequestBody ModifyDTO request) throws Exception {
        return boardService.modifyPost(request);
    }

    // 게시물 삭제
    @PostMapping("/delete")
    public boolean deletePost(@RequestBody DeleteDTO request) throws Exception {
        return boardService.deletePost(request);
    }

    // 게시물 추천
    @PostMapping("/upvote")
    public boolean upvotePost(@RequestBody VoteDTO request) throws Exception {
        return boardService.upvotePost(request);
    }

    // 게시물 비추천
    @PostMapping("/downvote")
    public boolean downvotePost(@RequestBody VoteDTO request) throws Exception {
        return boardService.downvotePost(request);
    }

    // 다음 게시글 불러오기
    @PostMapping("/next")
    public ViewResponseDTO getNextPost(@RequestBody NavigateViewDTO request) throws Exception {

        return boardService.getNextPost(request);
    }

    // 이전 게시글 불러오기
    @PostMapping("/prev")
    public ViewResponseDTO getPrevPost(@RequestBody NavigateViewDTO request) throws Exception {
        return boardService.getPrevPost(request);
    }

    // 댓글 불러오기
    @PostMapping("/commentList")
    public List<CommentListResponseDTO> getCommentList(@RequestBody com.project.quantumtec.DTO.Request.board.CommentListDTO request) throws Exception {
        return boardService.getCommentList(request);
    }

    // 댓글 작성
    @PostMapping("/commentWrite")
    public boolean writeComment(@RequestBody CommentWriteDTO request) throws Exception {
        return boardService.writeComment(request);
    }

    // 댓글 수정
    @PostMapping("/commentModify")
    public boolean modifyComment(@RequestBody CommentModifyDTO request) throws Exception {
        return boardService.modifyComment(request);
    }

    // 댓글 삭제
    @PostMapping("/commentDelete")
    public boolean deleteComment(@RequestBody CommentDeleteDTO request) throws Exception {
        return boardService.deleteComment(request);
    }

    // 댓글 추천
    @PostMapping("/commentUpvote")
    public boolean upvoteComment(@RequestBody CommentVoteDTO request) throws Exception {
        return boardService.upvoteComment(request);
    }

    // 댓글 비추천
    @PostMapping("/commentDownvote")
    public boolean downvoteComment(@RequestBody CommentVoteDTO request) throws Exception {
        return boardService.downvoteComment(request);
    }


}

