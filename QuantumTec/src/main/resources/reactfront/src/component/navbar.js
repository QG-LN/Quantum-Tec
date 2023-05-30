import '../App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../App.js';
// import React, { useState, useEffect } from "react";
import json from './b.json';

export default function Navbar(props) {
    let userpaidCash=0;
    let userCash = 0;
    let userCheck = 8;
    let truelogin = false;
    // 로그인 상태일때 유저 이름 받아오기
    truelogin=props.start;
    let username= 'test';
    truelogin=true;

    const handleLogInfo = (e) => {
        console.log(e.currentTarget)
        //class이름이 LogInfo인 div태그 속성을 hidden에서 block으로 변경
        if (e.currentTarget.nextSibling.style.display === 'block')
            e.currentTarget.nextSibling.style.display = 'none';
        else
            e.currentTarget.nextSibling.style.display = 'block';
    }
    // 로그인 상태일때 유저 이름 받아오기
    const getUsername = () => { 
        const url = json;
        axios
        .get(url)
        .then(res => username = res.data.username)
        .catch(username = 'error');
        
    };
    const getMyCash = () => {
        const url = json;
        axios
        .get(url)
        .then(res => userCash = (res.data.userCash))
        .catch(userCash = '0');
    };

    // 로고 클릭시 맨 위로 이동
    const logoClick = () => {
        document.location.href = "/";
    };


//     const [username, setUsername] = useState("");

//   useEffect(() => {
//     const url = json;
//     axios
//       .get(url)
//       .then((res) => {
//         const data = res.data;
//         setUsername(data.username);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//         }, []);

    // 로그인 버튼 클릭시 로그인 페이지로 이동
    const ClickLogin = () => {
        document.location.href = "/login";
      }
    const ClickMyPage = () => {
        document.location.href = "/mypage";
      }
    
      
           return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="block w-[100%] relative">
                        {/*로고(클릭시 메인화면)*/}
                        <a class="navbar-brand hover:cursor-pointer" onClick={logoClick}>로고 위치(상표)</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                             {/*카테고리*/}
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 navbar-nav-right absolute top-0 left-0">
                                <li class="nav-item"><a class="nav-link active" aria-current="page" href="/">Home</a></li>
                                <li class="nav-item"><a class="nav-link" href="#!">About</a></li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a class="dropdown-item" href="#!">All Products</a></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><a class="dropdown-item" href="#!">Popular Items</a></li>
                                        <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
                                    </ul>
                                </li>
                            </ul>
                            {/*우측 상단에 넣을수 있는 자리(필요시 로그인버튼을 간소화할떄 쓸 위치)*/}
   

                        </div>
                        <form class="log_info d-flex justify-end absolute top-0 right-0 mr-10 ">
                                
                                {getUsername()}
                                {getMyCash()}
                                {!truelogin && <button class="btn-outline-dark border-2 hover:bg-green-500 hover:text-white rounded-md pr-1" type="button" onClick={ClickLogin} >
                                <i class="loginbtn me-1"></i>
                                <span>
                                    로그인</span>
                                </button>}
                                {truelogin && <div><a class='flex openLogInfo' href='javascript:void(0)' onClick={handleLogInfo}>
                                    <div class='flex'>
                                    <div class='mr-1'>{username}</div>
                                    <div class='mr-5'> : {userCash}</div>
                                    </div>
                                    <img class='w-8 h-8 rounded-full' src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' />
                                </a>
                                <div class='LogInfo hidden w-[366px] h-[300px] absolute bg-gray-800 top-[38px] right-0 z-40 overflow-hidden'>
                                            <div class="info_t p-1">
                                                <ul class='flex mt-4'>
                                                    <li class="thum"><img class='w-24 h-24 rounded-full' src="https://resource.cyphers.co.kr/ui/img/character/ico_64px_44.png" alt=""/>
                                                    
                                                    </li>
                                                    <li class='text-gray-400 ml-3'>
                                                        <p class='mb-0 ml-2 text-left font-bold'>
                                                            <strong>
                                                                {username}
                                                            </strong>
                                                        </p>
                                                        <p class='mb-0 ml-2 text-left'>출석일수 : <span>{userCheck}일</span></p>
                                                        <p class='mb-0 ml-2 text-left'>보유재화 : <span>{userCash}원</span></p>
                                                        <p class='mb-0 ml-2 text-left'>유료재화 : <a href="/mypage"><span class='text-gray-400'>{userpaidCash}원</span></a> <a href="#" class="bg-yellow-400 rounded-md  hover:text-white" id="boxTeraCharge">충전</a></p>
                                                    </li>
                                                </ul>
                                            </div>
                                        <hr class='border-white mb-0'/>
                                        <div class="info_b text-center bg-gray-900">
                                            <a class='inline-block px-[18px] py-[20px] text-gray-400 text-lg' href="/mypage">내정보관리</a>
                                            <a class='inline-block px-[18px] py-[20px] text-gray-400 text-lg' href="/mypage">아바타관리</a>
                                        </div>
                                        <hr class='border-white mb-0 mt-0'/>
                                        <div class='text-center bg-gray-900'>
                                            <a class='inline-block px-[18px] py-[20px] text-gray-400 text-lg' href="#" onclick="NgbLogin.Logout();return false;">로그아웃</a>
                                        </div>
                                    </div>
                                </div>}
                            </form> 
                    </div>   
                </nav>
            </div>
        );
    
}
