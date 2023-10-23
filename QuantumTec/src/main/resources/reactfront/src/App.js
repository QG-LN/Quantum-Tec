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
import CashChargePage from './component/Pages/PaymentsPage/cashcharge';
import { Success } from './component/Pages/PaymentsPage/success';
import { Fail } from './component/Pages/PaymentsPage/fail';
import TtBoardPage from './component/Pages/BoardPage/tutoringboard.js';
import TutorPage from './component/Pages/BoardPage/tutorpage.js'
import TutorInsertPage from './component/Pages/BoardPage/tutorinsertpage.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AvatarInvetoryPage from "./component/Pages/avatarInventory/avatarMainPage";
import DashBoard from './component/Pages/DashBoardPage/dashboard.js';
import TablePage from './component/Pages/DashBoardPage/userPage';
import DashBoardLayout from './component/Pages/DashBoardPage/dashboardLayout';
import DashboardHome from './component/Pages/DashBoardPage/dashboardHome';

import UserTableRow from './component/Pages/user-table-row';
import users from './dashboard/_mock/user';
import userHeadLabel from './dashboard/_mock/userHeadLabel';

import GameTableRow from './component/Pages/game-table-row';
import games from './dashboard/_mock/game';
import gameHeadLabel from './dashboard/_mock/gameHeadLabel';

function App() {
    // truelogin 값을 로컬 스토리지에서 가져옴, 이때 문자열 값이 아닌 boolean값으로 사용하기 위해서 조건문으로 표시
    let [truelogin, setTruelogin] = useState(localStorage.getItem("truelogin") === "true");

    truelogin = '';
  return (
   <Router>
      <div className="App" style={{overflow:'auto'}}>
      {window.location.pathname.includes('dashboard') ? <DashBoardLayout /> : <Navbar style={{ height: "20vh" }} />}
        <Routes>
          <Route path="/" exact element={<Home start={truelogin}/>} />
          <Route path="/login" element={<Login start={truelogin} setTruelogin={setTruelogin} />} />
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/mypage" element={<MyPage />}/>
          <Route path="/game/:id/:gameName" element={<GamePage />}/>
          <Route path="/board/:id" element={<Board />}/>
          <Route path="/board/:no/post/:id" element={<Post />}/>
          <Route path="/board/:no/write" element={<Write />}/>
          <Route path="/board/:no/post/:id/edit" element={<Write />}/>
          <Route path="/tutoring" element={<TtBoard />}/>
          <Route path="/tutoringPost" element={<TtInsert />}/>
          <Route path="/tutoringPost/:id/edit" element={<TtInsert />}/>
          <Route path="/tutoring/:id/:tutor" element={<TtPage />}/>
          <Route path="/post/:id" element={<Post />}/>
          <Route path="/write" element={<Write />}/>
          <Route path="/avatarshop" element={<AvatarShop />}/>
          <Route path="/cashcharge" element={<CashCharge />}/>
          <Route path="/inventory" element={<AvatarInvetory />}/>
          <Route path="/payments/success" element={<PaymentsSuccess />}/>
          <Route path="/payments/fail" element={<PaymentsFail />}/>
          {/* <Route path="/dashboard" element={<DashBoardPage />}/> */}
          <Route path="/dashboard/user" element={<UserDashBoardPage />}/>
          <Route path="/dashboard/game" element={<GameDashBoardPage />}/>
          <Route path="/dashboard/home" element={<HomeDashBoardPage />}/>
        </Routes>
      </div>
      {window.location.pathname.includes('dashboard') ? null : <Footer style={{ height: "20vh" }} />}
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
    <div className="Board mt-[10vh]">
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
          <AvatarInvetoryPage page='shop' />
      </div>
  )
}

function AvatarInvetory(){
    return (
        <div className="AvartarInventoryPage mt-[5vh]" >
            <AvatarInvetoryPage page='inventory' />
        </div>
    )
}

function CashCharge(){
    return (
        <div className="CashCharge mt-[5vh]" >
            <CashChargePage />
        </div>
    )
}

function PaymentsSuccess(){
    return (
        <div className="PaymentSuccess mt-[5vh]" >
            <Success />
        </div>
    )
}

function PaymentsFail(){
    return (
        <div className="PaymentFail mt-[5vh]" >
            <Fail />
        </div>
    )
}

function TtBoard(){
  return (
    <div className="Board mt-[6.5vh]">
        <TtBoardPage />
    </div>
  )
}

function TtPage(){
  return (
    <div className="Board mt-[10vh]">
        <TutorPage />
    </div>
  )
}

function TtInsert(){
  return (
    <div className="Board mt-[10vh]">
        <TutorInsertPage />
    </div>
  )
}

function DashBoardPage(){
  return (
    <div className="dashboard">
        <DashBoard />
    </div>
  )
}

function UserDashBoardPage(){
  return (
    <div className="dashboard">
        <TablePage dataRow={UserTableRow} dataLabel={userHeadLabel} data={users}/>
    </div>
  )
}

function GameDashBoardPage(){
  return (
    <div className="dashboard">
        <TablePage dataRow={GameTableRow} dataLabel={gameHeadLabel} data={games}/>
    </div>
  )
}

function HomeDashBoardPage(){
  return (
    <div className="dashboard">
        <DashboardHome />
    </div>
  )
}


export default App;
