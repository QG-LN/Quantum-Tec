import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfileInfo({ userId }) {
//   const [profile, setProfile] = useState(null);
    const profileInfo = {
        userIndex: 12345,
        userName: "홍길동",
        userNickname: "Gildong",
        userId: "gildong123",
        userBirth: "1990-01-01",
        userEmail: "gildong@example.com",
        userGender: "m",
        userAddress: "서울시 강남구",
        userCreateAt: "2022-01-01"
    };
  
    const additionalInfo = {
        memo: "활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. ",
        attendance: 50,
        blacklist: false,
        permissions: ["사용자"],
        editHistory: ["2022-01-10"],
        posts: 30,
        blockCount: 2
    };

    // useEffect(() => {
    //     axios.get(`/api/users/${userId}/profile`).then(response => {
    //     setProfile(response.data);
    //     });
    // }, [userId]);

    // if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-info">
      <h2>프로필 정보</h2>
      <hr />
    <table className='table table-hover'>
        <tbody>
            <tr style={{backgroundColor: 'var(--bs-yellow)'}}>
                <th style={{width: "13%"}}>사용자 번호</th>
                <td style={{width: "17%"}}>{profileInfo.userIndex}</td>

                <th style={{width: "13%"}}>이름</th>
                <td style={{width: "17%"}}>{profileInfo.userName}</td>

                <th style={{width: "13%"}}>닉네임</th>
                <td style={{width: "17%"}}>{profileInfo.userNickname}</td>
            </tr>
            <tr>
                <th style={{width: "13%"}}>아이디</th>
                <td style={{width: "17%"}}>{profileInfo.userId}</td>

                <th style={{width: "13%"}}>생년월일</th>
                <td style={{width: "17%"}}>{profileInfo.userBirth}</td>

                <th style={{width: "13%"}}>가입 날짜</th>
                <td style={{width: "17%"}}>{profileInfo.userCreateAt}</td>
            </tr>
            <tr>
                <th style={{width: "13%"}}>성별</th>
                <td style={{width: "17%"}}>{profileInfo.userGender == "m" ? "남자" : "여자"}</td>

                <th style={{width: "13%"}}>주소</th>
                <td style={{width: "17%"}}>{profileInfo.userAddress}</td>

                <th style={{width: "13%"}}>이메일</th>
                <td style={{width: "17%"}}>{profileInfo.userEmail}</td>
            </tr>
            <tr>
                <th style={{width: "13%"}}>출석일수</th>
                <td style={{width: "17%"}}>{additionalInfo.attendance}</td>

                <th style={{width: "13%"}}>블랙리스트</th>
                <td style={{width: "17%"}}>{additionalInfo.blacklist ? "Yes" : "No"}</td>

                <th style={{width: "13%"}}>차단 횟수</th>
                <td style={{width: "17%"}}>{additionalInfo.blockCount}</td>
            </tr>
            <tr>
                <th style={{width: "13%"}}>사용자 권한</th>
                <td style={{width: "17%"}}>{additionalInfo.permissions.join(', ')}</td>

                <th style={{width: "13%"}}>개인정보 수정 기록</th>
                <td style={{width: "17%"}}>{additionalInfo.editHistory.join(', ')}</td>

                <th style={{width: "13%"}}>게시글/댓글</th>
                <td style={{width: "17%"}}>{additionalInfo.posts}</td>
            </tr>
            <tr>
                <th style={{width: "13%"}}>메모</th>
                <td colSpan={5}>{additionalInfo.memo}</td>
            </tr>
        </tbody>
    </table>

    </div>
  );
}

export default ProfileInfo;
