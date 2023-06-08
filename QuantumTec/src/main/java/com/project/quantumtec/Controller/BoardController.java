package com.project.quantumtec.Controller;


import com.project.quantumtec.DTO.board.BoardListRequestDTO;
import com.project.quantumtec.DTO.board.BoardListResponseDTO;
import com.project.quantumtec.DTO.board.BoardViewRequestDTO;
import com.project.quantumtec.DTO.board.BoardViewResponseDTO;
import com.project.quantumtec.Service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping("/list")
    public List<BoardListResponseDTO> getPostSearchList(@RequestBody BoardListRequestDTO board) throws Exception {
        return boardService.getPostSearchList(board);
    }

    @PostMapping("/view")
    public BoardViewResponseDTO getPost(@RequestBody BoardViewRequestDTO board) throws Exception {
        return boardService.getPost(board);
    }
}
