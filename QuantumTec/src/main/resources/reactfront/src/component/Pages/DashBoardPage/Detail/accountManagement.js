import React from 'react';

function AccountManagement() {
  return (
    <div className="account-management d-flex justify-content-end">
      <button className='btn btn-danger m-2' onClick={() => {/* 비밀번호 초기화 로직 */}}>비밀번호 초기화</button>
      <button className='btn btn-danger m-2' onClick={() => {/* 계정 활성화/비활성화 로직 */}}>계정 비활성화</button>
      <button className='btn btn-danger m-2' onClick={() => {/* 계정 삭제 로직 */}}>계정 삭제</button>
    </div>
  );
}

export default AccountManagement;
