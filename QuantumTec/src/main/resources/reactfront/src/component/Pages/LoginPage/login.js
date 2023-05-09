import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login(){
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 
	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log({inputId, inputPw})
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
        <div class="py-5 mt-5">
            <h2>Login</h2>
            <div class="py-3">
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div class ="py-1">
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div class="py-3">
                <button type='button' onClick={onClickLogin}>Login</button>
                <button type="button" onClick={OnClickSignUp}>SignUp</button>
            </div>
        </div>
    );
}
