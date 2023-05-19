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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function App() {
    // truelogin 값을 로컬 스토리지에서 가져옴, 이때 문자열 값이 아닌 boolean값으로 사용하기 위해서 조건문으로 표시
    let [truelogin, setTruelogin] = useState(localStorage.getItem("truelogin") === "true");

  return (
   <Router>
      <div className="App" style={{overflow:'auto',marginTop:'4%'}}>
        <Navbar start={truelogin}/>
        <Routes>
          <Route path="/" exact element={<Home start={truelogin}/>} />
          <Route path="/login" element={<Login start={truelogin} setTruelogin={setTruelogin} />} />
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/mypage" element={<MyPage />}/>
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
        <div style={{ display: 'flex' }}>
        <header style={{ flexBasis: '70%' }}>
          <Header />
        </header>
        <aside style={{ flexBasis: '30%' }}>
          <Aside start={props.start}/>
        </aside>
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




export default App;
