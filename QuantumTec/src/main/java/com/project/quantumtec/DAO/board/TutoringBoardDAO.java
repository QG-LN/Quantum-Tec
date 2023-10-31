package com.project.quantumtec.DAO.board;

import com.project.quantumtec.DTO.Board.TutoringWriteDTO;
import com.project.quantumtec.DTO.Request.board.TutoringDeleteDTO;
import com.project.quantumtec.DTO.Request.board.TutoringEnrollRequestDTO;
import com.project.quantumtec.DTO.Request.board.TutoringListDTO;
import com.project.quantumtec.DTO.Request.board.TutoringPostStatusUpdateDTO;
import com.project.quantumtec.VO.board.TutoringEnrollVO;
import com.project.quantumtec.VO.board.TutoringPostVO;

import java.util.List;

public interface TutoringBoardDAO {
    // 튜터링 리스트 불러오기 (검색 포함)
    public List<TutoringPostVO> getTutoringList(TutoringListDTO request);

    // 튜터링 카테고리/태그 리스트 불러오기
    public TutoringPostVO getTutoringOrderDataList();

    // 튜터링 게시물 작성
    public boolean writeTutoring(TutoringWriteDTO request);

    // 튜터링 게시물 수정
    public boolean modifyTutoring(TutoringWriteDTO request);

    // 튜터링 게시물 삭제
    public boolean deleteTutoring(TutoringDeleteDTO request);

    // 튜터링 게시물 신청 리스트 출력
    public List<TutoringEnrollVO> getTutoringEnrollList(TutoringEnrollRequestDTO request);

    // 튜터링 게시물 신청 추가
    public boolean insertTutoringEnroll(TutoringEnrollRequestDTO request);

    public boolean updateTutoringEnroll(TutoringEnrollRequestDTO request);

    // 튜터링 게시물 신청 여부 확인
    public String checkTutoringEnroll(TutoringEnrollRequestDTO request);

    // 튜터링 게시물 활성화 상태 변경
    public boolean updateTutoringPostStatus(TutoringPostStatusUpdateDTO request);
}
