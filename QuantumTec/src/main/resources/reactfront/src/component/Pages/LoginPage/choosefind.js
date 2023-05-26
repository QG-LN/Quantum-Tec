import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function Choosefind(props) {
  const [inputId, setInputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputEmailCheck, setInputEmailCheck] = useState('');
  const [showEmailCheck, setshowEmailCheck] = useState(false)
  const [inputRadio, setInputRadio] = useState("아이디 찾기");
  
  //아이디 찾기 페이지와 비밀번호 찾기 페이지를 구분하기 위한 상태
  const[findIdPage,setFindIdPage] = useState(true);
    //이메일과 이메일인증 버튼의 Disabled 속성 확인
    const [inputEmailDisabled, setInputEmailDisabled] = useState(false);
    const [trueId,settrueId] = useState(false);
    const [truePw, settruePw] = useState(false);

    const [findId,setFindId] = useState('');
    const [findPw,setFindPw] = useState('');

    const handleInputName = (e) => {
    setInputName(e.target.value);
  }
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  }

  const handleInputRadio = (e) => {
    setInputRadio(e.target.value);
 }
  const handleInputEmailCheck = (e) => {
    setInputEmailCheck(e.target.value);
  }

  const handleInputId = (e) => {
    setInputId(e.target.value);
  }

    const handleClose = () => {
        // setIsOpen(false);
        props.setModalOpen(false);
    };
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

    //확인 버튼 클릭 이벤트
    const onClickIdFind = () => {
        if(inputName === '') {
            alert('이름을 입력해주세요');
            return
        // 이름 최소 길이 확인
        }else if(inputName.length < 2){
            alert('이름을 2글자 이상으로 써주세요');
            return
        }else if(inputEmail === ''){
            alert('이메일을 입력해주세요');
            return
        }else if(inputEmailCheck === ''){
            alert('인증번호를 입력해주세요');
            return
        }else if(inputEmailCheck != auth){
            alert('인증번호가 일치하지 않습니다.');
            settrueId(false);
            return
        }else{
            //성공시 아이디 임시로 출력
            console.log('성공')
            setFindId('test1234');
            settrueId(true);
            
        }
    }

    const onClickPwFind = () => {
        if(inputName === '') {
            alert('이름을 입력해주세요');
            return
        // 이름 최소 길이 확인
        }else if(inputName.length < 2){
            alert('이름을 2글자 이상으로 써주세요');
            return
        }else if(inputId === ''){
            alert('아이디를 입력해주세요');
            return
        }else if(inputId.length < 21){
            alert('아이디를 20글자 이내로 써주세요');
            return
        }
        else if(inputEmail === ''){
            alert('이메일을 입력해주세요');
            return
        }else if(inputEmailCheck === ''){
            alert('인증번호를 입력해주세요');
            return
        }else if(inputEmailCheck != auth){
            alert('인증번호가 일치하지 않습니다.');
            settrueId(false);
            return
        }else{
            //성공시 비밀번호 임시로 출력
            console.log('성공')
            setFindPw('asdfsadf!@123');
            settruePw(true);
            
        }
    }
    //아이디 찾기 버튼 클릭 이벤트
    const OnClickIdFind = () => {
        setFindIdPage(true);
        //화면 전환시 이메일 인증 텍스트와 인증버튼 비활성화
        setshowEmailCheck(false);
        console.log(findIdPage)
    }
    //비밀번호 찾기 버튼 클릭 이벤트
    const OnClickPwFind = () => {
        setFindIdPage(false);
        //화면 전환시 이메일 인증 텍스트와 인증버튼 비활성화
        setshowEmailCheck(false);
        console.log(findIdPage)
    }

    // 이메일 형식 확인
    const isEmail = (inputEmail) => {
        return /^\w+@\w+.\w{2,3}(\.\w{2,3})?$/.test(inputEmail);
    };

    // 이메일 인증 버튼 클릭 이벤트
    const OnClickEmailSend = async () => {
        // 이메일 형식을 만족할 경우
        if(isEmail(inputEmail)){
            const path = 'http://localhost:9090/user/signup/send-email-auth';
            const body = { userEmail : inputEmail}
            const data = await checkData(path,body,'POST');
            setInputEmailDisabled(true);
            //이메일 인증 텍스트와 인증버튼 활성화
            setshowEmailCheck(true);
            //인증번호 전송 표시
            alert('인증번호가 전송되었습니다.');
        }
        else{
            alert('이메일 형식이 올바르지 않습니다.');
        }
    }

    //인증번호 재전송 버튼 클릭 이벤트
    const OnClickEmailReSend = async () => {
        alert('인증번호가 재전송되었습니다.');
    }

   // 아이디 임시
  const auth = '1234';

  return (
    <>
      {/*  modalOpen값에 따라 활성/비활성화 */}
      <Modal show={props.modalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><fieldset class='headerradioStyle'>
                    <legend class='absolute overflow-hidden h-1 w-1 m-[-1px]'></legend>
                            <label className='headerstyle hover:cursor-pointer'>
                                <input type="radio" name='headers' id='radioheader' onChange={handleInputRadio} defaultChecked value='id'/><span onClick={OnClickIdFind}>아이디 찾기</span>
                            </label>
                            <label className='headerstyle hover:cursor-pointer'>
                                <input type="radio" name='headers'id='radioheader' onChange={handleInputRadio} value='pw' /><span onClick={OnClickPwFind}>비밀번호 찾기</span>
                            </label>
                </fieldset>
                </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/*아이디 찾기 페이지*/}
            {findIdPage &&
            <div class='w-[440px] h-[350px]'>
            <ul class="loginul m-auto">
                <li>
                    <div class="form-group">
                        <div class="custom_input label">
                            <input id="_name" placeholder="이름" autocomplete="off" type="text" name="input_name"  maxLength={20} onChange={handleInputName} />
                        </div>
                    </div>
                </li>
                <li>
                    <div class="form-group">
                        <div class="custom_input label flex">
                            <input class=' rounded-md w-[73%] h-[46px] max-h-[56px] px-[24px] text-sm box-border border mt-3 ' id="_email" type="email" placeholder='이메일' onChange={handleInputEmail} name="input_email" />
                            <button class=' border text-sm h-[46px] w-[26%] mt-3 ml-1 rounded-md nondrag' onClick={OnClickEmailSend}>인증번호 받기</button>
                        </div>
                    </div>
                </li>
                <li>
                {showEmailCheck && 
                    <div class="form-group">
                        <div class="custom_input label flex">
                            <input class=' rounded-md w-[73%] h-[46px] max-h-[56px] px-[24px] text-sm box-border border mt-3 ' id="_check" type="text" placeholder='인증번호' onChange={handleInputEmailCheck} name="input_check" />
                            <button class=' border text-sm h-[46px] w-[50%] mt-3 ml-1 rounded-md nondrag' onClick={OnClickEmailReSend}>인증번호 재전송</button>
                        </div>
                    </div>}
                </li>
                <li>
                    <div class="form-group mt-3 text-center">
                        <button type="button" class="btn btn-primary btn_mid rounded-md nondrag w-[200px]" onClick={onClickIdFind}>확인</button>
                    </div>
                </li>
                <hr/>
                <li>
                    {trueId && <div class='text-center mt-[50px]'>아이디는 {findId}입니다</div>}
                </li>
            </ul>
            </div>
            }
            {/*비밀번호 찾기 페이지*/}
            {!findIdPage && 
                <div class='w-[440px] h-[390px]'>
                <ul class="loginul m-auto">
                    <li>
                        <div class="form-group">
                            <div class="custom_input label">
                                <input id="_name" placeholder="이름" autocomplete="off" type="text" name="input_name"  maxLength={20} onChange={handleInputName} />
                            </div>
                        </div>
                    </li>
                    <li>
                    <div class="form-group">
                        <div class="custom_input label mt-3">
                            <input id="_id" placeholder="아이디" autocomplete="off" type="text" name="input_id"  maxLength={20} onChange={handleInputId} />
                        </div>
                    </div>
                </li>
                    <li>
                        <div class="form-group">
                            <div class="custom_input label flex">
                                <input class=' rounded-md w-[73%] h-[46px] max-h-[56px] px-[24px] text-sm box-border border mt-3 ' id="_email" type="email" placeholder='이메일' onChange={handleInputEmail} name="input_email" />
                                <button class=' border text-sm h-[46px] w-[26%] mt-3 ml-1 rounded-md nondrag' onClick={OnClickEmailSend}>인증번호 받기</button>
                            </div>
                        </div>
                    </li>
                    <li>
                    {showEmailCheck && 
                        <div class="form-group">
                            <div class="custom_input label flex">
                                <input class=' rounded-md w-[73%] h-[46px] max-h-[56px] px-[24px] text-sm box-border border mt-3 ' id="_check" type="text" placeholder='인증번호' onChange={handleInputEmailCheck} name="input_check" />
                                <button class=' border text-sm h-[46px] w-[50%] mt-3 ml-1 rounded-md nondrag' onClick={OnClickEmailReSend}>인증번호 재전송</button>
                            </div>
                        </div>}
                    </li>
                    <li>
                        <div class="form-group mt-3 text-center">
                            <button type="button" class="btn btn-primary btn_mid rounded-md nondrag w-[200px]" onClick={onClickPwFind}>확인</button>
                        </div>
                    </li>
                    <hr/>
                    <li>
                        {truePw && <div class='text-center mt-[40px]'>비밀번호는 {findPw}입니다</div>}
                    </li>
                </ul>
                </div>
            }
          
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}