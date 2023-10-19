package com.project.quantumtec.DAO.board;

import com.project.quantumtec.DTO.Board.TutoringWriteDTO;
import com.project.quantumtec.DTO.Request.board.*;
import com.project.quantumtec.DTO.Response.board.CommentListResponseDTO;
import com.project.quantumtec.DTO.Response.board.ListResponseDTO;
import com.project.quantumtec.DTO.Response.board.ViewResponseDTO;

import com.project.quantumtec.VO.board.TutoringPostVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class BoardDAOImpl implements BoardDAO {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<ListResponseDTO> getPostSearchList(ListDTO request) {
        try {
            // 게시물 리스트 불러오기 (검색 포함)
            return sqlSession.selectList("BoardService.getPostSearchList", request);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public int getPostCount(ListDTO request){
        try{
            return sqlSession.selectOne("BoardService.getPostCount", request);
        }catch (Exception e){
            return 0;
        }
    }

    @Override
    public ViewResponseDTO getPost(ViewDTO request) {
        try {
            // 게시물 조회
            return sqlSession.selectOne("BoardService.getPost", request);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean viewCountUp(ViewDTO request) {
        try {
            // 게시물 조회수 증가
            return sqlSession.update("BoardService.viewCountUp", request) > 0;
        } catch (Exception e) {
            return false;
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
    public boolean deletePost(DeleteDTO request) { // 게시글 삭제 성공해도 false 반환하는 중...
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
            String check = sqlSession.selectOne("BoardService.checkVote", request);
            if (check != null) { // 데이터가 있는 경우
                if (check.equals("down")) { // 이미 비추천했을 경우
                    return sqlSession.update("BoardService.updateUpvotePost", request) > 0;
                }
                else
                    return false;
            }else {
                return sqlSession.insert("BoardService.insertUpvotePost", request) > 0; // 비추천/추천 둘다 아직 하지 않은 경우
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean downvotePost(VoteDTO request) {
        try {
            // 게시물 비추천
            String check = sqlSession.selectOne("BoardService.checkVote", request);
            if (check != null) { // 데이터가 있는 경우
                if (check.equals("up")) { // 이미 비추천했을 경우
                    return sqlSession.update("BoardService.updateDownvotePost", request) > 0;
                }
                else
                    return false;
            }else {
                return sqlSession.insert("BoardService.insertDownvotePost", request) > 0; // 비추천/추천 둘다 아직 하지 않은 경우
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public int getNextPost(NavigateViewDTO request) {
        try{
            // 다음 게시물 번호 불러오기
            return sqlSession.selectOne("BoardService.getNextPost", request);
        }catch (Exception e){
            return 0;
        }
    }

    @Override
    public int getPrevPost(NavigateViewDTO request) {
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
    public int getCommentCount(CommentCountDTO request) { // 댓글 갯수 불러오기
        return sqlSession.selectOne("BoardService.getCommentCount", request);
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
            String check = sqlSession.selectOne("BoardService.checkCommentVote", request);
            if (check != null) {
                sqlSession.delete("BoardService.deleteCommentVote", request);
            }
            return sqlSession.delete("BoardService.deleteComment", request) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean upvoteComment(CommentVoteDTO request) {
        try{
            // 댓글 추천
            String check = sqlSession.selectOne("BoardService.checkCommentVote", request);
            if (check != null) { // 데이터가 있는 경우
                if (check.equals("down")) { // 이미 비추천했을 경우
                    return sqlSession.update("BoardService.updateUpvoteComment", request) > 0;
                }
                else
                    return false;
            }else {
                return sqlSession.insert("BoardService.insertUpvoteComment", request) > 0; // 비추천/추천 둘다 아직 하지 않은 경우
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean downvoteComment(CommentVoteDTO request) {
        try{
            // 댓글 비추천
            String check = sqlSession.selectOne("BoardService.checkCommentVote", request);
            if (check != null) { // 데이터가 있는 경우
                if (check.equals("up")) { // 이미 비추천했을 경우
                    return sqlSession.update("BoardService.updateDownvoteComment", request) > 0;
                }
                else
                    return false;
            }else {
                return sqlSession.insert("BoardService.insertDownvoteComment", request) > 0; // 비추천/추천 둘다 아직 하지 않은 경우
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<TutoringPostVO> getTutoringList(TutoringListDTO request) {
        return sqlSession.selectList("BoardService.getTutoringList", request);
    }

    @Override
    public TutoringPostVO getTutoringOrderDataList() {
        return sqlSession.selectOne("BoardService.getTutoringOrderDataList");
    }

    /**
     * 튜터링 게시물 작성
     * @param request 튜터링 게시물 작성 데이터
     * @return 성공 여부
     * @todo 추후 도중 실패 시 롤백 처리 필요 현재는 트랜잭션 처리 안됨
     */
    @Override
    public boolean writeTutoring(TutoringWriteDTO request) {
        boolean result = sqlSession.insert("BoardService.writeTutoring", request) > 0;
        if(result){

            // 태그 결과
            boolean tagResult = sqlSession.insert("BoardService.insertTutoringTag", request) > 0;

            // 카테고리 결과
            boolean categoryResult = sqlSession.insert("BoardService.insertTutoringCategory", request) > 0;

            return tagResult && categoryResult;
        }
        return false;
    }

    @Override
    public boolean modifyTutoring(TutoringWriteDTO request) {
        TutoringDeleteDTO dto = new TutoringDeleteDTO();
        dto.setPostIndex(request.getPostTutoringIndex());

        boolean tagDelete = sqlSession.delete("BoardService.deleteTutoringTag", dto) > 0;
        boolean categoryDelete = sqlSession.delete("BoardService.deleteTutoringCategory", dto) > 0;
        boolean tutoringModify = sqlSession.update("BoardService.modifyTutoring", request) > 0;

        if(tagDelete && categoryDelete && tutoringModify){
            boolean tagResult = sqlSession.insert("BoardService.insertTutoringTag", request) > 0;
            boolean categoryResult = sqlSession.insert("BoardService.insertTutoringCategory", request) > 0;
            return tagResult && categoryResult;
        }
        return false;
    }

    /**
     * 튜터링 게시물 삭제 (태그, 카테고리, 게시물)
     * @todo 추후 도중 실패 시 롤백 처리 필요 현재는 트랜잭션 처리 안됨
     */
    @Override
    public boolean deleteTutoring(TutoringDeleteDTO request) {
        boolean tagResult = sqlSession.delete("BoardService.deleteTutoringTag", request) > 0;
        boolean categoryResult = sqlSession.delete("BoardService.deleteTutoringCategory", request) > 0;
        if(tagResult && categoryResult){
            return sqlSession.delete("BoardService.deleteTutoring", request) > 0;
        }
        return false;
    }
}
