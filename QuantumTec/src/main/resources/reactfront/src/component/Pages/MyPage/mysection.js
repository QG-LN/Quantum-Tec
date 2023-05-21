import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { isDisabled } from '@testing-library/user-event/dist/utils';

export default function Mysection(){

    // 값 불러올 때에는 useState에 입력하면 됨
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
    const [inputGender, setInputGender] = useState('men');
    const [showEmailCheck, setshowEmailCheck] = useState(false)
    const [inputPostAddress, setInputPostAddress] = useState('')
    const [isNickDiabled, setIsNickDisabled] = useState(false);
    const [isIdDisabled, setIsIdDisabled] = useState(false);
    let [isNickCheck] = useState(false);
    let [isIdCheck] = useState(false);

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
        setIsIdDisabled(inputId.length > 20);
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
        setIsNickDisabled(inputName.length > 8);
    }
    const handleInputPostAddress = (e) => {
        setInputPostAddress(e.target.value)
    }
    const handleInputGender = (e) => {
        setInputGender(e.target.value)
    }

    // 아이디 체크 버튼 클릭 이벤트
    const OnClickIdCheck = () => {
        //아이디 글자수 확인
        if(inputId.length > 20){
            alert('아이디를 20글자 이내로 써주세요');
            console.log(inputId);
            return
        }
        //아이디 빈공간 확인
        else if(inputId === ''){
            alert('아이디를 입력해주세요');
            return
        //없을시 사용가능한 아이디 표시
        } else{isIdCheck = true;
            alert('사용 가능한 아이디입니다.');}
        // console.log(inputId)
        // console.log(isIdCheck);
    }

    // 닉네임 체크 버튼 클릭 이벤트
    const OnClickNicknameCheck = () => {
        //닉네임 글자수 확인
        if(inputNickname.length > 8){
            alert('닉네임을 8글자 이내로 써주세요');
            return
        }
        //닉네임 빈공간 확인
        else if(inputNickname ===''){
            alert('닉네임을 입력해주세요');
            return
        //없을시 사용가능한 닉네임 표시
        } else{isNickCheck = true; 
            alert('사용 가능한 닉네임입니다.');}
    }
    //이메일 형식 확인
    const isEmail = (inputEmail) => {
        return /^\w+@\w+.\w{2,3}$/.test(inputEmail);
        };

    // 이메일 인증 버튼 클릭 이벤트
    const OnClickEmailSend = () => {
        if(isEmail(inputEmail)=== true){
        setInputEmailDisabled(true);
        //이메일 인증 텍스트와 인증버튼 활성화
        setshowEmailCheck(true);
        }
        else{
            alert('이메일 형식이 올바르지 않습니다.');
        }
    }

    //인증번호 체크 버튼 클릭 이벤트
    const OnClickEmailCheck = () => {
        console.log(inputEmailCheck)

    }

    // 주소 검색 버튼 클릭 이벤트
    const OnClickAddress = () => {
        console.log(inputAddress)
    }

    // signup 버튼 클릭 이벤트
    const OnClickSave = () => {
        console.log(inputName, inputBirth, inputId, inputPw, inputPwCheck, inputEmail, inputAddress, inputAddressDetail, inputRole)
        if(inputName.length > 20){
            alert('이름을 20글자 이내로 써주세요');
            return
        }
        else if (inputPw !== inputPwCheck) {
            alert('비밀번호가 일치하지 않습니다.')
            return
        }else if(inputPw.length < 8){
            alert('비밀번호를 8글자 이상으로 써주세요');
            return
        }else if(inputPw === inputPwCheck && inputName.length <= 20 && inputId.length <= 20 && inputPw.length >= 8 && isNickCheck === true && isIdCheck === true){
            alert('회원 정보가 수정되었습니다.')
            return
        }
        
    }

    //취소 버튼 누를시 마이페이지로 이동
    const OnClickCancel = () => {
        document.location.href = "/mypage";
    }
 
	// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        axios.get('/user_inform/login')
        .then(res => console.log(res))
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [])

    //css부분 옮길 예정
    const style_inputbox ={
        width: '55%',
    };
    const style_inputbox_2={
        width: '86%',
    }

    const bottomBtn = {
        width: '60%',
        fontSize: '1.2rem',
    }


    return (
        <div class="signup-form container mypagestyle float-right w-mypagesection max-w-[880px] relative min-w-[700px]">
            <h2 class='account_main_page_title '>회원 정보 수정</h2>
            
            <div class='form-group row'>
                <div class= 'col-3'>
                    <label htmlFor='input_nickname'>닉네임 : </label>
                </div>
                <div class= 'col-9'>
                    <div className='flex'>
                    <input style={style_inputbox} className='border' type='text' name='input_nickname' maxLength={8} value={inputNickname} onChange={handleInputNickname} />
                    <button type="button" onClick={OnClickNicknameCheck} disabled={isNickDiabled}>중복확인</button>
                    </div>
                    <div class = 'infotxt'>8자 이내로 적어주세요.</div>
                    {inputNickname.length > 8 && (
                          <div style={{ color: 'red' }}>닉네임을 8글자 이내로 써주세요</div>
                     )}
                </div>
            </div>
            <div class="form-group row">
                <div class='col-3'>
                    <label htmlFor='input_id'>ID : </label>
                </div>
                <div class='col-9'>
                    <div className='flex'>
                    <input style={style_inputbox} className='border' type='text' name='input_id'maxLength={20} value={inputId} onChange={handleInputId} />
                    <button type="button" disabled={isIdDisabled}  onClick={OnClickIdCheck}>중복확인</button>
                    </div>
                    <div class = 'infotxt'>20자 이내로 적어주세요.</div>
                    {inputId.length > 20 && (
                            <div style={{ color: 'red' }}>아이디를 20글자 이내로 써주세요</div>

                        )}
                </div>
            </div>
            <div class ="form-group row">
                <div class= 'col-3'>
                    <label htmlFor='input_pw'>PW : </label>
                </div>
                <div class= 'col-9'>
                    <input type='password' className='border' name='input_pw' minLength={8} style={style_inputbox_2} value={inputPw} onChange={handleInputPw} />
                    <div class = 'infotxt'>특수문자 + 영문자 + 숫자로 구성된 8자 이상으로 써주세요.</div>
                    {/* {inputPw.length <= 8 && (
                            <div style={{ color: 'red' }}>패스워드를 8자 이상 써주세요</div>
                        )} */}
                </div>
            </div>
            <div class ="form-group row">
                <div class= 'col-3'>
                    <label htmlFor='input_pw'>PW확인 : </label>
                </div>
                <div class= 'col-9'>
                    <input type='password' className='border' name='check_input_pw' style={style_inputbox_2} minLength={8} value={inputPwCheck} onChange={handleInputPwCheck} />
                </div>
            </div>
            <div class="form-group row">
                <div class= 'col-3'>
                    <label htmlFor='input_id'>이름 : </label>
                </div>
                <div class= 'col-9'>
                <input type='text' className='border' name='input_name' minLength={2} maxLength={20} style={style_inputbox_2} value={inputName} onChange={handleInputName} />
                <div class = 'infotxt'>20자 이내로 적어주세요.</div>
                {inputName.length > 20 && (
                        <div style={{ color: 'red' }}>이름을 20글자 이내로 써주세요</div>
                    )}
                </div>
            </div>
            <div className="mb-1 flex justify-center form-group row">
                <div class='col-3'>
                    <label htmlFor='input_gender'>성별 : </label>
                </div>
                <div class='col-9 flex'>
                    <div  className='w-36 text-right' >
                        <input className='mr-4 ml-4' type='radio' name='input_gender' value='male' onChange={handleInputGender} checked/>남자
                    </div>
                    <div  className='w-36 text-center'>
                        <input className='mr-4 ml-4' type='radio' name='input_gender' value='famale' onChange={handleInputGender} />여자
                    </div>
                    <div  className='w-36 text-left' >
                            <input className='mr-4 ml-4' type='radio' name='input_gender' value='default' onChange={handleInputGender} />비공개
                    </div>
                </div>
            </div>
            <div class ='form-group row'>
                <div class= 'col-3'>
                    <label htmlFor='input_date'>생년월일 : </label>
                </div>
                <div class= 'col-9'>
                    <input type='date' className='border' name='input_birth' value={inputBirth} style={style_inputbox_2} onChange={handleInputBirth} />
                </div>
            </div>
            <div class="form-group row">
                <div class='col-3'>
                    <label htmlFor='input_email'>Email : </label>
                </div>
                <div class='col-9-button'>
                    <input type='email'className='border' name='input_email' value={inputEmail} placeholder='example@google.com' style={style_inputbox} onChange={handleInputEmail} disabled={inputEmailDisabled}/>
                    <button type="button" onClick={OnClickEmailSend} disabled={inputEmailDisabled}>인증번호 전송</button>
                </div>
            </div>
            {showEmailCheck && <div class = "form-group row">
                <div class='col-3'>
                    <label htmlFor='input_email'>인증번호 : </label>
                </div>
                <div className='flex w-75'>
                    <input type='text' className='border' name='input_email_check' value={inputEmailCheck} style={style_inputbox} onChange={handleInputEmailCheck}/>
                    <button type="button" onClick={OnClickEmailCheck}>인증번호 확인</button>
                </div>
            </div>}
            <div class="form-group row">
                <div class='col-3'>
                    <label htmlFor='input_address'>주소 : </label>
                </div>
                <div className='flex w-75'>
                    <input type='text' className='border' name='input_address' value={inputAddress} style={style_inputbox} onChange={handleInputAddress} readOnly/>
                    <button type="button" onClick={OnClickAddress}>주소검색</button>
                </div>
            </div>
            <div class="form-group row">
                <div class='col-3'>
                    <label htmlFor='input_postaddress'>우편번호 : </label>
                </div>
                <div class='col-9'>
                    <input type='text' className='border' name='input_postaddress' value={inputPostAddress} style={style_inputbox_2} onChange={handleInputPostAddress} readOnly/>
                </div>
            </div>
            <div class="form-group row">
                <div class='col-3'>
                    <label htmlFor='input_address_D'>상세주소 : </label>
                </div>
                <div class='col-9'>
                    <input type='text' className='border' name='input_address_D' style={style_inputbox_2} value={inputAddressDetail} onChange={handleInputAddressDetail}/>
                </div>
            </div>

            <div class="sign-button mb-2 row">
                <div class='col-6' style={{textAlign:'right'}} >
                    <input type='radio' name='input_role' value='user' onChange={handleInputRole} checked/>사용자
                </div>
                <div class='col-6' style={{textAlign:'left'}}>
                    <input type='radio' name='input_role' value='developer' onChange={handleInputRole} />공급자
                </div>
            </div>

            <div class="form-group row">
                <div class='col-6'>
                    <button type="button" style={bottomBtn} onClick={OnClickSave}>저장</button>
                </div>
                <div class='col-6'>
                    <button type='button' style={bottomBtn} onClick={OnClickCancel}>취소</button>
                </div>
            </div>
        </div>
    );
}