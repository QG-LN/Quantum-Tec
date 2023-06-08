package com.project.quantumtec.DAO.board;

import com.project.quantumtec.DTO.board.*;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class BoardDAOImpl implements BoardDAO {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<BoardListResponseDTO> getPostSearchList(BoardListRequestDTO request) {
        try {
            // 게시물 리스트 불러오기 (검색 포함)
            return sqlSession.selectList("BoardService.getPostSearchList", request);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public BoardViewResponseDTO getPost(BoardViewRequestDTO request) {
        try {
            // 게시물 조회
            return sqlSession.selectOne("BoardService.getPost", request);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean writePost(BoardWriteRequestDTO request) {
        try {
            // 게시물 작성
            return sqlSession.insert("BoardService.writePost", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean modifyPost(BoardModifyRequestDTO request) {
        try {
            // 게시물 수정
            return sqlSession.update("BoardService.modifyPost", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deletePost(BoardDeleteRequestDTO request) {
        try {
            // 게시물 삭제
            return sqlSession.delete("BoardService.deletePost", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean upvotePost(BoardVoteRequestDTO request) {
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
    public boolean downvotePost(BoardVoteRequestDTO request) {
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
    public List<BoardCommentListResponseDTO> getCommentList(BoardCommentListRequestDTO request) {
        try {
            // 댓글 리스트 불러오기 (정렬 데이터 포함)
            return sqlSession.selectList("BoardService.getCommentList", request);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean writeComment(BoardCommentWriteRequestDTO request) {
        try {
            // 댓글 작성
            return sqlSession.insert("BoardService.writeComment", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean modifyComment(BoardCommentModifyRequestDTO request) {
        try {
            // 댓글 작성
            return sqlSession.insert("BoardService.modifyComment", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteComment(BoardCommentDeleteRequestDTO request) {
        try {
            // 댓글 작성
            return sqlSession.insert("BoardService.deleteComment", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean upvoteComment(BoardCommenVoteRequestDTO request) {
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
    public boolean downvoteComment(BoardCommenVoteRequestDTO request) {
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
