package com.project.quantumtec.DAO.board;

import com.project.quantumtec.DTO.board.BoardListRequestDTO;
import com.project.quantumtec.DTO.board.BoardListResponseDTO;
import com.project.quantumtec.DTO.board.BoardViewRequestDTO;
import com.project.quantumtec.DTO.board.BoardViewResponseDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class BoardDAOImpl implements BoardDAO {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<BoardListResponseDTO> getPostSearchList(BoardListRequestDTO board) {
        try {
            // 게시물 리스트 불러오기 (검색 포함)
            return sqlSession.selectList("BoardService.getPostSearchList", board);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public BoardViewResponseDTO getPost(BoardViewRequestDTO board) {
        try {
            // 게시물 조회
            return sqlSession.selectOne("BoardService.getPost", board);
        } catch (Exception e) {
            return null;
        }
    }
}
