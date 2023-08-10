import React, {useState} from 'react';
import Mysection from './mysection';
import '../../../styles.css';
import {axiosRequest} from '../../../module/networkUtils';

export default function PasswordChk(){
    const [inputPw, setInputPw] = useState('')
    const [passwordchk, chkPassword] = useState(false);
    const [userData, setUserData] = useState();
    
    //비밀번호값 상태 확인
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    //확인 버튼 눌럿을시 비밀번호 확인
    const handleClick = async () => {
        const path = 'http://localhost:9090/user/myinfo';
        const body = {
            userID: localStorage.getItem('userID'),
            userPW: inputPw,
        };
        const data = await axiosRequest(path,body,'POST','json');

        // 값이 존재한다면 즉, 로그인이 성공적으로 진행된다면,
        if(data !== null && data !== undefined && data !== ''){
            setUserData(data);
            chkPassword(!passwordchk);
        }else{
            alert('비밀번호가 일치하지 않습니다.');
            setInputPw('');                                 // 비밀번호 초기화
        }
    }
    return(
         <div class='mysection-form mypagestyle float-right w-mypagesection max-w-[880px] relative min-w-[700px]'>
                {!passwordchk ? (
                    <div class='passchk-form '>
                        <div>
                        <h2 class='account_main_page_title '>비밀번호 확인</h2>
                            <div class="mt-[120px]">
                                <input className='h-[50px] w-[350px] border border-black rounded-xl indent-3' placeholder='비밀번호를 입력해주세요' type="password" name="input_pw" value={inputPw} minLength={8} onChange={handleInputPw}/>
                                <button class="w-[100px] h-[50px] ml-8 border-2 shadow-sm rounded-xl border-green-400" onClick={handleClick}>확인</button>
                            </div>
                        </div>
                </div>
                ):(<Mysection userData = {userData} />)}
         </div>

    )
}