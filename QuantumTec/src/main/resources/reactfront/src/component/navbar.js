import '../App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Logo from './Pages/MainPage/BringUP_LOGO.png';
import '../App.js';
// import React, { useState, useEffect } from "react";
import json from './b.json';
import Sidebar from './sidebar.js';
import Contact from './contact.js';
import AvatarCanvas from './Pages/avatarInventory/avatarCanvas';
import { useNavigate } from 'react-router';

export default function Navbar() {
    const navigate = useNavigate();
    let truelogin = localStorage.getItem("truelogin");

    const handleInventory = () => {
        navigate('/inventory');
    }

    const [userNickname, setUserNickname] = useState('');               // 사용자 닉네임
    const [userPaidCash, setUserPaidCash] = useState(0);                // 사용자 유료캐시
    const [userFreeCash, setUserFreeCash] = useState(0);                // 사용자 무료캐시
    const [userAttendance, setUserAttendance] = useState(0);            // 사용자 출석횟수

    useEffect(() => {
        // 로그인 상태일때 유저 이름 받아오기
        if (truelogin) {
            setUserNickname(localStorage.getItem("userNickname") || '');
            setUserPaidCash(localStorage.getItem("userPaidCash") || 0);
            setUserFreeCash(localStorage.getItem("userCash") || 0);
            setUserAttendance(localStorage.getItem("userAttendance") || 0);
        }
    }, [truelogin]);

    const handleLogInfo = (e) => {
        console.log(e.currentTarget)
        //class이름이 LogInfo인 div태그 속성을 hidden에서 block으로 변경
        if (e.currentTarget.nextSibling.style.display === 'block')
            e.currentTarget.nextSibling.style.display = 'none';
        else
            e.currentTarget.nextSibling.style.display = 'block';
    }

    // 로고 클릭시 맨 위로 이동
    const logoClick = () => {
        document.location.href = "/";
    };


    // 로그인 버튼 클릭시 로그인 페이지로 이동
    const ClickLogin = () => {
        document.location.href = "/login";
    }

    const clickLogout = () => {
        localStorage.clear();
        document.location.href = "/";
    }
    const ClickMyPage = () => {
        document.location.href = "/mypage";
    }


    return (
        <div class="fixed top-0 left-0 w-[100%] z-50">
            <Sidebar width={300}>
                <Contact/>
            </Sidebar>
            <nav className="navbar navbar-expand-lg" style={{zIndex: '3' ,backgroundColor :'#f6f8fa'}}>
                <div class="block w-[100%] relative mt-1">
                    {/*로고(클릭시 메인화면)*/}
                    <a class="navbar-brand hover:cursor-pointer mb-2" onClick={logoClick}>
                        <img className='w-[10%] mt-[-4px] absolute left-[45.3%]' src={Logo}></img>
                    </a>
                    <form class="log_info d-flex justify-end absolute top-0 right-0 mr-10 ">
                        {/*{getUsername()}*/}
                        {/*{getMyCash()}*/}
                        {!truelogin && <button
                            class="btn-outline-dark border-2 border-black hover:bg-green-500 hover:border-green-600 hover:text-white rounded-full mt-[-3px] px-2 py-1 pr-1"
                            type="button" onClick={ClickLogin}>
                            <i class="loginbtn"></i>
                            <span class='font-bold'>
                                    로그인</span>
                        </button>}
                        {truelogin &&
                            <div>
                                <a class='flex openLogInfo' href='javascript:void(0)' onClick={handleLogInfo}>
                                <div class='flex'>
                                    <div class='mr-1'>{userNickname}</div>
                                    <div class='mr-5'> : {userFreeCash}</div>
                                </div>
                                <div className='w-8 h-8 rounded-full'>
                                    <AvatarCanvas size={[220,220]} position={[128,128]}/>
                                </div>
                            </a>
                                <div
                                    class='LogInfo hidden w-[366px] absolute bg-light top-[38px] right-0 z-40 overflow-hidden rounded-3 shadow-sm'>
                                    <div class="info_t p-1 border-bottom">
                                        <ul class='flex mt-4'>
                                            <li class="thum">
                                                {/*<img class='w-24 h-24 rounded-full' src={userIconAddress} alt=""/>*/}
                                                <div className='w-24 h-24 rounded-full'>
                                                    <AvatarCanvas size={[220,220]} position={[128,128]}/>
                                                </div>
                                            </li>
                                            <li class='text-dark ml-3'>
                                                <p class='mb-0 ml-2 text-left font-bold'>
                                                    <strong>
                                                        {userNickname}
                                                    </strong>
                                                </p>
                                                <p class='mb-0 ml-2 text-left'>출석 일수 : <span>{userAttendance}일</span></p>
                                                <p class='mb-0 ml-2 text-left'>무료 캐시 : <span>{userFreeCash}원</span></p>
                                                <p class='mb-0 ml-2 text-left'>유료 캐시 : 
                                                    <a href="#">
                                                        <span class='text-dark'> {userPaidCash}원 </span>
                                                    </a>
                                                    <a href="#" class="bg-yellow-400 rounded-md  hover:text-white" id="boxTeraCharge">
                                                        충전
                                                    </a>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="info_b text-center d-grid gap-3">
                                        <div class="p-1 mt-2">
                                            <div class="row hover:cursor-pointer">
                                                <div class='col-4 text-center'>
                                                    <img class='w-[30px] h-[100%] m-auto'src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="..." />
                                                </div>
                                                <div class="inline-block text-lg text-left col-8" 
                                                    onClick={handleInventory}>
                                                    내정보관리
                                                </div>
                                            </div>

                                        </div>
                                        <div class="p-1">
                                            <div class="row hover:cursor-pointer" onMouseOver={()=>{console.log("Test")}}>
                                            <div class='col-4 text-center'>
                                                    <img class='w-[30px] h-[100%] m-auto'src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="..." />
                                                </div>
                                                <div class="inline-block text-lg text-left col-8" 
                                                    onClick={handleInventory}>
                                                    아바타관리
                                                </div>
                                            </div>
                                        </div>
                                        <div class="p-1 mb-2">
                                            <div class="row hover:cursor-pointer" >
                                            <div class='col-4 text-center'>
                                                    <img class='w-[30px] h-[100%] m-auto'src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="..." />
                                                </div>
                                                <div class="inline-block text-lg text-left col-8" 
                                                    onClick={handleInventory}>
                                                    로그아웃
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </form>
                </div>
            </nav>
        </div>
    );

}
