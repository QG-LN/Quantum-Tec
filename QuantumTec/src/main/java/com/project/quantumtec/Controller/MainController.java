package com.project.quantumtec.Controller;

import com.project.quantumtec.DTO.game.GameDTO;
import com.project.quantumtec.DTO.game.GameSearchRequestDTO;
import com.project.quantumtec.DTO.game.GameSearchResponseDTO;
import com.project.quantumtec.Service.game.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MainController
{
    @Autowired
    private GameService gameService;

    // // 게임 이름, 장르, 가격을 입력받아 게임리스트를 가져오는 메소드
    @PostMapping("/search")
    public GameSearchResponseDTO[] search(@RequestBody GameSearchRequestDTO game) throws Exception {
        return gameService.getGameSearchList(game);
    }

    // 게임 ID를 받아서 게임 정보 가져오는 메소드
    @PostMapping("/gameinfo")
    public GameDTO gameInfo(@RequestBody int gameID) throws Exception {
        return gameService.getGameInfo(gameID);
    }


}