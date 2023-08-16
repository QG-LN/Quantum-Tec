import React, {useState} from 'react';
import Logo from './Pages/MainPage/BringUP_LOGO.png';
export default function Footer(){
    const [noticeTitle, setNoticeTitle] = useState('[공지] 6/13(화) 브링업 업데이트 안내');

    // 첫줄 nav
    const nav_1 = [
        {
          text: '이용약관',
          link: "",
        },
        {
          text: '개인정보처리방침',
          link: "",
       },
         {
            text: '고객센터',
            link: "",
            },
        ];

        // 두번째줄 nav
        const nav_2 = [
            {
              text: '회사소개',
              link: "",
            },
            ];
    
    const onClickNotice = () => {
        window.location.href = "https://notice.nexon.com/Notice/NoticeView?sn=141225&amp;maskgamecode=65536";
    }


    return(
        <>
        <footer class="bg-black footer text-left">
        <p class="notice h-[73px] pt-[20px] pl-[40px] pr-0 pb-0 border-b-2 border-gray-500">
            <a href="notice" class='text-white no-underline' onclick={onClickNotice}>{noticeTitle}</a>
        </p>

        <ul class='flex'>
        {nav_1.map((item, index) => (
                                  <li class='text-xl hover:cursor-pointer px-2' key={index} ><a class=' no-underline text-white text-base opacity-70' href={item.link}>{item.text}</a>
                                  <span class='ml-3 text-white text-xl opacity-30'>|</span>
                                </li>
                               ))}
            
        </ul>
        <ul class='flex mt-[-15px]'>
        {nav_2.map((item, index) => (
                                  <li class='text-xl hover:cursor-pointer px-2' key={index}><a class=' no-underline text-white text-base opacity-70' href={item.link}>{item.text}</a>
                                  <span class='ml-3 text-white text-xl opacity-30'>|</span>
                                </li>
                               ))}
        </ul>

        <address class="pt-[16px] pr-[96px] pb-0 pl-[40px] text-xs leading-[17px] tracking-[-.3px] mt-[-20px] text-white opacity-50">
            <span>(창)QuantumTec</span>
            <span>경기도 의정부시 서부로 545 효행관 404</span>
        </address>
            <p class="text-left pl-[40px] text-xs text-white-50 mb-0 tracking-[-.3px] mt-[-12px]">© Bring UP Corporation All Rights Reserved.</p>
        <img class="pl-[40px] w-[9%] mt-2" src={Logo} alt=""></img>
    </footer>
        </>
    );
}