import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Sign(){
    const [inputName, setInputName] = useState('')
    const [inputBirth, setInputBirth] = useState('')
    const [inputNickname, setInputNickname] = useState('')
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [inputPwCheck, setInputPwCheck] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputEmailCheck, setInputEmailCheck] = useState('')
    const [inputAddress, setInputAddress] = useState('')
    const [inputAddressDetail, setInputAddressDetail] = useState('')
    const [inputRole, setInputRole] = useState('')
    const [showEmailCheck, setshowEmailCheck] = useState(false)
    const [inputPostAddress, setInputPostAddress] = useState('')

    //이메일과 이메일인증 버튼의 Disabled 속성 확인
    const [inputEmailDisabled, setInputEmailDisabled] = useState(false);
 
	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputName = (e) => {
        setInputName(e.target.value)
    }
    const handleInputBirth = (e) => {
        setInputBirth(e.target.value)
    }
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
    const handleInputPwCheck = (e) => {
        setInputPwCheck(e.target.value)
    }

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value)
    }

    const handleInputAddress = (e) => {
        setInputAddress(e.target.value)
    }

    const handleInputAddressDetail = (e) => {
        setInputAddressDetail(e.target.value)
    }
    const handleInputRole = (e) => {
        setInputRole(e.target.value)
    }
    const handleInputEmailCheck = (e) => {
        setInputEmailCheck(e.target.value)
    }
    const handleInputNickname = (e) => {
        setInputNickname(e.target.value)
    }
    const handleInputPostAddress = (e) => {
        setInputPostAddress(e.target.value)
    }

    // 아이디 체크 버튼 클릭 이벤트
    const OnClickIdCheck = () => {
        console.log(inputId)
    }

    // 닉네임 체크 버튼 클릭 이벤트
    const OnClickNicknameCheck = () => {
        console.log(inputNickname)
    }

    // 이메일 인증 버튼 클릭 이벤트
    const OnClickEmailSend = () => {
        //이메일과 이메일 인증버튼 비활성화
        setInputEmailDisabled(true);
        //이메일 인증 텍스트와 인증버튼 활성화
        setshowEmailCheck(true);
    }

    //인증번호 체크 버튼 클릭 이벤트
    const OnClickEmailCheck = () => {
        console.log(inputEmailCheck)

    }

    const OnClickAddress = () => {
        console.log(inputAddress)
    }

    // signup 버튼 클릭 이벤트
    const OnClickSignUp = () => {
        console.log(inputName, inputBirth, inputId, inputPw, inputPwCheck, inputEmail, inputAddress, inputAddressDetail, inputRole)
        if (inputPw !== inputPwCheck) {
            alert('비밀번호가 일치하지 않습니다.')
            return
        }else if(inputPw == inputPwCheck){
            alert('감사링')
            return
        }
        
    }
    const OnClickCancel = () => {
        document.location.href = "/";
    }
 
	// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        axios.get('/user_inform/login')
        .then(res => console.log(res))
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [])
    const style_inputbox ={
        width: '54%',
    };


    return (
        <div class="signup-form">
            <h2 class ='Logintitle'>회원가입</h2>
            <div class="form-group">
                <label htmlFor='input_id'>이름 : </label>
                <input type='text' name='input_name' maxLength={20} style={style_inputbox} value={inputName} onChange={handleInputName} />
                {inputName.length > 20 && (
                        <div style={{ color: 'red' }}>이름을 20글자 이내로 써주세요</div>
                    )}
            </div>
            <div class ='form-group'>
                <label htmlFor='input_date'>생년월일 : </label>
                <input type='date' name='input_birth' value={inputBirth} style={style_inputbox} onChange={handleInputBirth} />
            </div>
            <div class='form-group'>
                <label htmlFor='input_nickname'>닉네임 : </label>
                <input type='text' name='input_nickname' maxLength={8} value={inputNickname} onChange={handleInputNickname} />
                <button type="button" onClick={OnClickNicknameCheck}>중복확인</button>
                {inputNickname.length > 8 && (
                        <div style={{ color: 'red' }}>닉네임을 8글자 이내로 써주세요</div>
                    )}
            </div>
            <div class="form-group">
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id'maxLength={20} value={inputId} onChange={handleInputId} />
                <button type="button" onClick={OnClickIdCheck}>중복확인</button>
                {inputId.length > 20 && (
                        <div style={{ color: 'red' }}>아이디를 20글자 이내로 써주세요</div>
                    )}
            </div>
            <div class ="form-group">
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' minLength={8} style={style_inputbox} value={inputPw} onChange={handleInputPw} />
                {inputPw.length <= 8 && (
                        <div style={{ color: 'red' }}>패스워드를 8자 이상 써주세요</div>
                    )}
            </div>
            <div class ="form-group">
                <label htmlFor='input_pw'>PW확인 : </label>
                <input type='password' name='check_input_pw' style={style_inputbox} minLength={8} value={inputPwCheck} onChange={handleInputPwCheck} />
            </div>

            <div class="form-group">
                <label htmlFor='input_email'>Email : </label>
                <input type='email' name='input_email' value={inputEmail} onChange={handleInputEmail} disabled={inputEmailDisabled}/>
                <button type="button" onClick={OnClickEmailSend} disabled={inputEmailDisabled}>인증번호 전송</button>
            </div>
            {showEmailCheck && <div class = "form-group">
                <label htmlFor='input_email'>인증번호 : </label>
                <input type='text' name='input_email_check' value={inputEmailCheck} onChange={handleInputEmailCheck}/>
                <button type="button" onClick={OnClickEmailCheck}>인증번호 확인</button>
            </div>}
            <div class="form-group">
                <label htmlFor='input_address'>주소 : </label>
                <input type='text' name='input_address' value={inputAddress} onChange={handleInputAddress} readOnly/>
                <button type="button" onClick={OnClickAddress}>주소검색</button>
            </div>
            <div class="form-group">
                <label htmlFor='input_postaddress'>우편번호 : </label>
                <input type='text' name='input_postaddress' value={inputPostAddress} style={style_inputbox} onChange={handleInputPostAddress} readOnly/>
            </div>
            <div class="form-group">
                <label htmlFor='input_address_D'>상세주소 : </label>
                <input type='text' name='input_address_D' style={style_inputbox} value={inputAddressDetail} onChange={handleInputAddressDetail}/>
            </div>

            <div class="sign-button">
                <input type='radio' name='input_role' value='uesr'  onChange={handleInputRole} />사용자
                <input type='radio' name='input_role' value='depeloper' onChange={handleInputRole} />공급자
            </div>


            <div class="form-group">
                <button type="button" onClick={OnClickSignUp}>회원가입</button>
                <button type='buuton' onClick={OnClickCancel}>취소</button>
            </div>
        </div>
    );
}