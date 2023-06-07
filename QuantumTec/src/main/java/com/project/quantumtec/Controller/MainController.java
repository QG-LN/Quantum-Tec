package com.project.quantumtec.Controller;

import com.project.quantumtec.DTO.board.BoardRequestDTO;
import com.project.quantumtec.DTO.board.BoardResponseDTO;
import com.project.quantumtec.Service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class MainController
{
    @Autowired
    private BoardService boardService;
    @PostMapping("/board")
    public List<BoardResponseDTO> getPostSearchList(@RequestBody BoardRequestDTO board) throws Exception {
        return boardService.getPostSearchList(board);
    }

}
