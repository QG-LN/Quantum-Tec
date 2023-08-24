import React from "react";
import AvatarCanvas from "./Pages/avatarInventory/avatarCanvas";

export default function Contact() {
    let truelogin = false;
    if (localStorage.getItem("truelogin") === "true") {
        truelogin = true;
    }
    // 로그인 상태일때 유저 이름 받아오기
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
                <div className="w-full lg:w-6/12">
                        {!truelogin && <img src="https://kr.seaicons.com/wp-content/uploads/2015/10/User-icon3.png"
                                            alt=""/>}
                        {truelogin && <AvatarCanvas/>}
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                {/*커뮤니티게시판, 튜터링게시판 이동 버튼 list*/}
                <h5 className="text-2xl font-semibold">게시판</h5>
                <hr className="w-[100%] mt-[1%] border-0 bg-black opacity-100 h-[2px]"/>

                <nav className="flex flex-col list-none">
                    <li className="nav-item">
                        <a className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-black hover:opacity-75 no-underline"
                           href="/board/0">
                            <i className="fab fa-facebook-square text-xs leading-lg text-black opacity-75"></i><span
                            className="ml-2">통합게시판</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-black hover:opacity-75 no-underline"
                           href="/board/1">
                            <i className="fab fa-facebook-square text-xs leading-lg text-black opacity-75"></i><span
                            className="ml-2">자유게시판</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-black hover:opacity-75 no-underline"
                           href="/board/2">
                            <i className="fab fa-facebook-square text-xs leading-lg text-black opacity-75"></i><span
                            className="ml-2">튜터링</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-black hover:opacity-75 no-underline"
                           href="/board/3">
                            <i className="fab fa-facebook-square text-xs leading-lg text-black opacity-75"></i><span
                            className="ml-2">공지사항</span>
                        </a>
                    </li>
                </nav>

                <h5 className="text-2xl font-semibold mt-10">아바타</h5>
                <hr className="w-[100%] mt-[1%] border-0 bg-black opacity-100 h-[2px]"/>
                <nav className="flex flex-col list-none">
                    <li className="nav-item">
                        <a className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-black hover:opacity-75 no-underline"
                           href="/avatarshop">
                            <i className="fab fa-facebook-square text-xs leading-lg text-black opacity-75"></i><span
                            className="ml-2">아바타 상점</span>
                        </a>
                    </li>
                </nav>
            </div>
        </div>
    )
}