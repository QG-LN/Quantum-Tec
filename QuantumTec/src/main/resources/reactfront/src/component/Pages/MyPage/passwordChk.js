import React, {useState} from 'react';
import Mysection from './mysection';
import '../../../styles.css';

export default function PasswordChk(){
    const [inputPw, setInputPw] = useState('')
    const [passwordchk, chkPassword] = useState(false);
    
    //비밀번호값 상태 확인
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    //확인 버튼 눌럿을시 비밀번호 확인
    const handleClick = () => {
        if (inputPw === '1234'){
        chkPassword(!passwordchk);
        };
    }
    return(
         <div class='mysection-form'>
                {!passwordchk ? (
                    <div class='passchk-form'>
                <h2>비밀번호확인</h2>
                <input type="password" name="input_pw" value={inputPw} minLength={8} onChange={handleInputPw}/>
                <button onClick={handleClick}>확인</button>
                </div>
                ):(<Mysection />)}
         </div>

    )
}