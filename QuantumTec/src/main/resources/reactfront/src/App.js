import './App.css';
import './styles.css';
import  Navbar from './component/navbar.js';
import Header from './component/Pages/MainPage/header.js';
import Section from './component/Pages/MainPage/section.js';
import Aside from './component/Pages/MainPage/asideLogin';
import Footer from './component/footer.js';
import Loginpage from './component/Pages/LoginPage/login.js';
import Signpage from './component/Pages/LoginPage/sign.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

let truelogin=false;

function App() {
  
  return (
   <Router>
      <div className="App">
        <Navbar start={truelogin}/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}



function Home() {
  return (
    <div className="Home">
          {/*위에 광고 화면과 로그인 크기 맞추기위해 설정해놓음*/}
        <div style={{ display: 'flex' }}>
        <header style={{ flexBasis: '70%' }}>
          <Header />
        </header>
        <aside style={{ flexBasis: '30%' }}>
          <Aside start={truelogin}/>
        </aside>
      </div>
      <Section />
        </div>
  );
}

function Login(){
  return (
    <div className="Login">
      <Loginpage />
    </div>
  );
}

function SignUp(){
  return (
    <div className="SignUp">
      <Signpage />
    </div>
  );
}




export default App;
