package com.project.quantumtec.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * PackageName : com.project.quantumtec.Controller
 * FileName : HelloController
 * Author : Argonaut
 * Date : 2023-04-30
 * Description :
 */
@RestController
public class HelloController {
    @GetMapping("api/hello")
    public String test() {
        return "Hello, world!";
    }
}
