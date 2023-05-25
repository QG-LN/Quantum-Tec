package com.project.quantumtec.Utils.user.emailApi;

/**
 * PackageName : com.project.quantumtec.Utils.user.emailApi
 * FileName : EmailApi
 * Author : MayoneJY
 * Date : 2023-05-12
 * Description :
 */
public interface EmailApi {
    // 키 생성 여부를 확인하고, 이메일 전송
    public boolean sendKeyEmail(String to, String subject, String text) throws Exception;

    // 인증번호 생성
    public String createKey() throws Exception;

    // 인증번호 확인
    public boolean checkKey(String key2) throws Exception;

    // 인증번호 삭제
    public void removeKey() throws Exception;

    public String getKey();

    // 초기화된 비밀번호 이메일 전송
    public boolean sendPwEmail(String to, String subject, String text) throws Exception;

    // 비밀번호 생성
    public String createRandomPW(int size) throws Exception;
    
}
