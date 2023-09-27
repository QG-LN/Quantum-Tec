import React, { useRef, useState } from "react";
import OpenKakao from "../../../image/kakaoOpenChat.png";
import emptyuser from "../../../image/emptyuser.png";
import { Link } from "react-router-dom";

export default function TutorPage() {
  const boardName = "오늘은 무엇을 스터디해볼까요?";
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
          <div className=" cursor-pointer text-lg font-bold">marais</div>
        </div>
        <div className="w-[2px] h-5 bg-slate-300"></div>
        <div className="text-lg mr-[-11px]">작성일</div>
        <div className=" text-lg text-slate-700">2023.09.16</div>
      </div>

      <section
        className=" text-inherit"
        style={{ boxSizing: "inherit", fontFamily: "inherit" }}
      >
        <ul className=" grid gap-y-6 grid-cols-2 mt-[60px]">
          <li className=" flex relative items-center font-bold text-xl">
            <span className=" mr-8">모집 구분</span>
            <span className="">스터디</span>
          </li>
          <li className="flex relative items-center font-bold text-xl">
            <span className="mr-8">진행 방식</span>
            <span className="">온라인</span>
          </li>
          <li className="flex relative items-center font-bold text-xl">
            <span className="mr-8">모집 인원</span>
            <span className="">10명 이상</span>
          </li>
          <li className="flex relative items-center font-bold text-xl">
            <span className="mr-8">시작 예정</span>
            <span className="">2023.10.01</span>
          </li>
          <li className="flex relative items-center font-bold text-xl">
            <span className="mr-8">강사 연락처</span>
            <div className=" absolute left-32 rounded-xl ">
              <a
                className="flex"
                href="https://open.kakao.com/o/"
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
            <span className="">3개월</span>
          </li>
        </ul>
        <div className="flex mt-6 pl-8">
          <li className="flex relative items-center font-bold text-xl flex-1">
            <span className="mr-8">모집 분야</span>
            <ul
              className="flex items-center gap-3 p-0 m-0"
              style={{ gridGap: "12px" }}
            >
              <li className="px-[10px] py-[6px] bg-slate-300 rounded-2xl font-bold text-sm text-center text-slate-700">
                전체
              </li>
            </ul>
          </li>
          <li className="flex relative items-center font-bold text-xl flex-1">
            <span className="mr-8">과목</span>
            <ul
              className="flex items-center gap-3 p-0 m-0"
              style={{ gridGap: "12px" }}
            >
              <li className="h-9 w-[36px]">
                <img className="" src="" alt="language" />
              </li>
              <li className="h-9 w-[36px]">
                <img className="" src="" alt="language" />
              </li>
              <li className="h-9 w-[36px]">
                <img className="" src="" alt="language" />
              </li>
              <li className="h-9 w-[36px]">
                <img className="" src="" alt="language" />
              </li>
              <li className="h-9 w-[36px]">
                <img className="" src="" alt="language" />
              </li>
            </ul>
          </li>
        </div>
      </section>
      <div className=" mt-32 text-lg break-words tracking-[-0.004em]">
        <h2 className=" font-bold text-2xl pb-6 border-b-4 text-left">
          튜터링 소개
        </h2>
        <div className=" w-[100%] mt-10 mx-auto mb-0">
          <p className="m-0 text-left">소개글</p>
          <p className="m-0">
            <br />
          </p>
          <p className="m-0 text-left">수업 전반적인 내용</p>
        </div>
      </div>
      <div className='flex mx-auto'>
        <div class="flex mt-4 mb-6 mr-10">
            <Link to={`/tutoring`} className="dropdown-item hover:cursor-pointer"> <button
            class="py-3 px-6 h-10 bg-green-700 rounded-[50px] font-bold text-white text-base/none"
            name="register"
          > 뒤로가기</button></Link>
           
          
        </div>
        <div class="flex justify-end mt-4 mx-0 mb-6">
          <button
            class="py-3 px-6 h-10 bg-green-700 rounded-[50px] font-bold text-white text-base/none"
            name="register"
            onClick={tutorbutton}
          >
            신청하기
          </button>
        </div>
      </div>
    </div>
  );
}
