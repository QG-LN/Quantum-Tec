import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login(props){
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
        if(inputId ===''){
            alert('아이디를 입력해주세요');
        }else if(inputPw === ''){
            alert('비밀번호를 입력해주세요');
        }else if(inputPw < 8 ){
            alert('비밀번호는 8자리 이상이어야 합니다');
        }else{
            // 아이디와 비밀번호를 /user/login에 전달
            fetch('http://localhost:9090/user/login',{
                method: 'POST',
                headers: {                                              //  Json형식으로 전달하겠다는 선언
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({                          // back단에 JSON형식으로 데이터 전달
                    userID: inputId,
                    userPW: inputPw,
                }),
            })
                .then(res => res.json())
                .then(data  =>{
                    // 값이 만약 존재할 경우 로컬 스토리지에 유저닉네임과 유저 캐시를 저장
                    // 로그인을 true로 변경
                    // 현재 페이지 위치를 메인페이지로 이동
                    if(data !== undefined && data !== null){
                        localStorage.setItem("userNickname", data.userNickname);
                        localStorage.setItem("userCash", data.userCash);
                        localStorage.setItem("userID", inputId);                    // 마이페이지에서 사용하기 위해 세팅
                        props.setTruelogin(true);
                    }
                })
                .catch(err => {
                    // 로그인 오류 발생 시 오류 구문을 출력하고, ID/PW의 값을 초기화
                    alert('로그인에 실패하였습니다.');
                    setInputId("");
                    setInputPw("");
                    console.log(err);
                });

        }
    }

    // props.start가 true 즉, props.setTruelogin(true);값이 적용이 완료되었을 경우
    useEffect(() => {
        if(props.start){
            localStorage.setItem("truelogin","true");
            document.location.href = "/";
        }
    }, [props.start]);

    // signup 버튼 클릭 이벤트
    const OnClickSignUp = () => {
        document.location.href = "/signup";
    }
 
	// 페이지 렌더링 후 가장 처음 호출되는 함수
    // useEffect(() => {
    //     axios.post('/user/login')
    //     .then(res => console.log(res))
    //     .catch()
    // },
    // // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    // [])
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
