import Userimg from './asideImg.js';
import '../../../App.css';
import '../../../styles.css';
import { useNavigate } from 'react-router';

export default function AsideLogin(props) {
    /*로그인 확인 임시 false 비로그인/true 로그인*/
    let truelogin=props.start;
    
    // 로그인 상태일때 유저 이름 받아오기
    let username = localStorage.getItem("userNickname");

    // 로그인 상태일때 유저 캐시 받아오기
    let usercash = localStorage.getItem("userCash");

    const navigate = useNavigate();

    // 마이페이지로 이동
    const OnClickMyPage = () => {
        navigate('/mypage');
    }

    // 로그인 페이지로 이동
    const ClickLogin = () => {
        document.location.href = "/login";
      }
    
    // 회원가입 페이지로 이동
    const ClickSign = () => {
        document.location.href = "/signup";
    }
    return (
        <>
        <div class="container">
            <div class="row pb-5">
                {/*로그인상태가 아닐때*/}
                {console.log(truelogin)}
                {!truelogin && <div class="col-sm">
                    <div class='left pt-[70px] pl-[56px] h-[297px]  ml-[10px] bg-white'>
                        <button type="button" class="btn btn-primary btn-lg btn-block w-[353px] inline-block h-[60px] pt-[22px] text-center bg-black rounded-none" onClick={ClickLogin} >로그인 페이지로 이동</button>
                        <div class='flex justify-center'>
                            <div class='p-1 m-1 text-gray-500 hover:text-blue-800 hover:font-bold hover:cursor-pointer' onClick={ClickSign}>아이디/비밀번호 찾기</div>
                            <div class='p-1 m-1 text-gray-500 hover:text-blue-800 hover:font-bold hover:cursor-pointer' onClick={ClickSign}>회원가입</div>
                        </div>
                    </div>
                </div>}               
                {/*로그인상태일때*/}               
                {truelogin &&<div class="col-sm flex " >
                    <button button type="button" class="btn btn-primary" onClick={OnClickMyPage}>마이 페이지</button>
                    <span class='inline ml-4 pt-5 mt-5 loginstyle'><div>{username}</div>{usercash}</span>
                    <span class='inline'><Userimg /></span>
                </div> }
                
            </div>
        </div>


        
        </>
    );

}