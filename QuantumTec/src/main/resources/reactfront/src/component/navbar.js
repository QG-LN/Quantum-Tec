import '../App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import '../App.js';
// import React, { useState, useEffect } from "react";
import json from './b.json';
import Sidebar from './sidebar.js';
import Contact from './contact.js';

export default function Navbar() {
    let truelogin = localStorage.getItem("truelogin");

    let defaultIconAddress = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';

    const [userNickname, setUserNickname] = useState('');               // 사용자 닉네임
    const [userPaidCash, setUserPaidCash] = useState(0);                // 사용자 유료캐시
    const [userFreeCash, setUserFreeCash] = useState(0);                // 사용자 무료캐시
    const [userAttendance, setUserAttendance] = useState(0);            // 사용자 출석횟수
    const [userIconAddress, setUserIconAddress] = useState(defaultIconAddress);    // 사용자 아이콘 주소

    useEffect(() => {
        // 로그인 상태일때 유저 이름 받아오기
        if (truelogin) {
            setUserNickname(localStorage.getItem("userNickname") || '');
            setUserPaidCash(localStorage.getItem("userPaidCash") || 0);
            setUserFreeCash(localStorage.getItem("userCash") || 0);
            setUserAttendance(localStorage.getItem("userAttendance") || 0);
            setUserIconAddress(localStorage.getItem("userIcon") || defaultIconAddress);
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
        <div>
            <Sidebar width={300}>
                <Contact/>
            </Sidebar>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{zIndex: '3'}}>
                <div class="block w-[100%] relative">
                    {/*로고(클릭시 메인화면)*/}
                    <a class="navbar-brand hover:cursor-pointer" onClick={logoClick}>로고 위치(상표)</a>
                    <form class="log_info d-flex justify-end absolute top-0 right-0 mr-10 ">

                        {/*{getUsername()}*/}
                        {/*{getMyCash()}*/}
                        {!truelogin && <button
                            class="btn-outline-dark border-2 hover:bg-green-500 hover:text-white rounded-md pr-1"
                            type="button" onClick={ClickLogin}>
                            <i class="loginbtn me-1"></i>
                            <span>
                                    로그인</span>
                        </button>}
                        {truelogin &&
                            <div><a class='flex openLogInfo' href='javascript:void(0)' onClick={handleLogInfo}>
                                <div class='flex'>
                                    <div class='mr-1'>{userNickname}</div>
                                    <div class='mr-5'> : {userFreeCash}</div>
                                </div>
                                {/*<img class='w-8 h-8 rounded-full' src={userIconAddress} />*/}
                                {/*아래 코드는 임시 코드*/}
                                <img className='w-8 h-8 rounded-full'
                                     src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'/>
                            </a>
                                <div
                                    class='LogInfo hidden w-[366px] h-[300px] absolute bg-gray-800 top-[38px] right-0 z-40 overflow-hidden'>
                                    <div class="info_t p-1">
                                        <ul class='flex mt-4'>
                                            <li class="thum">
                                                {/*<img class='w-24 h-24 rounded-full' src={userIconAddress} alt=""/>*/}
                                                <img className='w-24 h-24 rounded-full'
                                                     src="https://resource.cyphers.co.kr/ui/img/character/ico_64px_44.png"
                                                     alt=""/>
                                            </li>
                                            <li class='text-gray-400 ml-3'>
                                                <p class='mb-0 ml-2 text-left font-bold'>
                                                    <strong>
                                                        {userNickname}
                                                    </strong>
                                                </p>
                                                <p class='mb-0 ml-2 text-left'>출석일수 : <span>{userAttendance}일</span></p>
                                                <p class='mb-0 ml-2 text-left'>보유재화 : <span>{userFreeCash}원</span></p>
                                                <p class='mb-0 ml-2 text-left'>유료재화 : <a href="#"><span
                                                    class='text-gray-400'>{userPaidCash}원</span></a> <a href="#"
                                                                                                        class="bg-yellow-400 rounded-md  hover:text-white"
                                                                                                        id="boxTeraCharge">충전</a>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr class='border-white mb-0'/>
                                    <div class="info_b text-center bg-gray-900">
                                        <a class='inline-block px-[18px] py-[20px] text-gray-400 text-lg'
                                           href="/mypage">내정보관리</a>
                                        <a class='inline-block px-[18px] py-[20px] text-gray-400 text-lg'
                                           href="#">아바타관리</a>
                                    </div>
                                    <hr class='border-white mb-0 mt-0'/>
                                    <div class='text-center bg-gray-900'>
                                        <a class='inline-block px-[18px] py-[20px] text-gray-400 text-lg'
                                           onClick={clickLogout}>로그아웃</a>
                                    </div>
                                </div>
                            </div>}
                    </form>
                </div>
            </nav>
        </div>
    );

}
