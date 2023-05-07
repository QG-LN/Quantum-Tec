package com.project.quantumtec.Controller;

import com.project.quantumtec.Service.user.UserService;
import com.project.quantumtec.VO.user.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * PackageName : com.project.quantumtec.Controller
 * FileName : HelloController
 * Author : Argonaut
 * Date : 2023-04-30
 * Description :
 */
@RestController
public class HelloController {

    @Autowired
    private UserService userService;
    @GetMapping("api/hello")
    public String test(){
        List<UserVO> userList = null;
        String userName = "aaaa";
        try{
            userList = userService.getUserListAll();

            for(UserVO userVO : userList){
                if(userVO != null && userVO.getUserName() != null){
                    userName = userVO.getUserName();
                }else{
                    System.out.println(userVO);
                }
            }
        }catch (Exception e){
            System.out.println("check");
            e.printStackTrace();
        }

        return "Hello, world! " + userName;
    }
}
