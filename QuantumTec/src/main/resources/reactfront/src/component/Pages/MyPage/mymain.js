import React, {useState} from 'react';
import Mysection from './mysection';
import Myaside from './myaside';
import MyCash from './mycash';
import Dismember from './dismember';
import PasswordChk from './passwordChk';
import MyMain from './mypage';


export default function Mypage(){

    //카테고리 선택에 따른 값 업데이트
    const [select, setSelect] = useState('');

    //차트 데이터

      

    return(

         <div style={{ display: 'flex' }}> 
            <aside style={{ flexBasis: '15%' }}>
                <Myaside select={select} setSelect={setSelect}/>
            </aside>
            <section style={{ flexBasis: '85%' }}>
                <div>
                    {select ==='마이페이지' || select === '' ? (<MyMain />):(<div/>)}
                    {select ==='사용자설정' ? (<PasswordChk />):(<div/>)}
                    {select ==='결제방식' ? (<MyCash />):(<div/>)}
                    {select ==='회원탈퇴' ? (<Dismember />):(<div/>)}
                </div>
            </section>
         </div>

 )
}