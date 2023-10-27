package com.project.quantumtec.Service.auth;

import com.project.quantumtec.Service.utils.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.security.SecureRandom;
import java.util.Date;

@Service
public class PasswordServiceImpl implements PasswordService{

    @Autowired
    private EmailService emailService;

    @Autowired
    private TemplateEngine templateEngine;  // 이메일 템플릿 엔진

    private SecureRandom random = new SecureRandom();   // 난수 생성을 위한 Random 클래스


    /**
     * 비밀번호 변경 이메일 전송
     * @param to : 받는 사람
     * @param newPassword : 새로운 비밀번호
     * @return : 이메일 전송 성공 여부
     */
    @Override
    public boolean sendPasswordResetEmail(String to, String newPassword){
        String password = "";

        if(newPassword == null){
            password = createRandomPassword(8);
        }
        else{
            password = newPassword;
        }

        Context context = new Context();
        context.setVariable("newPassword", password);    // 템플릿에 전달할 변수 설정

        // 템플릿 엔진을 사용하여 htmlContent 생성
        String htmlContent = templateEngine.process("html/emailTemplate/ChangePassword.html", context);

        try {
            emailService.sendEmail(to, "비밀번호 변경", htmlContent);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 랜덤한 비밀번호 생성
     * @param size : 비밀번호 길이
     * @return : 랜덤한 비밀번호
     */
    @Override
    public String createRandomPassword(int size){
        // charSet[비밀번호에 사용될 특수문자, 숫자, 영문자]
        char[] charSet = new char[] {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '!', '@', '#', '$', '%', '^', '&' };

        StringBuffer sb = new StringBuffer();
        random.setSeed(new Date().getTime());       // 시간을 기반으로 난수 생성

        // 난수 생성
        // charSet에서 랜덤으로 하나씩 뽑아서 sb에 저장
        for (int i = 0; i < size; i++){
            int idx = random.nextInt(charSet.length);
            sb.append(charSet[idx]);
        }

        return sb.toString();
    }
}
