package com.project.quantumtec.Controller;


import ch.qos.logback.core.model.Model;
import com.project.quantumtec.DTO.Request.board.*;
import com.project.quantumtec.DTO.Response.board.CommentListResponseDTO;
import com.project.quantumtec.DTO.Response.board.ListResponseDTO;
import com.project.quantumtec.DTO.Response.board.ViewResponseDTO;
import com.project.quantumtec.Service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping("/listCount")
    public int getPostListCount(@RequestBody ListDTO request){
        System.out.println(request);
        System.out.println(boardService.getPostListCount(request));
        return boardService.getPostListCount(request);
    }

    // 게시물 리스트 조회
    @PostMapping("/list")
    public List<ListResponseDTO> getPostSearchList(@RequestBody ListDTO request){
        return boardService.getPostSearchList(request);
    }

    // 게시물 조회
    @PostMapping("/view")
    public ViewResponseDTO getPost(@RequestBody ViewDTO request){
        return boardService.getPost(request);
    }

    // 게시물 조회수 증가
    @PostMapping("/viewCountUp")
    public boolean viewCountUp(@RequestBody ViewDTO request){ return boardService.viewCountUp(request); }

    // 게시물 작성
    @PostMapping("/write")
    public boolean writePost(@RequestBody WriteDTO request){
        return boardService.writePost(request);
    }

    // 게시물 수정
    @PostMapping("/modify")
    public boolean modifyPost(@RequestBody ModifyDTO request){
        return boardService.modifyPost(request);
    }

    // 게시물 삭제
    @PostMapping("/delete")
    public boolean deletePost(@RequestBody DeleteDTO request){
        return boardService.deletePost(request);
    }

    // 게시물 추천
    @PostMapping("/upvote")
    public boolean upvotePost(@RequestBody VoteDTO request){
        return boardService.upvotePost(request);
    }

    // 게시물 비추천
    @PostMapping("/downvote")
    public boolean downvotePost(@RequestBody VoteDTO request){
        return boardService.downvotePost(request);
    }

    // 다음 게시글 불러오기
    @PostMapping("/next")
    public int getNextPost(@RequestBody NavigateViewDTO request){
        return boardService.getNextPost(request);
    }

    // 이전 게시글 불러오기
    @PostMapping("/prev")
    public int getPrevPost(@RequestBody NavigateViewDTO request){
        return boardService.getPrevPost(request);
    }

    // 댓글 불러오기
    @PostMapping("/commentList")
    public List<CommentListResponseDTO> getCommentList(@RequestBody CommentListDTO request){
        return boardService.getCommentList(request);
    }

    // 해당 게시글의 총 댓글 수
    @PostMapping("/commentCount")
    public int getCommentCount(@RequestParam("postIndex") int postIndex){
        return boardService.getCommentCount(postIndex);
    }

    // 댓글 작성
    @PostMapping("/commentWrite")
    public boolean writeComment(@RequestBody CommentWriteDTO request){
        return boardService.writeComment(request);
    }

    // 댓글 수정
    @PostMapping("/commentModify")
    public boolean modifyComment(@RequestBody CommentModifyDTO request){
        return boardService.modifyComment(request);
    }

    // 댓글 삭제
    @PostMapping("/commentDelete")
    public boolean deleteComment(@RequestBody CommentDeleteDTO request){
        return boardService.deleteComment(request);
    }

    // 댓글 추천
    @PostMapping("/commentUpvote")
    public boolean upvoteComment(@RequestBody CommentVoteDTO request){
        return boardService.upvoteComment(request);
    }

    // 댓글 비추천
    @PostMapping("/commentDownvote")
    public boolean downvoteComment(@RequestBody CommentVoteDTO request){
        return boardService.downvoteComment(request);
    }


}

