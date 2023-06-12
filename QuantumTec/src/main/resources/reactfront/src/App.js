import './App.css';
import './styles.css';
import  Navbar from './component/navbar.js';
import Header from './component/Pages/MainPage/header.js';
import Section from './component/Pages/MainPage/section.js';
import Aside from './component/Pages/MainPage/asideLogin';
import Footer from './component/footer.js';
import Loginpage from './component/Pages/LoginPage/login.js';
import Signpage from './component/Pages/LoginPage/sign.js';
import MyMain from './component/Pages/MyPage/mymain';
import PasswordChk from './component/Pages/MyPage/passwordChk';
import GamePage from './component/Pages/GamePage/gamepage.js';
import BoardPage from './component/Pages/BoardPage/board.js';
import PostPage from './component/Pages/BoardPage/post.js';
import WritePage from './component/Pages/BoardPage/write.js';

import AvatarShopPage from "./component/Pages/AvatarShopPage/avatarMainPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Sidebar from './component/Pages/MainPage/sidebar';

import styled from "styled-components";
import axios from 'axios';
function App() {
    // truelogin 값을 로컬 스토리지에서 가져옴, 이때 문자열 값이 아닌 boolean값으로 사용하기 위해서 조건문으로 표시
    let [truelogin, setTruelogin] = useState(localStorage.getItem("truelogin") === "true");

    truelogin = '';
  return (
   <Router>
      <div className="App" style={{overflow:'auto'}}>
        <Navbar start={truelogin}/>
        <Routes>
          <Route path="/" exact element={<Home start={truelogin}/>} />
          <Route path="/login" element={<Login start={truelogin} setTruelogin={setTruelogin} />} />
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/mypage" element={<MyPage />}/>
          <Route path="/game/:id/:gameName" element={<GamePage />}/>
          <Route path="/board/:id" element={<Board />}/>
          <Route path="/post/:id" element={<Post />}/>
          <Route path="/write" element={<Write />}/>
          <Route path="/avatarshop" element={<AvatarShop />}/>
        </Routes>
      </div>
      <Footer style={{height: "20vh"}} />
    </Router>
  );
}



function Home(props) {
  return (
    <div className="Home">
          {/*위에 광고 화면과 로그인 크기 맞추기위해 설정해놓음*/}
        <div class='h-[297px] mb-[50px]' style={{ display: 'flex'}}>
        <header style={{ flexBasis: '100%'}}>
          <Header />
        </header>
      </div>
      <Section />
        </div>
  );
}

function Login(props){
  return (
    <div className="Login" style={{ height: "81vh" }}>
      <Loginpage start={props.start} setTruelogin={props.setTruelogin} />
    </div>
  );
}

function SignUp(){
  return (
    <div className="SignUp" style={{ height: "81vh" }}>
      <Signpage/>
    </div>
  );
}

function MyPage(){
  return (
    <div className="MyPage" style={{ height: "82vh" }}>
        <MyMain />
    </div>
  )
}
function Board(){
  return (
    <div className="Board" style={{ height: "90vh" }}>
        <BoardPage />
    </div>
  )
}
function Post(){
  return (
    <div className="Post">
        <PostPage />
    </div>
  )
}
function Write(){
  return (
    <div className="Write">
        <WritePage />
    </div>
  )
}

function AvatarShop(){
    return (
        <div className="AvatarMainPage mt-[5vh]" >
            <AvatarShopPage />
        </div>
    )
}



export default App;
