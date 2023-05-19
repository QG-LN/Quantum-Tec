package com.project.quantumtec.Utils.user.emailApi;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.Getter;

@Service
public class EmailApiImpl implements EmailApi{

    @Autowired
    private JavaMailSender mailSender;
    
    private @Getter String key = null;
   @Value("${spring.mail.username}")
    private  String email;
    
    // 이메일 전송
    public boolean sendEmail(String to, String subject, String text) throws Exception {
        if (text.equals("") || text == null) {
            return false;
        }
        else{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(email);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            return true;
        }
    }

    // 인증번호 생성
    public String createKey() throws Exception {
        Random random = new Random();
        key = String.format("%04d", random.nextInt(10000)); // 4자리 랜덤 숫자 생성
        return key;
    }

    // 인증번호 확인
    public boolean checkKey(String key2) throws Exception {
        return key == key2;
    }

    // 인증번호 삭제
    public void removeKey() throws Exception {
        key = null;
    }
}