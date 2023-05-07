import './App.css';
import './styles.css';
import  Navbar from './component/navbar.js';
import Header from './component/header.js';
import Section from './component/section.js';
import Aside from './component/asideLogin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

const ClickLogin = () => {
  document.location.href = "/login";
}
function App() {
  return (
   <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
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
          <Aside />
        </aside>
      </div>
      <Section />
        </div>
  );
}

function Login(){
  return (
    <div className="Login">
      <Aside />
    </div>
  );
}




export default App;
