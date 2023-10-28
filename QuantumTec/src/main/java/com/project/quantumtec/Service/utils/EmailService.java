package com.project.quantumtec.Service.utils;

public interface EmailService {

    // 이메일 전송
    public void sendEmail(String to, String subject, String htmlContent) throws Exception;
}
