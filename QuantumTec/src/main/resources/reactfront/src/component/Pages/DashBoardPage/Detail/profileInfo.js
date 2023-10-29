import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Table } from '@mui/material';
import TableCell from '../tableCell';

export const EditingContext = React.createContext();

function ProfileInfo({ userId }) {
    const [editingId, setEditingId] = useState(null); // 현재 수정 중인 셀의 id
    const [originalContent, setOriginalContent] = useState(null); // 수정 전 셀의 내용

    // 수정 된 셀의 내용을 저장. 
    const handleContentUpdate = (id, newContent) => {
        if (profileInfo.hasOwnProperty(id)) {
            setProfileInfo(prevState => ({
                ...prevState,
                [id]: newContent
            }));
        } else if (additionalInfo.hasOwnProperty(id)) {
            setAdditionalInfo(prevState => ({
                ...prevState,
                [id]: newContent
            }));
        }
        console.log(newContent)
    };
    

    const [profileInfo, setProfileInfo] = useState({
        userIndex: 12345,
        userName: "홍길동",
        userNickname: "Gildong",
        userId: "MMMMMMMMMMMMMMMMMMMM",
        userBirth: "1990-01-01",
        userEmail: "gildong@example.com",
        userGender: "m",
        userAddress: "서울시 강남구",
        userCreateAt: "2022-01-01"
    });
  
    const [additionalInfo, setAdditionalInfo] = useState({
        memo: "활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. 활발한 활동을 보이고 있습니다. ",
        attendance: 50,
        blacklist: false,
        permissions: ["사용자"],
        editHistory: ["2022-01-10"],
        avatarCount: 5,
        blockCount: 2
    });

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
        <EditingContext.Provider value={{ editingId, setEditingId, originalContent, setOriginalContent }}>
            <Grid container>
                <Grid item xs={12} sm={12} md={4}>
                    <table className='table mb-0'>
                        <tbody>
                            <tr>
                                <th className="w-[40%]">사용자 번호</th>
                                <TableCell 
                                    id="userIndex"
                                    content={profileInfo.userIndex}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">이름</th>
                                <TableCell 
                                    id="userName"
                                    content={profileInfo.userName}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                {/* 글자 위로 아이콘 올라가는 거 해결 부탁 */}
                                {/* 글자 크기 제한 추가 */}
                                <th className="w-[40%]">아이디</th>
                                <TableCell 
                                    id="userId"
                                    content={profileInfo.userId}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">닉네임</th>
                                <TableCell 
                                    id="userNickname"
                                    content={profileInfo.userNickname}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">성별</th>
                                <TableCell 
                                    id="userGender"
                                    content={profileInfo.userGender == "m" ? "남자" : "여자"}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <table className='table m-0'>
                        <tbody>
                            <tr>
                                <th className="w-[40%]">생년월일</th>
                                <TableCell 
                                    id="userBirth"
                                    content={profileInfo.userBirth}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">사용자 권한</th>
                                <TableCell 
                                    id="permissions"
                                    content={additionalInfo.permissions.join(', ')}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">출석일수</th>
                                <TableCell 
                                    id="attendance"
                                    content={additionalInfo.attendance}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">아바타수</th>
                                <TableCell 
                                    id="avatarCount"
                                    content={additionalInfo.avatarCount}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">차단 횟수</th>
                                <TableCell 
                                    id="blockCount"
                                    content={additionalInfo.blockCount}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <table className='table m-0'>
                        <tbody>
                            <tr>
                                <th className="w-[40%]">블랙리스트</th>
                                <TableCell 
                                    id="blacklist"
                                    content={additionalInfo.blacklist ? "Yes" : "No"}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">주소</th>
                                <TableCell 
                                    id="userAddress"
                                    content={profileInfo.userAddress}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">이메일</th>
                                <TableCell 
                                    id="userEmail"
                                    content={profileInfo.userEmail}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">가입 날짜</th>
                                <TableCell 
                                    id="userCreateAt"
                                    content={profileInfo.userCreateAt}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">개인정보 수정 기록</th>
                                <TableCell 
                                    id="editHistory"
                                    content={additionalInfo.editHistory.join(', ')}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                        </tbody>
                    </table>
                </Grid>
            </Grid>
            <table className='table'>
                <tbody>
                    <tr>
                        {/* 글자 위로 아이콘 올라가는 거 해결 부탁 */}
                        {/* textarea로 변경 */}
                        <th className="w-[13%]">메모</th>
                        <TableCell 
                            id="memo"
                            content={additionalInfo.memo}
                            colSpan={5}
                            onUpdate={handleContentUpdate} />
                    </tr>
                </tbody>
            </table>
        </EditingContext.Provider>

    </div>
  );
}

export default ProfileInfo;
