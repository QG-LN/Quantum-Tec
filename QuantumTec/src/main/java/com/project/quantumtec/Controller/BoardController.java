package com.project.quantumtec.Controller;


import com.project.quantumtec.DTO.Request.board.*;
import com.project.quantumtec.DTO.Response.board.*;
import com.project.quantumtec.Service.board.BoardService;
import com.project.quantumtec.Service.board.TutoringBoardService;
import com.sun.tools.jconsole.JConsoleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private TutoringBoardService tutoringBoardService;

    @PostMapping("/listCount")
    public int getPostListCount(@RequestBody ListDTO request){
//        System.out.println(request);
//        System.out.println(boardService.getPostListCount(request));
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
    public int getCommentCount(@RequestBody CommentCountDTO request){
        return boardService.getCommentCount(request);
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

    // ################# 튜터링 신청 게시판 ##################
    // 튜터링 신청 게시판 리스트 조회
    @PostMapping("/tutoringList")
    public List<TutoringListResponseDTO> getTutoringList(@RequestBody TutoringListDTO request){
        return tutoringBoardService.getTutoringList(request);
    }

    @PostMapping("/tutoringOrderDataList")
    public TutoringOrderDataListResponseDTO getTutoringCategoryList(){
        return tutoringBoardService.getTutoringOrderDataList();
    }

    // 튜터링 게시물 작성
    @PostMapping("/tutoringWrite")
    public boolean writeTutoringPost(@RequestBody TutoringWriteRequestDTO request) throws Exception {
        return tutoringBoardService.writeTutoring(request);
    }
    // 튜터링 게시물 수정
    @PostMapping("/tutoringModify")
    public boolean modifyTutoringPost(@RequestBody TutoringModifyDTO request){
        return tutoringBoardService.modifyTutoring(request);
    }
    // 튜터링 게시물 삭제
    @PostMapping("/tutoringDelete")
    public boolean deleteTutoringPost(@RequestBody TutoringDeleteDTO request){
        System.out.println(request);
        return tutoringBoardService.deleteTutoring(request);
    }

    @PostMapping("/tutoringEnrollList")
    public List<TutoringEnrollResponseDTO> getTutoringEnrollList(@RequestBody TutoringEnrollRequestDTO request){
        return tutoringBoardService.getTutoringEnrollList(request);
    }

    @PostMapping("/updateTutoringEnroll")
    public boolean updateTutoringEnroll(@RequestBody TutoringEnrollRequestDTO request){
        return tutoringBoardService.updateTutoringEnroll(request);
    }

    @PostMapping("/checkTutoringEnroll")
    public ResponseEntity<Boolean> checkTutoringEnroll(@RequestBody TutoringEnrollRequestDTO request){
        try{
            if (tutoringBoardService.checkTutoringEnroll(request)){
                return ResponseEntity.ok().body(true);
            } else {
                return ResponseEntity.ok().body(false);
            }
        } catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(false);
        }
    }

}

