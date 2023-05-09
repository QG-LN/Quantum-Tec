import Userimg from './asideImg.js';
import '../../../App.css';
import '../../../styles.css';
import axios from 'axios';

export default function AsideLogin(props) {


    /*로그인 확인 임시 false 비로그인/true 로그인*/
    let truelogin = false;
    truelogin=props.start;
    
    // 로그인 상태일때 유저 이름 받아오기
    let username = 'test';
    const getUsername = () => { axios.get('/user_inform/username')
    .then(res => username = res.data.username)
    .catch(username = '응없어')
    };

    // 로그인 상태일때 유저 캐시 받아오기
    let usercash = '10000';
    const getUsercash = () => { axios.get('/user_inform/usercash')
    .then(res => usercash = res.data.usercash)
    .catch(usercash = '0000')
    };


    const ClickLogin = () => {
        document.location.href = "/login";
      }
    return (
        <>
        <div class="container">
            <div class="row pb-5">
                {/*로그인상태가 아닐때*/}
                {!truelogin && <div class="col-sm">
                    <button type="button" class="btn btn-primary btn-lg btn-block btnstyle" onClick={ClickLogin} >Login</button>
                </div>}               
                {/*로그인상태일때*/}               
                {truelogin &&<div class="col-sm flex" >
                    {getUsername()}
                    {getUsercash()}
                    <span class='inline ml-4 pt-5 mt-5 loginstyle'><div>{username}</div>{usercash}</span>
                    <span class='inline'><Userimg /></span>
                </div> }
                
            </div>
        </div>


        
        </>
    );

}