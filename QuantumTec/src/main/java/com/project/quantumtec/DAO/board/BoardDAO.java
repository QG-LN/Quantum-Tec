package com.project.quantumtec.DAO.board;

import com.project.quantumtec.DTO.board.BoardRequestDTO;
import com.project.quantumtec.DTO.board.BoardResponseDTO;

import java.util.List;

public interface BoardDAO {
    // 게시물 리스트 불러오기 (검색 포함)
    public List<BoardResponseDTO> getPostSearchList(BoardRequestDTO board);

    // 게시물 작성

    // 게시물 수정

    // 게시물 삭제

    // 게시물 좋아요

    // 게시물 싫어요
}
