package com.project.quantumtec.Controller;

import com.project.quantumtec.DTO.game.GameDetailsInfoDTO;
import com.project.quantumtec.DTO.game.GameSearchDTO;
import com.project.quantumtec.Service.game.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * PackageName : com.project.quantumtec.Controller
 * FileName : GameController
 * Author : Argonaut
 * Date : 2023-06-09
 * Description :
 */

@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    private GameService gameService;


    // 게임 ID/ 게임 이름 / 사용자 ID를 받아서 게임 정보와 사용자의 게임 플레이 정보를 가져옴
    @GetMapping("/info")
    public GameDetailsInfoDTO getGameDetailsInfo(@RequestParam(value = "id") int gameID,
                                          @RequestParam( value = "name") String gameName,
                                          @RequestParam( value = "userId") String userId){
        gameName = gameName.replace("_", " ");  // 게임 이름에 _가 포함되어 있으면 공백으로 변경
        if(userId.equals("")) userId = null;    // userId가 빈문자열이면 null로 변경

        // DTO에 게임 ID와 게임 이름을 세팅
        GameSearchDTO gameSearchDTO = new GameSearchDTO();
        gameSearchDTO.setGameIndex(gameID);
        gameSearchDTO.setGameName(gameName);
        gameSearchDTO.setUserId(userId);

        // 게임 id와 게임 이름을 받아서 게임 정보를 가져옴
        return gameService.getGameInfo(gameSearchDTO);
    }


}