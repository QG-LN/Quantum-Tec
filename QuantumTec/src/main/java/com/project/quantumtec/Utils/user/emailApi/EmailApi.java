package com.project.quantumtec.Utils.user.emailApi;

/**
 * PackageName : com.project.quantumtec.Utils.user.emailApi
 * FileName : EmailApi
 * Author : MayoneJY
 * Date : 2023-05-12
 * Description :
 */
public interface EmailApi {
    // 이메일 전송
    public void sendEmail(String to, String subject, String text) throws Exception;

    // 인증번호 생성
    public String createKey() throws Exception;

    // 인증번호 확인
    public boolean checkKey(String key) throws Exception;

    // 인증번호 삭제
    public void removeKey(String key) throws Exception;
    
}
