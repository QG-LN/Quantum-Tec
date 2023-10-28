package com.project.quantumtec.Service.auth;

public interface KeyService {

    // 키 생성
    public String createKey() throws Exception;

    // 키 확인
    public boolean checkKey(String key) throws Exception;

    // 키 삭제
    public void removeKey() throws Exception;

    // 키 이메일 전송
    public boolean sendKeyEmail(String to, String subject, String text) throws Exception;

    // 키 반환
    public String getKey();
}
