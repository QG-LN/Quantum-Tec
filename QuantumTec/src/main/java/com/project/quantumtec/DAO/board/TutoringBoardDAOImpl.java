package com.project.quantumtec.DAO.board;

import com.project.quantumtec.DTO.Board.TutoringWriteDTO;
import com.project.quantumtec.DTO.Request.board.TutoringDeleteDTO;
import com.project.quantumtec.DTO.Request.board.TutoringEnrollRequestDTO;
import com.project.quantumtec.DTO.Request.board.TutoringListDTO;
import com.project.quantumtec.DTO.Request.board.TutoringPostStatusUpdateDTO;
import com.project.quantumtec.VO.board.TutoringEnrollVO;
import com.project.quantumtec.VO.board.TutoringPostVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class TutoringBoardDAOImpl implements TutoringBoardDAO{

    @Autowired
    private SqlSession sqlSession;

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

    @Override
    public List<TutoringEnrollVO> getTutoringEnrollList(TutoringEnrollRequestDTO request) {
        return sqlSession.selectList("BoardService.getTutoringEnrollList", request);
    }

    @Override
    public boolean insertTutoringEnroll(TutoringEnrollRequestDTO request) {
        return sqlSession.insert("BoardService.insertTutoringEnroll", request) > 0;
    }

    @Override
    public boolean updateTutoringEnroll(TutoringEnrollRequestDTO request) {
        return sqlSession.update("BoardService.updateTutoringEnroll", request) > 0;
    }

    @Override
    public String checkTutoringEnroll(TutoringEnrollRequestDTO request){
        return sqlSession.selectOne("BoardService.checkTutoringEnroll", request);
    }

    @Override
    public boolean updateTutoringPostStatus(TutoringPostStatusUpdateDTO request) {
        return sqlSession.update("BoardService.updateTutoringPostStatus", request) > 0;
    }
}
