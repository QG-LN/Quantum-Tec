import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { isDisabled } from '@testing-library/user-event/dist/utils';

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
    const [inputRole, setInputRole] = useState('user');    // 기본 설정이 user
    const [inputGender, setInputGender] = useState('m'); // 기본 설정이 men
    const [showEmailCheck, setshowEmailCheck] = useState(false)
    const [inputPostAddress, setInputPostAddress] = useState('')
    const [isNickDiabled, setIsNickDisabled] = useState(false);
    const [isIdDisabled, setIsIdDisabled] = useState(false);
    let [isNickCheck, setIsNickCheck] =useState(false);
    let [isIdCheck ,setIsIDCheck]= useState(false);
    let isCheckEmailAuth = false;

    //이메일과 이메일인증 버튼의 Disabled 속성 확인
    const [inputEmailDisabled, setInputEmailDisabled] = useState(false);
    // 인증번호와 확인 버튼의 Disabled 속성 확인
    const [isEmailAuthDisabled, setIsEmailAuthDisabled] = useState(false);
 
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
    const handleInputGender = (e) => {
        setInputGender(e.target.value)
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

    /**
     * 서버와 데이터 통신을 진행하고 결과 데이터를 반환 받는 함수
     * @param path 데이터를 전송할 서버의 주소
     * @param body 전송할 데이터의 body JSON
     * @param methodType 전송할 메소드 타입
     * @return data 중복여부에따라 true/false 값이 미존재시 false반환
     */
    async function checkData(path, body , methodType){
        try {
            const response = await fetch(path, {
                method: methodType,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            // response 객체가 반환될때까지 기다린후 데이터가 전달되면 json 데이터를 반환
            const data = await response.json();             

            // 반환값이 중복일 경우 true, 중복이 아닐 경우 false 이므로 !data로 반환
            // 서버에서 받은 값이 없을 경우 false 반환
            if (data !== null && data !== undefined) {
                return !data;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // 아이디 체크 버튼 클릭 이벤트
    const OnClickIdCheck = async () => {
        if(inputId.length > 20){
            alert('아이디를 20글자 이내로 써주세요');
            console.log(inputId);
            return
        }
        else if(inputId === ''){
            alert('아이디를 입력해주세요');
            return
        } else{
            const path ='http://localhost:9090/user/signup/checkid';
            const body = { userID: inputId,};
            const data = await checkData(path, body, 'POST');
            if(data){
                alert('사용 가능한 아이디입니다.');
                setIsIDCheck(true);
            }else{
                alert('사용 불가능한 아이디입니다.');
                setInputId("");
                setIsIDCheck(false);
            }
        }

    }

    // 닉네임 체크 버튼 클릭 이벤트
    const OnClickNicknameCheck = async () => {
        if(inputNickname.length > 8){
            alert('닉네임을 8글자 이내로 써주세요');
            return
        }
        else if(inputNickname.length < 2){
            alert('닉네임을 2글자 이상으로 써주세요');
            return
        }
        else if(inputNickname ===''){
            alert('닉네임을 입력해주세요');
            return
        } else{
            const path = 'http://localhost:9090/user/signup/checknickname';
            const body = { userNickname: inputNickname };
            const data = await checkData(path, body, 'POST');
            if(data){
                alert('사용 가능한 닉네임입니다.');
                setIsNickCheck(true);
            }else{
                alert('사용 불가능한 닉네임입니다.');
                setInputNickname("");
                setIsNickCheck(false);
            }
        }
    }
    //이메일 형식 확인
    const isEmail = (inputEmail) => {
        return /^\w+@\w+.\w{2,3}(\.\w{2,3})?$/.test(inputEmail);
    };

    // 이메일 인증 버튼 클릭 이벤트
    const OnClickEmailSend = async () => {
        // 이메일 형식을 만족할 경우
        if(isEmail(inputEmail)){
            const path = 'http://localhost:9090/user/signup/send-email-auth';

            // 이메일 인증번호 전송버튼 클릭 시 이메일 중복여부도 체크
            await fetch(path,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    userEmail: inputEmail,
                })
            })
                .then(response => response.json())
                .then(data =>{
                    if(data === 1){
                        alert('이메일 중복되어 있습니다.');          // 이메일 중복 알림 표시
                        setInputEmail("");                  // 이메일 입력부분을 초기화
                    }else{
                        alert('인증번호가 전송되어 있습니다.');      // 인증번호 전송 여부 알림

                        setInputEmailDisabled(true);       // 성공적인 이메일 전송 시 버튼과 이메일 입력란 비활성화
                        setshowEmailCheck(true);            // 인증번호 입력란과 인증번호 확인 버튼 활성화 상태로 변경
                    }
                })
                .catch(err =>{
                    console.log(err);
                })
        }
        else{
            alert('이메일 형식이 올바르지 않습니다.');
        }
    }

    //인증번호 체크 버튼 클릭 이벤트
    const OnClickEmailCheck = async () => {
        console.log(inputEmailCheck)
        const path = 'http://localhost:9090/user/signup/check-email-auth';
        const body = { key : inputEmailCheck}
        const data = await checkData(path,body,'POST');
        // 성공적으로 전달될 경우 값이 true로 반환되지만 checkData에서 boolean값을 부정하여 역으로 주었기에 여기서 한번더 수행
        if(!data){
            isCheckEmailAuth = true;
            alert("인증이 완료되었습니다.");

            setIsEmailAuthDisabled(true);       // 인증번호 입력란과 인증번호 확인 버튼 비활성화

        }else{
            alert("인증에 실패하였습니다.");
        }

    }
    // 주소 검색 버튼 클릭 이벤트
    const OnClickAddress = () => {
        console.log(inputAddress)
        // 임시 세팅
        setInputAddress("Earth");
        setInputAddressDetail("Korea");
        setInputPostAddress("00000");
    }

    // signup 버튼 클릭 이벤트
    const OnClickSignUp = async () => {

        console.log(inputName, inputBirth, inputId, inputPw, inputPwCheck, inputGender,inputEmail, inputAddress, inputAddressDetail, inputRole)
        console.log(isNickCheck , isIdCheck);
        // 닉네임 체크
       if(isNickCheck === false){
            alert('닉네임 중복확인을 해주세요');
            return
        // 아이디 체크
        }else if(isIdCheck === false){
            alert('아이디 중복확인을 해주세요');
            return
        // 비밀번호 체크
        }else if(inputPw !== inputPwCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            return
        // 비밀번호 2차 체크
        }else if(inputPw.length < 8){
            alert('비밀번호를 8글자 이상으로 써주세요');
            return
        // 이름 체크
        }else if(inputName === '') {
            alert('이름을 입력해주세요');
            return
        // 이름 최소 길이 확인
        }else if(inputName.length < 2){
            alert('이름을 2글자 이상으로 써주세요');
            return
        //전체 체크 후 성공시 정보를 서버로 전송
        }else if(inputPw === inputPwCheck && inputName.length <= 20 && inputId.length <= 20 && inputPw.length >= 8 && isNickCheck === true && isIdCheck === true){
            const path = 'http://localhost:9090/user/signup';
            const body = {
                userID: inputId,
                userPW : inputPw,
                userNickname: inputNickname,
                userName: inputName,
                userBirth: inputBirth,
                userEmail: inputEmail,
                userAddress: inputAddress,
                userAddressDetail : inputAddressDetail,
                userPostal : inputPostAddress,
                userRole: inputRole,
                userGender : inputGender,
            };
            const data = await checkData(path,body,'POST');
            if(data !== null){
                console.log(data);
                alert('회원가입이 완료되었습니다.');
                document.location.href='/login';
            }else{
                alert('회원가입에 실패하였습니다.');
            }
            return
        }
        
    }
    const OnClickCancel = () => {
        // 취소 버튼 클릭시 메인 페이지로 이동
        document.location.href = "/";
    }
 
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
        <div class="signup-form w-[35%]">
            <h2 class ='Logintitle mt-[20px] nondrag'>회원가입</h2>
            
            <div class='form-group row'>
                <div class= 'col-3'>
                    <label htmlFor='input_nickname'>닉네임 : </label>
                </div>
                <div class= 'col-9'>
                    <div className='flex'>
                    <input style={style_inputbox} className='border' type='text' name='input_nickname' maxLength={8} value={inputNickname} onChange={handleInputNickname} />
                    <button type="button" class='nondrag' onClick={OnClickNicknameCheck} disabled={isNickDiabled}>중복확인</button>
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
                    <button type="button" class='nondrag' disabled={isIdDisabled}  onClick={OnClickIdCheck}>중복확인</button>
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
                        <input className='mr-4 ml-4' type='radio' name='input_gender' value='m' onChange={handleInputGender} checked/>남자
                    </div>
                    <div  className='w-36 text-center'>
                        <input className='mr-4 ml-4' type='radio' name='input_gender' value='f' onChange={handleInputGender} />여자
                    </div>
                    <div  className='w-36 text-left' >
                            <input className='mr-4 ml-4' type='radio' name='input_gender' value='p' onChange={handleInputGender} />비공개
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
                    <input type='email'className='border' name='input_email' value={inputEmail}
                           placeholder='example@google.com' style={style_inputbox}
                           onChange={handleInputEmail} disabled={inputEmailDisabled}/>
                    <button type="button" class='nondrag' onClick={OnClickEmailSend} disabled={inputEmailDisabled}>인증번호 전송</button>
                </div>
            </div>
            {showEmailCheck && <div class = "form-group row">
                <div class='col-3'>
                    <label htmlFor='input_email'>인증번호 : </label>
                </div>
                <div className='flex w-75'>
                    <input type='text' className='border' name='input_email_check' value={inputEmailCheck} style={style_inputbox}
                           onChange={handleInputEmailCheck} disabled={isEmailAuthDisabled}/>
                    <button type="button" class='nondrag' onClick={OnClickEmailCheck}
                            disabled={isEmailAuthDisabled}>
                        인증번호 확인
                    </button>
                </div>
            </div>}
            <div class="form-group row">
                <div class='col-3'>
                    <label htmlFor='input_address'>주소 : </label>
                </div>
                <div className='flex w-75'>
                    <input type='text' className='border' name='input_address' value={inputAddress} style={style_inputbox} onChange={handleInputAddress} readOnly/>
                    <button type="button" class='nondrag' onClick={OnClickAddress}>주소검색</button>
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
                    <button type="button" class='nondrag' style={bottomBtn} onClick={OnClickSignUp}>회원가입</button>
                </div>
                <div class='col-6'>
                    <button type='button' class='nondrag' style={bottomBtn} onClick={OnClickCancel}>취소</button>
                </div>
            </div>
        </div>
    );
}