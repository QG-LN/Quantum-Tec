import '../App.css';
import React, {useState, useEffect, useRef} from 'react';
import Logo from './Pages/MainPage/BringUP_LOGO.png';
import '../App.js';
import Sidebar from './sidebar.js';
import Contact from './contact.js';
import AvatarCanvas from './Pages/avatarInventory/avatarCanvas';
import { useNavigate } from 'react-router';
import { faUser, faUserPlus, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux';

export default function Navbar() {
    const navigate = useNavigate();
    let truelogin = localStorage.getItem("truelogin");
    const cashChange = useSelector(state => state.user.cashChange);

    const [userNickname, setUserNickname] = useState('');               // 사용자 닉네임
    const [userCash, setUserCash] = useState(0);                        // 사용자 유료캐시
    const [userFreeCash, setUserFreeCash] = useState(0);                // 사용자 무료캐시
    const [userAttendance, setUserAttendance] = useState(0);            // 사용자 출석횟수

    const [userCashFormat, setUserCashFormat] = useState('');           // 사용자 유료캐시 포맷
    const [userFreeCashFormat, setUserFreeCashFormat] = useState('');   // 사용자 무료캐시 포맷

    const side = useRef();
    const [isOpen, setOpen] = useState(false);

    // 사이드바 외부 클릭시 닫히는 함수
    const handleClose = async e => {
        let sideArea = side.current;
        let sideCildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideCildren)) {
        await setOpen(false);
        }
    }

    useEffect(()=> {
        window.addEventListener('click', handleClose);
        return () => {
        window.removeEventListener('click', handleClose);
        };
    })
    
    useEffect(() => {
        // 로그인 상태일때 유저 이름 받아오기
        if (truelogin) {
            setUserNickname(localStorage.getItem("userNickname") || '');
            setUserCash(localStorage.getItem("userCash") || 0);
            setUserFreeCash(localStorage.getItem("userFreeCash") || 0);
            setUserAttendance(localStorage.getItem("userAttendance") || 0);

            // 캐시가 99999이상일 때 만원 단위로 표시
            if(userCash > 99999){
                setUserCashFormat((userCash/10000).toFixed(1) + '만');
            }

            if(userFreeCash > 99999){
                setUserFreeCashFormat((userFreeCash/10000).toFixed(1) + '만');
            }
        }
    }, [truelogin, cashChange, userCash, userFreeCash]);

    const handleLogInfo = (e) => {
        // console.log(e.currentTarget)
        // //class이름이 LogInfo인 div태그 속성을 hidden에서 block으로 변경
        // if (e.currentTarget.nextSibling.style.display === 'block')
        //     e.currentTarget.nextSibling.style.display = 'none';
        // else
        //     e.currentTarget.nextSibling.style.display = 'block';
        setOpen(!isOpen);
    }

    const handleInventory = () => {
        navigate('/inventory');
    }

    const handleMyPage = () => {
        navigate('/mypage');
    }

    const handleLogout = () => {
        localStorage.clear();
        document.location.href = "/";
    }

    const handleCashCharge = () => {
        navigate('/cashcharge');
    }

    // 로고 클릭시 맨 위로 이동
    const logoClick = () => {
        navigate('/');
    };


    // 로그인 버튼 클릭시 로그인 페이지로 이동
    const ClickLogin = () => {
        document.location.href = "/login";
    }


    return (
        <div class="fixed top-0 left-0 w-[100%] z-50">
            <Sidebar width={300}>
                <Contact/>
            </Sidebar>
            <nav ref={side} className="navbar navbar-expand-lg" style={{zIndex: '3' ,backgroundColor :'#f6f8fa', height:'60px'}}>
                <div class="block w-[100%] relative mt-1">
                    {/*로고(클릭시 메인화면)*/}
                    <a class="navbar-brand mb-2">
                        <img className='w-[200px] mt-[20px] mx-auto hover:cursor-pointer' src={Logo} onClick={logoClick} />
                    </a>
                    <form class="log_info d-flex justify-end absolute top-5 right-0 mr-10 ">
                        {/*{getUsername()}*/}
                        {/*{getMyCash()}*/}
                        {!truelogin && <button
                            class="btn-outline-dark border-2 border-black hover:bg-green-500 hover:border-green-600 hover:text-white rounded-full mt-[-3px] px-2 py-1 pr-1"
                            type="button" onClick={ClickLogin}>
                            <i class="loginbtn"></i>
                            <span class='font-bold'>
                                    로그인</span>
                        </button>}
                        {truelogin &&
                            <div>
                                <a class='flex openLogInfo' href='javascript:void(0)' onClick={handleLogInfo}>
                                    <div class='flex'>
                                        <div class='mr-3' style={{lineHeight:"2rem"}}>{userNickname}</div>
                                    </div>
                                    <div className='w-8 h-8 rounded-full'>
                                        <AvatarCanvas size={[220,220]} position={[128,128]}/>
                                    </div>
                                </a>
                                {isOpen && <div class='LogInfo w-[320px] absolute bg-light top-[38px] right-0 z-40 overflow-hidden rounded-3 shadow-sm'>
                                    <div class="info_t p-1 border-bottom bg-secondary bg-opacity-25">
                                        <ul class='flex mt-3 pl-2'>
                                            <li class="thum ml-5">
                                                <div className='w-24 h-24 rounded-full'>
                                                    <AvatarCanvas size={[220,220]} position={[128,128]}/>
                                                </div>
                                            </li>
                                            <li class='text-dark ml-3'>
                                                <div class='w-[100%]'>
                                                    <p class='mb-0 ml-2 text-left font-bold'>
                                                        <strong style={{fontSize: '1.2rem'}}>
                                                            {userNickname}
                                                        </strong>
                                                    </p>
                                                    <p class='mb-0 ml-2 text-left' style={{fontSize: '0.9rem'}}>출석 일수 : <span>{userAttendance}일</span></p>
                                                    <p class='mb-0 ml-2 text-left' style={{fontSize: '0.9rem'}}>무료 캐시 : <span>{userFreeCashFormat}원</span></p>
                                                    <p class='mb-0 ml-2 text-left' style={{fontSize: '0.9rem'}}>유료 캐시 : <span>{userCashFormat}원 </span>
                                                        <div onClick={handleCashCharge} class=" bg-yellow-400 rounded-md hover:text-white hover:cursor-pointer d-inline ">
                                                            충전
                                                        </div>
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="info_b text-center d-grid gap-3">
                                        <div class="p-1 mt-2">
                                            <div class="row hover:cursor-pointer hover:text-gray-400">
                                                <div class='col-4'>
                                                    <FontAwesomeIcon icon={faUser} size='lg'/>
                                                </div>
                                                <div class="inline-block text-left col-8" style={{fontSize: '1rem'}}
                                                    onClick={handleMyPage}>
                                                    내정보관리
                                                </div>
                                            </div>

                                        </div>
                                        <div class="p-1">
                                            <div class="row hover:cursor-pointer hover:text-gray-400">
                                                <div class='col-4 pl-1'>
                                                    <FontAwesomeIcon icon={faUserPlus} size='lg'/>
                                                </div>
                                                <div class="inline-block text-left col-8" style={{fontSize: '1rem'}}
                                                    onClick={handleInventory}>
                                                    아바타관리
                                                </div>
                                            </div>
                                        </div>
                                        <div class="p-1 mb-2">
                                            <div class="row hover:cursor-pointer hover:text-gray-400" >
                                                <div class='col-4'>
                                                    <FontAwesomeIcon icon={faPowerOff} size='lg'/>
                                                </div>
                                                <div class="inline-block text-left col-8" style={{fontSize: '1rem'}}
                                                    onClick={handleLogout}>
                                                    로그아웃
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>}
                    </form>
                </div>
            </nav>
        </div>
    );

}
