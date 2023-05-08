import Userimg from './asideImg.js';
import '../../../App.css';
import '../../../styles.css';

export default function AsideLogin() {


    /*로그인 확인 임시 false 비로그인/true 로그인*/
    const truelogin = true;
    
    const username = '안녕하세요경민대학교';
    const usercash = '10000';
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
                    <span class='inline ml-4 pt-5 mt-5 loginstyle'><div>{username}</div>{usercash}</span>
                    <span class='inline'><Userimg /></span>
                </div> }
                
            </div>
        </div>


        
        </>
    );

}