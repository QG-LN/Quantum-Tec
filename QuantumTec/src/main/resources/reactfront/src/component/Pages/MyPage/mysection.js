import React, { useState, useEffect } from 'react';
import {axiosRequest} from '../../Utils/networkUtils';
import MySectionInfo from "./MySectionInfo";
import axios from 'axios';
import AddressModal from "../LoginPage/AddressModal";
import { useNavigate } from 'react-router';

export default function Mysection(props){
    // 값 불러올 때에는 useState에 입력하면 됨
    const [inputName, setInputName] = useState('');                             // 사용자 이름
    const [inputBirth, setInputBirth] = useState('');                           // 사용자 생일
    const [inputNickname, setInputNickname] = useState('');                     // 사용자 닉네임
    const [inputId, setInputId] = useState('')                                  // 사용자 아이디
    const [inputPw, setInputPw] = useState('')                                  // 사용자 비밀번호
    const [inputPwCheck, setInputPwCheck] = useState('')                        // 사용자 비밀번호 체크
    const [inputEmail, setInputEmail] = useState('')                            // 사용자 이메일
    const [inputEmailCheck, setInputEmailCheck] = useState('')                  // 사용자 이메일 인증번호
    const [inputAddress, setInputAddress] = useState('')                        // 사용자 주소
    const [inputAddressDetail, setInputAddressDetail] = useState('')            // 사용자 상세주소
    const [inputRole, setInputRole] = useState('user')                          // 사용자 역할
    const [inputGender, setInputGender] = useState('m');                        // 사용자 성별
    const [showEmailCheck, setshowEmailCheck] = useState(false)                 // 이메일 인증번호 입력란 표시여부
    const [inputPostAddress, setInputPostAddress] = useState('')                // 사용자 우편 번호

    // 닉네임 변경이 없으면 중복체크를 하지 않도록 하는 state
    const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true);      // 사용자 닉네임 체크여부

    //이메일과 이메일인증 버튼의 Disabled 속성 확인
    const [inputEmailDisabled, setInputEmailDisabled] = useState(false);       // 이메일 Disabled 속성 확인
    const [isBtnEmailDisabled, setIsBtnEmailDisabled] = useState(true);        // 인증번호 버튼 Disabled 속성 확인

    // 인증번호와 확인 버튼의 Disabled 속성 확인
    const [isEmailAuthDisabled, setIsEmailAuthDisabled] = useState(true);

    // 주소 검색
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 입력한 정보를 다시한번 보여주도록 하는 창을 띄우는 state
    const [modalOpen, setModalOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({
        inputName: '',
        inputBirth: '',
        inputNickname: '',
        inputId: '',
        inputEmail: '',
        inputAddress: '',
        inputAddressDetail: '',
        inputRole: '',
        inputGender: '',
        inputPostAddress: '',
    });
    const [sendOk, setSendOk] = useState(false);      // 수정을 위해 정보를 보내는지 확인하는 state

    const navigate = useNavigate();

    // 처음 로드 시 부모로부터 받은 데이터를 세팅
    const data = props.userData;
    useEffect(()=>{
        // 로그인 되어 있는 유저의 정보를 불러와 각 입력란에 입력
        if(data != null){
            setInputNickname(data.userNickname);
            setInputId(data.userID);
            setInputName(data.userName);
            setInputGender(data.userGender);
            setInputBirth(data.userBirth);
            setInputEmail(data.userEmail);
            setInputAddress(data.userAddress);
            setInputPostAddress(data.userPostal);
            setInputAddressDetail(data.userAddressDetail);
            setInputRole(data.userRole);
        }
    },[]);

	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputBirth = (e) => {
        setInputBirth(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
    const handleInputPwCheck = (e) => {
        setInputPwCheck(e.target.value)
    }

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
        
        // 인증번호 전송 버튼 활성화
        setIsBtnEmailDisabled(false);

        // 이메일 인증번호 입력 확인 버튼 활성화
        setIsEmailAuthDisabled(false);
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
        setIsNicknameDuplicate(inputName.length > 8);
    }
    const handleInputPostAddress = (e) => {
        setInputPostAddress(e.target.value)
    }
    const handleInputGender = (e) => {
        setInputGender(e.target.value)
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
        } else{
            setIsNicknameDuplicate(true);
            alert('사용 가능한 닉네임입니다.');
        }
    }
    //이메일 형식 확인
    const isEmail = (inputEmail) => {
        return /^\w+@\w+.\w{2,3}$/.test(inputEmail);
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
                        setIsBtnEmailDisabled(true);
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
        const path = 'http://localhost:9090/user/signup/check-email-auth';
        const body = { key : inputEmailCheck}

        axios.post(path, body)
            .then(function (res) {
                if(res.data){
                    alert("인증이 완료되었습니다.");
                    setIsEmailAuthDisabled(true);       // 인증번호 입력란과 인증번호 확인 버튼 비활성화
                    setIsBtnEmailDisabled(true);
                }else{
                    alert("인증에 실패하였습니다.");
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("인증에 실패하였습니다.");
            });
    }

    // 주소 검색 버튼 클릭 이벤트
    const OnClickAddress = () => {
        // 주소 검색 창 출력
        setIsModalOpen(true);
    }

    /**
     * 저장버튼 클릭 시 회원정보를 확인 하고 UserInfo에 저장하고 모달창을 열기
     * @return {Promise<void>}
     */
    const OnClickSave = async () => {
        const path = 'user/myinfo';
        const body = {
            userID: localStorage.getItem('userID'),
            userPW: inputPw,
        };
        // 기존 비밀번호와 일치하는지 확인을 위한 비동기 통신
        const pwdata = await axiosRequest(path,body,'POST','json');

        if (inputPw !== inputPwCheck) {
            alert('비밀번호가 일치하지 않습니다.')
            return
        }else if(inputPw.length < 8){
            alert('비밀번호를 8글자 이상으로 써주세요');
            return
        }else if(pwdata != ''){                                                 // 기존 비밀번호와 일치하는지 확인
            alert('기존 비밀번호와 일치합니다.');
            setInputPw('');
            setInputPwCheck('');
            return
        } else if (!isEmailAuthDisabled) {
            alert('이메일 인증을 해주세요');
        } else if(isNicknameDuplicate !== true){
            alert('닉네임 중복확인을 해주세요');
            return
        }else{
            setUserInfo({
                inputId: inputId,
                inputName: inputName,
                inputNickname: inputNickname,
                inputEmail: inputEmail,
                inputAddress: inputAddress,
                inputAddressDetail: inputAddressDetail,
                inputPostAddress: inputPostAddress,
                inputRole: inputRole,
                inputGender: inputGender
            })
            if(modalOpen) setModalOpen(false);
            else setModalOpen(true);
        }
        
    }

    /**
     * 모달창에서 저장버튼 클릭 시 수정된 회원 정보를 서버에 전달하고 수정여부를 전달
     */
    useEffect( () => {
        if (sendOk) {
            const path = 'user/update';
            const body = {
                userID           : inputId,
                userPW           : inputPw,
                userNickname     : inputNickname,
                userName         : inputName,
                userBirth        : inputBirth,
                userEmail        : inputEmail,
                userAddress      : inputAddress,
                userAddressDetail: inputAddressDetail,
                userPostal       : inputPostAddress,
                userRole         : inputRole,
                userGender       : inputGender
            };
            async function checkSaveData(){
                try{
                    const checkSave = await axiosRequest(path, body, 'put', 'boolean');
                    if (checkSave != null) {
                        if (checkSave) {
                            alert('회원 정보가 수정되었습니다.');
                            navigate('/mypage');
                        } else {
                            alert('회원정보 수정에 실패하였습니다.');
                            setInputPw('');
                            setInputPwCheck('');
                        }
                    } else {
                        // 서버와 연결실패/데이터 전송 실패등 오류 발생시
                        alert('회원정보 수정에 실패하였습니다.');
                        setInputPw('');
                        setInputPwCheck('');
                    }
                }catch (e){

                }
            }
            checkSaveData();

        }else{
            return
        }
    },[sendOk]);

    //취소 버튼 누를시 마이페이지로 이동
    const OnClickCancel = () => {
        navigate('/mypage');
    }

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
            <div class='form-group row mt-4'>
                <div class= 'col-3'>
                    <label htmlFor='input_nickname'>닉네임 : </label>
                </div>
                <div class= 'col-9'>
                    <div className='flex'>
                    <input style={style_inputbox} className='border' type='text' name='input_nickname' maxLength={8} value={inputNickname} onChange={handleInputNickname} />
                    <button type="button" onClick={OnClickNicknameCheck} disabled={isNicknameDuplicate}>중복확인</button>
                    </div>
                    <div class = 'infotxt mt-2 ml-2'> * 8자 이내로 적어주세요.</div>
                    {inputNickname.length > 8 && (
                          <div style={{ color: 'red' }} class="mt-2 ml-2"> * 닉네임을 8글자 이내로 써주세요</div>
                     )}
                </div>
            </div>
            <div class="form-group row">
                <div class='col-3'>
                    <label htmlFor='input_id'>ID : </label>
                </div>
                <div class='col-9'>
                    <label>{inputId}</label>
                </div>
            </div>
            <div class ="form-group row">
                <div class= 'col-3'>
                    <label htmlFor='input_pw'>PW : </label>
                </div>
                <div class= 'col-9'>
                    <input type='password' className='border' name='input_pw' minLength={8} style={style_inputbox_2} value={inputPw} onChange={handleInputPw} />
                    <div class = 'infotxt mt-2 ml-2'> * 특수문자 + 영문자 + 숫자로 구성된 8자 이상으로 써주세요.</div>
                     {/*{inputPw.length <= 8 && (*/}
                     {/*       <div style={{ color: 'red' }} class="mt-2 ml-2">*/}
                     {/*           패스워드를 8자 이상 써주세요*/}
                     {/*       </div>*/}
                     {/*   )}*/}
                </div>
            </div>
            <div class ="form-group row">
                <div class= 'col-3'>
                    <label htmlFor='input_pw'>PW확인 : </label>
                </div>
                <div class= 'col-9'>
                    <input type='password' className='border' name='check_input_pw' style={style_inputbox_2} minLength={8} value={inputPwCheck} onChange={handleInputPwCheck} />
                    <div className='infotxt mt-2 ml-2'>
                        * 비밀번호와 동일하게 입력해주세요.
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class= 'col-3'>
                    <label htmlFor='input_id'>이름 : </label>
                </div>
                <div class= 'col-9'>
                    <label>{inputName}</label>
                </div>
            </div>
            <div className="mb-1 flex justify-center form-group row">
                <div class='col-3'>
                    <label htmlFor='input_gender'>성별 : </label>
                </div>
                <div class='col-9 flex'>
                    <div  className='w-36 text-right' >
                        <input className='mr-4 ml-4' type='radio' name='input_gender' value='m' checked={inputGender === 'm'} onChange={handleInputGender}/>남자
                    </div>
                    <div  className='w-36 text-center'>
                        <input className='mr-4 ml-4' type='radio' name='input_gender' value='f' checked={inputGender === 'f'} onChange={handleInputGender} />여자
                    </div>
                    <div  className='w-36 text-left' >
                            <input className='mr-4 ml-4' type='radio' name='input_gender' value='p' checked={inputGender === 'p'}  onChange={handleInputGender} />비공개
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
                    <button type="button" onClick={OnClickEmailSend} disabled={isBtnEmailDisabled}>인증번호 전송</button>
                </div>
            </div>
            {showEmailCheck && <div class = "form-group row">
                <div class='col-3'>
                    <label htmlFor='input_email'>인증번호 : </label>
                </div>
                <div className='flex w-75'>
                    <input type='text' className='border' name='input_email_check' value={inputEmailCheck} style={style_inputbox} onChange={handleInputEmailCheck} disabled={isEmailAuthDisabled}/>
                    <button type="button" onClick={OnClickEmailCheck} disabled={isEmailAuthDisabled}>인증번호 확인</button>
                </div>
            </div>}
            <div class="form-group row">
                <div class='col-3'>
                    <label htmlFor='input_address'>주소 : </label>
                </div>
                <div className='flex w-75'>
                    <input type='text' className='border' name='input_address' value={inputAddress} style={style_inputbox} onChange={handleInputAddress} readOnly/>
                    <button type="button" onClick={OnClickAddress}>주소검색</button>
                    {isModalOpen &&
                        <AddressModal isModalOpen={isModalOpen}
                                      setIsModalOpen={setIsModalOpen}
                                      setInputAddress={setInputAddress}
                                      setInputPostAddress={setInputPostAddress}
                        />
                    }
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
                    <input type='radio' name='input_role' value='user' checked={inputRole === 'user'} onChange={handleInputRole}/>사용자
                </div>
                <div class='col-6' style={{textAlign:'left'}}>
                    <input type='radio' name='input_role' value='developer' checked={inputRole === 'developer'} onChange={handleInputRole} />공급자
                </div>
            </div>

            <div class="form-group row">
                <div class='col-6'>
                    <button type="button" style={bottomBtn} onClick={OnClickSave}>저장</button>
                    {modalOpen &&
                        <MySectionInfo setModalOpen={setModalOpen}
                                       modalOpen ={modalOpen}
                                       info={userInfo}
                                       setSendOk={setSendOk}
                        />}
                </div>
                <div class='col-6'>
                    <button type='button' style={bottomBtn} onClick={OnClickCancel}>취소</button>
                </div>
            </div>
        </div>
    );
}