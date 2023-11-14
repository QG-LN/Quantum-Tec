package com.project.quantumtec.service.auth;

import com.project.quantumtec.service.utils.EmailService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class KeyServiceImpl implements KeyService{

    private @Getter String key = null;

    private static final int KEY_LENGTH = 4;            // 인증키 길이

    @Autowired
    private EmailService emailService;

    /**
     * 인증번호 생성
     * @return : 인증번호
     * @throws Exception
     */
    @Override
    public String createKey() throws Exception {
        Random random = new Random();
        key = String.format("%0"+ KEY_LENGTH +"d"
                , random.nextInt((int) Math.pow(10,KEY_LENGTH))); // KEY_LENGTH 자리의 난수 생성
        return key;
    }

    /**
     * 인증번호 확인
     * @param key : 현재 키와 비교할 인증번호 키
     * @return : 인증번호 일치 여부
     * @throws Exception
     */
    @Override
    public boolean checkKey(String key) throws Exception {
        return this.key.equals(key);
    }

    /**
     * 인증키 초기화[null]
     * @throws Exception
     */
    @Override
    public void removeKey() throws Exception {
        key = null;
    }

    /**
     * 인증키 이메일 전송
     * @param to : 받는 사람
     * @param subject : 제목
     * @param text : 내용 (html 형식으로)
     * @return : 성공 여부
     * @throws Exception : 예외처리
     */
    @Override
    public boolean sendKeyEmail(String to, String subject, String text) throws Exception {
        if(text.isEmpty()){
            return false;
        }else{
            emailService.sendEmail(to, subject, text);
            return true;
        }
    }
}
