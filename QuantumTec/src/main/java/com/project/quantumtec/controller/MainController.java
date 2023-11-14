package com.project.quantumtec.controller;

import com.project.quantumtec.Model.dto.game.GameCategoryDTO;
import com.project.quantumtec.Model.dto.game.GameSearchRequestDTO;
import com.project.quantumtec.Model.dto.game.GameSearchResponseDTO;
import com.project.quantumtec.service.game.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class MainController
{
    @Autowired
    private GameService gameService;

    // // 게임 이름, 장르, 가격을 입력받아 게임리스트를 가져오는 메소드
    @PostMapping("search")
    public List<GameSearchResponseDTO> search(@RequestBody GameSearchRequestDTO game) throws Exception {
        // 현재 오류가 하나 있음 만약 return으로 바로 값을 전달하지 않으면 값이 null값으로 변경됨
        // 예를 들어       System.out.println(gameService.getGameSearchList(game)); 이문장을 실행후 return 진행 시 값이 없음
        /*
        * System.out.println(gameService.getGameSearchList(game)); => 제대로 나옴
        * System.out.println(gameService.getGameSearchList(game) == null); => 예상은 false가 나와야 하지만 true가 나옴
        * return gameService.getGameSearchList(game); => null값이 나옴
         * */
        return gameService.getGameSearchList(game);
    }

    @PostMapping ("loadCategory")
    public List<GameCategoryDTO> loadCategory() throws Exception {
        return gameService.getGameCategoryNameList();
    }


}
