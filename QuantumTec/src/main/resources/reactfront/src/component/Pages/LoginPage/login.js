import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login(){
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    let [truelogin, setLogincheck] = useState(false);

	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        inputId === '' ? alert('아이디를 입력해주세요') : inputPw === '' 
        ? alert('비밀번호를 입력해주세요') : inputPw < 8 
        ? alert('비밀번호는 8자리 이상이어야 합니다') :
        
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
            <div class="login-form content">
            <div class='title'>
                <h2 class='Logintitle'>로그인</h2>
            </div>
            <fieldset class="box_login">
            <ul class="loginul">
                <li>
                    <div class="form-group">
                        <div class="custom_input label">
                            <input id="_id" placeholder="아이디" autocomplete="off" type="text" name="input_id" value={inputId} maxLength={20} onChange={handleInputId} />
                        </div>
                    </div>
                </li>
                <li>
                    <div class="form-group">
                        <div class="custom_input label">
                            <input id="_password" type="password" placeholder='비밀번호' name="input_pw" value={inputPw} minLength={8} onChange={handleInputPw}/>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary btn_mid" onClick={onClickLogin}>로그인</button>
                    </div>
                    <div class="box_join">
                        <a onClick={OnClickSignUp}>브링 업 ID 생성</a>
                    </div>
                </li>
            </ul>
            </fieldset>
            </div>
    );
}
