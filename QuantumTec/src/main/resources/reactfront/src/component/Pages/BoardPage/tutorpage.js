import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal"; // Bootstrap Modal 추가
import Button from "react-bootstrap/Button"; // Bootstrap Button 추가
import "../../../App.css";
import axios from "axios";

//이미지
import OpenKakao from "../../../image/kakaoOpenChat.png";
import emptyuser from "../../../image/emptyuser.png";
import backpage from "../../../image/backpage.png";
import check from "../../../image/check.png";

import allsubject from "../../../image/allsubject.png"; //전체과목

export default function TutorPage() {
  const [boardName, setBoardName] = useState("오늘은 무엇을 스터디해볼까요?");
  const [boardId, setBoardId] = useState(1);
  const [username, setUsername] = useState("marais");
  const [tutorType, setTutorType] = useState("스터디");
  const [boarddate, setBoarddate] = useState("2023.09.16");
  const [tutorplaying, setTutorplaying] = useState("온라인");
  const [tutorrecruit, setTutorrecruit] = useState("10명 이상");
  const [tutorstart, setTutorstart] = useState("2023년 10월 01일");
  const [tutorcontact, setTutorcontact] = useState("https://open.kakao.com/o/");
  const [tutorduration, setTutorduration] = useState("3개월");
  const [tutorfield, setTutorfield] = useState(["전체"]);
  const [tutorsubject, setTutorsubject] = useState([]);
  const [tutorintro, setTutorintro] = useState("소개글");
  const [tutorcontent, setTutorcontent] = useState("수업 전반적인 내용");

  let userimg = "";

  // userimg가 비어있으면 emptyuser를 넣고 아니면 userimg를 넣는다.
  if (userimg === "") {
    userimg = emptyuser;
  }

  const backbutton = () => {
    console.log("신청하기");
  };
  const tutorbutton = () => {
    console.log("신청하기");
  };
  const customModalStyles = {
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [buttons, setButtons] = useState([
    {
      id: 1,
      text: "뒤로가기",
      to: "/tutoring",
      image: backpage,
      isHovered: false,
    },
    {
      id: 2,
      text: "신청하기",
      showModal: false,
      image: check,
      isHovered: false,
    },
    {
      id: 3,
      text: "Button 3",
      to: "/button3",
      image: "image3.jpg",
      isHovered: false,
    },
  ]);
  
  //버튼위에 마우스 올렸을때
  const handleMouseEnter = (id) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id ? { ...button, isHovered: true } : button
      )
    );
  };
  //버튼위에 마우스 떠날때
  const handleMouseLeave = (id) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id ? { ...button, isHovered: false } : button
      )
    );
  };

  const handleButtonClick = (id) => {
    // 버튼 클릭 이벤트
    if (id === 2) {
      // 버튼 2를 클릭하면 모달을 열도록 설정
      setButtons((prevButtons) =>
        prevButtons.map((button) =>
          button.id === id ? { ...button, showModal: true } : button
        )
      );
    }
  };

  //모달창-신청하기버튼
  const acceptModal = () => {
    // 신청하기 하면 실행되야되는부분
    console.log("신청됨");
    // 모달 닫기
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === 2 ? { ...button, showModal: false } : button
      )
    );
  };

  //모달창-닫기버튼
  const closeModal = () => {
    // 모달 닫기
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === 2 ? { ...button, showModal: false } : button
      )
    );
  };

  //스크롤 퀵메뉴
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 데이터베이스에서 tutorsubject 값을 가져오는 API 호출
      axios
        .get("주소")
        .then((response) => {
          // API 응답 데이터에서 tutorsubject 값을 추출하고 상태를 업데이트
          setTutorsubject(response.data.tutorsubject || [allsubject]); // 값이 없을 경우 전체 이미지로 표시
        })
        .catch((error) => {
          console.error("API 호출 에러:", error);
        });

      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const top = 250;

  return (
    <div className=" max-w-4xl w-[100%] flex flex-col mx-auto my-0 px-6 pt-6 pb-20">
      <div className=" mt-10 font-extrabold text-4xl tracking-[-.005em] text-left">
        {boardName}
      </div>
      <div className=" mt-8 pb-8 border-b-2 flex gap-4 items-center">
        <div className="flex items-center relative">
          <img
            className=" cursor-pointer block h-12 w-[3rem] mr-2 rounded-[50%] object-cover"
            src={userimg}
            alt="userImg"
          />
          <div className=" cursor-pointer text-lg font-bold">{username}</div>
        </div>
        <div className="w-[2px] h-5 bg-slate-300"></div>
        <div className="text-lg mr-[-11px]">작성일</div>
        <div className=" text-lg text-slate-700">{boarddate}</div>
      </div>

      <section
        className=" text-inherit"
        style={{ boxSizing: "inherit", fontFamily: "inherit" }}
      >
        <ul className=" grid gap-y-6 grid-cols-2 mt-[60px]">
          <li className=" flex relative items-center font-bold text-xl">
            <span className=" mr-8">모집 구분</span>
            <span className="">{tutorType}</span>
          </li>
          <li className="flex relative items-center font-bold text-xl">
            <span className="mr-8">진행 방식</span>
            <span className="">{tutorplaying}</span>
          </li>
          <li className="flex relative items-center font-bold text-xl">
            <span className="mr-8">모집 인원</span>
            <span className="">{tutorrecruit}</span>
          </li>
          <li className="flex relative items-center font-bold text-xl">
            <span className="mr-8">시작 예정</span>
            <span className="">{tutorstart}</span>
          </li>
          <li className="flex relative items-center font-bold text-xl">
            <span className="mr-8">강사 연락처</span>
            <div className=" absolute left-32 rounded-xl ">
              <a
                className="flex"
                href={tutorcontact}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className=" cursor-pointer block h-[30px] w-[30px] mr-2 rounded-[50%] object-cover"
                  src={OpenKakao}
                  alt="openkakao"
                />
              </a>
            </div>
          </li>
          <li className="flex relative items-center font-bold text-xl">
            <span className="mr-8">예상 기간</span>
            <span className="">{tutorduration}</span>
          </li>
        </ul>
        <div className="flex mt-6 pl-8">
          <li className="flex relative items-center font-bold text-xl flex-1">
            <span className="mr-8">모집 분야</span>
            <ul
              className="flex items-center gap-3 p-0 m-0"
              style={{ gridGap: "12px" }}
            >
              {tutorfield.map((field, index) => (
                <li
                  key={index}
                  className="px-[10px] py-[6px] bg-slate-300 rounded-2xl font-bold text-sm text-center text-slate-700"
                >
                  {field}
                </li>
              ))}
            </ul>
          </li>
          <li className="flex relative items-center font-bold text-xl flex-1">
            <span className="mr-8">과목</span>
            <ul className="my-auto">
              {tutorsubject.length > 0 ? (
                tutorsubject.map((subject, index) => (
                  <li key={index}>
                    <img
                      src={subject}
                      className=" h-[30px] w-[30px]"
                      alt="과목 이미지"
                    />
                  </li>
                ))
              ) : (
                <li>
                  <img
                    src={allsubject}
                    className="h-[30px] w-[30px]"
                    alt="전체 과목 이미지"
                  />
                </li>
              )}
            </ul>
          </li>
        </div>
      </section>
      <div className=" mt-32 text-lg break-words tracking-[-0.004em]">
        <h2 className=" font-bold text-2xl pb-6 border-b-4 text-left">
          튜터링 소개
        </h2>
        <div className=" w-[100%] mt-10 mx-auto mb-0">
          <p className="m-0 text-left">{tutorintro}</p>
          <p className="m-0">
            <br />
          </p>
          <p className="m-0 text-left">{tutorcontent}</p>
        </div>
      </div>
      <div className="sticky-menu" style={{ top: `${top}px` }}>
        <div className="button-container">
          {buttons.map((button) => (
            <div
              key={button.id}
              className={`image-button ${button.isHovered ? "expanded" : ""}`}
              onMouseEnter={() => handleMouseEnter(button.id)}
              onMouseLeave={() => handleMouseLeave(button.id)}
            >
              <div className="button-content flex">
                <img
                  src={button.image}
                  class="w-[30px] h-[30px]"
                  alt={button.text}
                />
                <Link
                  to={button.to}
                  className={`text ${button.isHovered ? "visible" : ""}`}
                  onClick={() => handleButtonClick(button.id)}
                >
                  {button.text}
                </Link>
              </div>
              {button.showModal && (
                <Modal
                  show={true}
                  onHide={closeModal}
                  style={customModalStyles}
                  contentLabel="Example Modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Modal Content</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>정말로 신청하시겠습니까?</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={acceptModal}>
                      신청하기
                    </Button>
                    <Button variant="secondary" onClick={closeModal}>
                      종료하기
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
