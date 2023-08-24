import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Choosefind from './choosefind.js';
import {axiosRequest} from '../../../module/networkUtils';
import { useDispatch } from 'react-redux';
import { setAvatarItemList } from '../../../redux/actions/avatarActions';
import { useNavigate } from 'react-router-dom';

export default function Login(props){
    const navigate = useNavigate();
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const dispatch = useDispatch();

    const handleUpdate = (newItemList) => {
        dispatch(setAvatarItemList(newItemList));
    };

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
            try{
                const path = 'http://localhost:9090/user/login';
                const body = {
                    userID: inputId,
                    userPW: inputPw,
                };
                axiosRequest(path,body,'POST','json')
                    .then(res => {
                        console.log(res);
                        if(res !== ''){
                            localStorage.setItem("userNickname", res.userNickname);
                            localStorage.setItem("userCash", res.userCash);
                            localStorage.setItem("userID", inputId);                    // 마이페이지에서 사용하기 위해 세팅
                            localStorage.setItem("truelogin","true");
                            props.setTruelogin(true);
                            // 착용 아바타 아이템 불러오기
                            const avatarBody = {
                                userId: inputId,
                            };
                            axiosRequest('http://localhost:9090/avatar/inventory/active', avatarBody, 'POST', 'json')
                                .then(res => {
                                    handleUpdate(res);
                                    navigate('/');
                                    // document.location.href = "/";
                                })
                                .catch(err => {
                                    console.log(err);
                                    alert('아바타 정보를 불러오지 못했습니다. 잠시후 다시 시도해주세요.');
                                });

                        }else{
                            alert('로그인에 실패하였습니다.');
                            setInputId("");
                            setInputPw("");
                        }
                    })

            }catch (e){
                console.log(e);
                alert('로그인에 실패하였습니다.');
                setInputId("");
                setInputPw("");
            }
        }
    }

    // signup 버튼 클릭 이벤트
    const OnClickSignUp = () => {
        document.location.href = "/signup";
    }

    const showModal = () => {
        if(modalOpen){
            setModalOpen(false);
        }else{
            setModalOpen(true);
        }
    }
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
                    <div class='flex justify-center'>
                            <div class='p-1 m-1 text-gray-500 hover:text-blue-800 hover:font-bold hover:cursor-pointer' onClick={showModal}>아이디/비밀번호 찾기</div>
                            {modalOpen && <Choosefind setModalOpen={setModalOpen} modalOpen ={modalOpen}/>}
                            <div class='p-1 m-1 text-gray-500 hover:text-blue-800 hover:font-bold hover:cursor-pointer' onClick={OnClickSignUp}>회원가입</div>
                    </div>
                </li>
            </ul>
            </fieldset>
            </div>
    );
}
