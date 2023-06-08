package com.project.quantumtec.DAO.board;

import com.project.quantumtec.DTO.Request.board.*;
import com.project.quantumtec.DTO.Response.board.CommentListResponseDTO;
import com.project.quantumtec.DTO.Response.board.ListResponseDTO;
import com.project.quantumtec.DTO.Response.board.ViewResponseDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class BoardDAOImpl implements BoardDAO {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<ListResponseDTO> getPostSearchList(com.project.quantumtec.DTO.Request.board.ListDTO request) {
        try {
            // 게시물 리스트 불러오기 (검색 포함)
            return sqlSession.selectList("BoardService.getPostSearchList", request);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public ViewResponseDTO getPost(com.project.quantumtec.DTO.Request.board.ViewDTO request) {
        try {
            // 게시물 조회
            return sqlSession.selectOne("BoardService.getPost", request);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean writePost(WriteDTO request) {
        try {
            // 게시물 작성
            return sqlSession.insert("BoardService.writePost", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean modifyPost(ModifyDTO request) {
        try {
            // 게시물 수정
            return sqlSession.update("BoardService.modifyPost", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deletePost(DeleteDTO request) {
        try {
            // 게시물 삭제
            return sqlSession.delete("BoardService.deletePost", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean upvotePost(VoteDTO request) {
        try {
            // 게시물 추천
            if (sqlSession.selectOne("BoardService.checkUpvote", request) != null) { // 이미 추천했을 경우
                return false;
            } else if (sqlSession.selectOne("BoardService.checkDownvote", request) != null) { // 이미 비추천했을 경우
                sqlSession.delete("BoardService.deleteDownvote", request);
                return sqlSession.update("BoardService.upvotePost", request) > 0;
            }else {
                return sqlSession.update("BoardService.upvotePost", request) > 0; // 비추천/추천 둘다 아직 하지 않은 경우
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean downvotePost(VoteDTO request) {
        try {
            // 게시물 비추천
            if (sqlSession.selectOne("BoardService.checkDownvote", request) != null) { // 이미 비추천했을 경우
                return false;
            } else if (sqlSession.selectOne("BoardService.checkUpvote", request) != null) { // 이미 추천했을 경우
                sqlSession.delete("BoardService.deleteUpvote", request);
                return sqlSession.update("BoardService.downvotePost", request) > 0;
            }else {
                return sqlSession.update("BoardService.downvotePost", request) > 0; // 비추천/추천 둘다 아직 하지 않은 경우
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public int getNextPost(NavigateView request) {
        try{
            // 다음 게시물 번호 불러오기
            return sqlSession.selectOne("BoardService.getNextPost", request);
        }catch (Exception e){
            return 0;
        }
    }

    @Override
    public int getPrevPost(NavigateView request) {
        try{
            // 이전 게시물 번호 불러오기
            return sqlSession.selectOne("BoardService.getPrevPost", request);
        }catch (Exception e){
            return 0;
        }
    }

    @Override
    public List<CommentListResponseDTO> getCommentList(com.project.quantumtec.DTO.Request.board.CommentListDTO request) {
        try {
            // 댓글 리스트 불러오기 (정렬 데이터 포함)
            return sqlSession.selectList("BoardService.getCommentList", request);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean writeComment(CommentWriteDTO request) {
        try {
            // 댓글 작성
            return sqlSession.insert("BoardService.writeComment", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean modifyComment(CommentModifyDTO request) {
        try {
            // 댓글 작성
            return sqlSession.insert("BoardService.modifyComment", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteComment(CommentDeleteDTO request) {
        try {
            // 댓글 작성
            return sqlSession.insert("BoardService.deleteComment", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean upvoteComment(CommentVoteDTO request) {
        try{
            // 댓글 추천
            if (sqlSession.selectOne("BoardService.checkCommentUpvote", request) != null) { // 이미 추천했을 경우
                return false;
            } else if (sqlSession.selectOne("BoardService.checkCommentDownvote", request) != null) { // 이미 비추천했을 경우
                sqlSession.delete("BoardService.deleteCommentDownvote", request);
                return sqlSession.update("BoardService.upvoteComment", request) > 0;
            }else {
                return sqlSession.update("BoardService.upvoteComment", request) > 0; // 비추천/추천 둘다 아직 하지 않은 경우
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean downvoteComment(CommentVoteDTO request) {
        try{
            // 댓글 비추천
            if (sqlSession.selectOne("BoardService.checkCommentDownvote", request) != null) { // 이미 비추천했을 경우
                return false;
            } else if (sqlSession.selectOne("BoardService.checkCommentUpvote", request) != null) { // 이미 추천했을 경우
                sqlSession.delete("BoardService.deleteCommentUpvote", request);
                return sqlSession.update("BoardService.downvoteComment", request) > 0;
            }else {
                return sqlSession.update("BoardService.downvoteComment", request) > 0; // 비추천/추천 둘다 아직 하지 않은 경우
            }
        } catch (Exception e) {
            return false;
        }
    }
}
