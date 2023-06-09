package com.project.quantumtec.Controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * PackageName : com.project.quantumtec.Controller
 * FileName : ImageController
 * Author : Argonaut
 * Date : 2023-06-10
 * Description :
 */
@RestController
@RequestMapping("/images")
public class ImageController {
    @GetMapping("/{imageName}")
    public Resource getImage(@PathVariable String imageName) {
        return new ClassPathResource("static/images/" + imageName);
    }
}