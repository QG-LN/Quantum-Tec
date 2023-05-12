import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login(){
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [truelogin, setLogincheck] = useState(false);

	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        truelogin=true;
    }
    
    // signup 버튼 클릭 이벤트
    const OnClickSignUp = () => {
        document.location.href = "/signup";
    }
 
	// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        axios.get('/user_inform/login')
        .then(res => console.log(res))
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [])
    return (
            <div class="login-form">
            <h2 class='Logintitle'>로그인</h2>
            <div class="form-group">
                <label htmlFor="input_id" class='Logintxt'>아이디 : </label>
                <input type="text" name="input_id" value={inputId} maxLength={20} onChange={handleInputId} />
            </div>
            <div class="form-group">
                <label htmlFor="input_pw" class='Logintxt'>비밀번호 :</label>
                <input type="password" name="input_pw" value={inputPw} minLength={8} onChange={handleInputPw}/>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-primary" onClick={onClickLogin}>로그인</button>
                <button type="button" class="btn btn-primary" onClick={OnClickSignUp}>회원가입</button>
            </div>
            </div>
    );
}
