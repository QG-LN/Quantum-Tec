package com.project.quantumtec.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {
    //프로필 정보 조회
    @PostMapping("/profile")
    public void getProfile(){

    }
}
