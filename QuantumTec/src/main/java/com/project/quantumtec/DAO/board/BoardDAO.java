package com.project.quantumtec.DAO.board;

import com.project.quantumtec.DTO.board.BoardListRequestDTO;
import com.project.quantumtec.DTO.board.BoardListResponseDTO;
import com.project.quantumtec.DTO.board.BoardViewRequestDTO;
import com.project.quantumtec.DTO.board.BoardViewResponseDTO;


import java.util.List;

public interface BoardDAO {
    // 게시물 리스트 불러오기 (검색 포함)
    public List<BoardListResponseDTO> getPostSearchList(BoardListRequestDTO board);

    // 게시물 조회
    public BoardViewResponseDTO getPost(BoardViewRequestDTO board);

    // 게시물 작성

    // 게시물 수정

    // 게시물 삭제

    // 게시물 추천

    // 게시물 비추천

    // 다음 게시글

    // 이전 게시글

    // 게시글 목록


}
