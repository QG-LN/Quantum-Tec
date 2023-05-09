import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Sign(){
    const [inputName, setInputName] = useState('')
    const [inputBirth, setInputBirth] = useState('')
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [inputPwCheack, setInputPwCheack] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputAddress, setInputAddress] = useState('')
    const [inputAddressDetail, setInputAddressDetail] = useState('')
    const [inputRole, setInputRole] = useState('')

 
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
        setInputPwCheack(e.target.value)
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

 
	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log('click login')
    }
    
    // signup 버튼 클릭 이벤트
    const OnClickSignUp = () => {
        console.log(inputName, inputBirth, inputId, inputPw, inputPwCheack, inputEmail, inputAddress, inputAddressDetail, inputRole)
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
            <h2>회원가입</h2>
            <div class="py-3">
                <label htmlFor='input_id'>이름 : </label>
                <input type='text' name='input_name' maxlength="10" value={inputName} onChange={handleInputName} />
            </div>
            <div class ='py-3'>
                <label htmlFor='input_date'>생년월일 : </label>
                <input type='date' name='input_birth' value={inputBirth} onChange={handleInputBirth} />
            </div>
            <div class="py-1">
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id'maxlength="10" value={inputId} onChange={handleInputId} />
            </div>
            <div class ="py-1">
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div class ="py-1">
                <label htmlFor='input_pw'>PW확인 : </label>
                <input type='password' name='check_input_pw' value={inputPwCheack} onChange={handleInputPwCheck} />
            </div>
            <div class="py-1">
                <label htmlFor='input_email'>Email : </label>
                <input type='email' name='input_email' value={inputEmail} onChange={handleInputEmail} />
            </div>
            <div class="py-1">
                <label htmlFor='input_address'>주소 : </label>
                <input type='text' name='input_address' value={inputAddress} onChange={handleInputAddress}/>
            </div>
            <div class="py-1">
                <label htmlFor='input_address_D'>상세주소 : </label>
                <input type='text' name='input_address_D' value={inputAddressDetail} onChange={handleInputAddressDetail}/>
            </div>

            <div class="py-1">
                <input type='radio' name='input_role' value='depeloper' onChange={handleInputRole} />공급자
                <input type='radio' name='input_role' value='uesr'  onChange={handleInputRole} />사용자
            </div>


            <div class="py-1">
                <button type="button" onClick={OnClickSignUp}>SignUp</button>
            </div>
        </div>
    );
}