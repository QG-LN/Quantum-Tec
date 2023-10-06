package com.project.quantumtec.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * PackageName : com.project.quantumtec.Controller
 * FileName : ImageController
 * Author : Argonaut
 * Date : 2023-06-10
 * Description :
 */
@RestController
@RequestMapping("/image")
public class ImageController {

    /**
     * 경로를 받아서 게임 이미지 1개를 반환하는 메소드
     * @param imagePath 이미지 경로 (ex: game_1_1.png -> game/1/1.png)를 의미
     * */
    @GetMapping("/game/{path:.+}")
    public Resource getImage(@PathVariable(value = "path") String imagePath) {
        try{
            imagePath = imagePath.replaceAll("_", "/");            // _을 /로 변경
            String path = "static/images/"+ imagePath;
            return new ClassPathResource(path);
        }catch (Exception e){
            System.out.println("이미지가 없습니다.");
            System.out.println(e.getMessage());
            return new ClassPathResource("static/images/test.png");
        }
    }

    /**
     * 이미지가 존재하는 디렉토리 경로를 받아 해당 디렉토리 하위에 있는 파일 리스트를 반환
     * @param imagePath 이미지 경로 (ex: game_1_1.png -> game/1/1.png)를 의미
     * */
    @GetMapping("/game/list/{path:.+}")
    public ResponseEntity<String> getImageList(@PathVariable(value = "path") String imagePath){
        try {
            List<String> imagePaths = new ArrayList<>();
            imagePath = imagePath.replaceAll("_", "/");            // _을 /로 변경
            String path = "static/images/" + imagePath;

            // 디렉터리 경로를 문자열로 직접 구성이 아닌 스프링에서 제공하는 함수로 연결
            Resource resource = new ClassPathResource(path);
            File dir = resource.getFile();      // 경로에서 파일 객체를 가져옴
            File[] fileList = dir.listFiles();  // 파일 객체에서 파일 리스트를 가져옴

            // 파일 리스트에서 파일을 하나씩 꺼내서 파일이면 이미지 경로를 리스트에 추가
            if (fileList != null) {
                for (File file : fileList) {
                    if (file.isFile()) {
                        imagePaths.add(file.getName());
                    }
                }
            }

            // 이미지 파일 경로 배열을 JSON으로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(imagePaths);

            return ResponseEntity.ok().body(json);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }


}
