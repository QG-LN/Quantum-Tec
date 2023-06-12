package com.project.quantumtec.Utils.user.emailApi;

import java.util.Random;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.Date;

import lombok.Getter;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailApiImpl implements EmailApi{

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;


    private @Getter String key = null;

   @Value("${spring.mail.username}")
    private  String email;
    
    // 인증키 이메일 전송
    public boolean sendKeyEmail(String to, String subject, String text) throws Exception {
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

    @Override
    public boolean sendPwEmail(String to, String subject, String text) throws Exception {

        if (text.equals("") || text == null) {
            return false;
        }
        else{

            MimeMessage message = mailSender.createMimeMessage();
            String newPassword = text;

            Context context = new Context();
            context.setVariable("newPassword", newPassword);

            // src/main/resources/templates/html/emailTemplate에 있는 ChangePassword를 사용
            String htmlContent = templateEngine.process("html/emailTemplate/ChangePassword.html", context);

            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(email);                       // 수신자 이메일 주소 설정
            helper.setTo(to);
            helper.setSubject("Password 변경 안내");     // 타이틀
            helper.setText(htmlContent, true);
            mailSender.send(message);
            return true;
        }
    }

    // 임시 비밀번호 생성
    public String createRandomPW(int size) {
        char[] charSet = new char[] {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '!', '@', '#', '$', '%', '^', '&' };

        StringBuffer sb = new StringBuffer();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        int idx = 0;
        int len = charSet.length;
        for (int i=0; i<size; i++) {
            idx = sr.nextInt(len);
            sb.append(charSet[idx]);
        }
        return sb.toString();
    }
}
