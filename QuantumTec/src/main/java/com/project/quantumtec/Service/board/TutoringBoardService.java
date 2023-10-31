package com.project.quantumtec.Service.board;

import com.project.quantumtec.DTO.Request.board.*;
import com.project.quantumtec.DTO.Response.board.TutoringEnrollResponseDTO;
import com.project.quantumtec.DTO.Response.board.TutoringListResponseDTO;
import com.project.quantumtec.DTO.Response.board.TutoringOrderDataListResponseDTO;

import java.util.List;

public interface TutoringBoardService {
    // 튜터링 리스트 불러오기 (검색 포함)
    public List<TutoringListResponseDTO> getTutoringList(TutoringListDTO request);

    public TutoringOrderDataListResponseDTO getTutoringOrderDataList();

    // 튜터링 게시물 작성
    public boolean writeTutoring(TutoringWriteRequestDTO request) throws Exception;

    // 튜터링 게시물 수정
    public boolean modifyTutoring(TutoringModifyDTO request);

    // 튜터링 게시물 삭제
    public boolean deleteTutoring(TutoringDeleteDTO request);

    // 튜터링 게시물 신청 상태 변경
    public boolean updateTutoringEnroll(TutoringEnrollRequestDTO request);

    // 튜터링 게시물 신청 리스트 출력
    public List<TutoringEnrollResponseDTO> getTutoringEnrollList(TutoringEnrollRequestDTO request);

    // 튜터링 게시물 신청 여부 확인
    public boolean checkTutoringEnroll(TutoringEnrollRequestDTO request);
}
