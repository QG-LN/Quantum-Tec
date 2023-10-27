package com.project.quantumtec.Service.utils;

import jakarta.mail.internet.MimeMessage;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;  // 이메일 전송 객체

    private @Getter String key = null;  // 인증키
    private static final int KEY_LENGTH = 4;            // 인증키 길이
    @Value("${spring.mail.username}")
    private  String email;

    /**
     * 이메일 전송
     * @param to : 받는 사람
     * @param subject : 제목
     * @param htmlContent : 내용 (html 형식으로)
     * @throws Exception : 예외처리
     */
    @Override
    public void sendEmail(String to, String subject, String htmlContent) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(email);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }


}
