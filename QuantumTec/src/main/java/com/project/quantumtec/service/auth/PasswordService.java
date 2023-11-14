package com.project.quantumtec.service.auth;

public interface PasswordService {

    // 비밀번호 초기화 이메일 전송
    public boolean sendPasswordResetEmail(String to, String newPassword) throws Exception;


    // 비밀번호 생성
    public String createRandomPassword(int size) throws Exception;
}
