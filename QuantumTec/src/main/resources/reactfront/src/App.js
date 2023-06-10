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
import AvatarMain from './component/Pages/AvatarShopPage/avatarMain';
import AvatarSide from './component/Pages/AvatarShopPage/avatarSide';
import AvatarCategory from './component/Pages/AvatarShopPage/avatarCategory';
import AvatarSearch from './component/Pages/AvatarShopPage/avatarSearch';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
          <Route path="/gamepage" element={<GamePage />}/>
          <Route path="/avatarshop" element={<AvatarMainPage />}/>
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

function AvatarMainPage(){
  const [page, setPage] = useState("추천");
  const [category, setCategory] = useState(["추찬"]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/avatar/hat')
      .then((response) => {
        setCategory(category.concat(response.data));
    })
      .catch((error) => {
          console.log(error);
    });
    const tempArray = []
    tempArray.push('모자');
    tempArray.push('악세서리');
    tempArray.push('머리카락');
    tempArray.push('이너');
    tempArray.push('아웃터');
    tempArray.push('바지');
    tempArray.push('치마');
    tempArray.push('원피스');
    tempArray.push('신발');
    tempArray.push('구두');
    tempArray.push('배경');
    tempArray.push('가구');
    setCategory(category.concat(tempArray));
  }, []);
  const handlePage = (e) => {
    if(e.target.id === "")
      setPage(e.target.parentNode.parentNode.id)
    else
      setPage(e.target.id);
    //console.log(page)
  }


  return (
    <div className="AvatarMainPage container" style={{ height: "95vh" }}>
      <div className="row justify-content-center h-[100%]">
        <div className="col-3 ps-0 pe-0">
          <ScrollContainer>
            <AvatarSide onClick={handlePage}/>
          </ScrollContainer>
        </div>
        <div className="col-9 ps-0 pe-0">
          <ScrollContainer>
            {page === "추천"?<AvatarMain />:category.indexOf(page)?<AvatarCategory key={page} categoryName={page} />:<AvatarSearch key={page} searchName={page} />}
          </ScrollContainer>
        </div>
      </div>
    </div>
  )
}

const ScrollContainer = styled.div`
  height: 95vh;
  overflow-y: auto;
  background-color: var(--bs-gray-200)
  `;


export default App;
