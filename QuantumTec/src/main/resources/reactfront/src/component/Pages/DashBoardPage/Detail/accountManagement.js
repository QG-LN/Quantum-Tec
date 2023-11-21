import React from 'react';
import {axiosRequest} from '../../../Utils/networkUtils';
import { useState } from 'react';

function AccountManagement({state}) {
  const [boolButtonDisabled, setBoolButtonDisabled] = useState(false);

  const clickPasswordReset = () => {
    setBoolButtonDisabled(true);
    const path = 'dashboard/userinfo/resetpassword';
    const body = {
      userID: state.userID,
      userName: state.userName,
      userEmail: state.userEmail
    }
    console.log(body)
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

  return (
    <div className="account-management d-flex justify-content-end">
      <button className='btn btn-danger m-2' onClick={clickPasswordReset} disabled={boolButtonDisabled}>비밀번호 초기화</button>
      <button className='btn btn-danger m-2' onClick={() => {/* 계정 활성화/비활성화 로직 */}} disabled={boolButtonDisabled}>계정 비활성화</button>
      {/* <button className='btn btn-danger m-2' onClick={() => {}}>계정 삭제</button> */}
    </div>
  );
}

export default AccountManagement;
