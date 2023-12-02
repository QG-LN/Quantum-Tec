import React from 'react';
import {axiosRequest} from '../../../../Utils/networkUtils';
import { useState } from 'react';

function AccountManagement({state, setState}) {
  const [boolButtonDisabled, setBoolButtonDisabled] = useState(false);

  const clickPasswordReset = () => {
    setBoolButtonDisabled(true);
    const path = 'dashboard/userinfo/resetpassword';
    const body = {
      userID: state.userID,
      userName: state.userName,
      userEmail: state.userEmail
    }
    axiosRequest(path, body, 'POST', 'json')
      .then((response) => {
        if(response)
          alert('초기화된 비밀번호를 이메일로 전송했습니다.');
        else
          alert('비밀번호 초기화에 실패했습니다.');
        setBoolButtonDisabled(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const clickAccountActivation = () => {
    setBoolButtonDisabled(true);
    const path = 'dashboard/userinfo/convertuserstatus';
    const body = {}
    if(state.userStatus === "active"){
      body.userIndex = state.userIndex;
      body.banReason = prompt("사유를 입력해주세요.", "관리자가 계정을 비활성화함");
      body.banSchedule = parseInt(prompt("비활성화 기간을 입력해주세요.", 5));
    }
    else{
      body.userIndex = state.userIndex;
    }
    axiosRequest(path, body, 'POST', 'json')
      .then((response) => {
        if(response){
          alert('계정을 활성화/비활성화 했습니다.');
          setState(prevState => ({ ...prevState, userStatus: prevState.userStatus === "active"?"banned":"active" }))
        }
        else
          alert('계정 활성화/비활성화에 실패했습니다.');
        setBoolButtonDisabled(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="account-management d-flex justify-content-end">
      <button className='btn btn-danger m-2' onClick={clickPasswordReset} disabled={boolButtonDisabled}>비밀번호 초기화</button>
      <button className='btn btn-danger m-2' onClick={clickAccountActivation} disabled={boolButtonDisabled}>계정 {state.userStatus === "active"?"비":""}활성화</button>
      {/* <button className='btn btn-danger m-2' onClick={() => {}}>계정 삭제</button> */}
    </div>
  );
}

export default AccountManagement;
