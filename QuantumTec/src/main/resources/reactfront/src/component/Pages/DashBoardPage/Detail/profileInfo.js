import React, { useState, useEffect } from 'react';
import { Grid, Table } from '@mui/material';
import TableCell from '../tableCell';
import AvatarCanvas from '../../avatarInventory/avatarCanvas';

export const EditingContext = React.createContext();

function ProfileInfo({state, setState}) {
    const [editingId, setEditingId] = useState(null); // 현재 수정 중인 셀의 id
    const [originalContent, setOriginalContent] = useState(null); // 수정 전 셀의 내용


    // 수정 된 셀의 내용을 저장. 
    const handleContentUpdate = (id, newContent) => {
        
        setState(prevState => ({
            ...prevState,
            [id]: newContent
        }));
    };
    
  

  return (
    <div className="profile-info">
        <h2>프로필 정보</h2>
        <hr />
        <EditingContext.Provider value={{ editingId, setEditingId, originalContent, setOriginalContent }}>
            <Grid container>
                <Grid item xs={12} sm={12} md={2} className='pt-3'>
                    <div>
                        <AvatarCanvas size={[512,512]} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={3.6}>
                    <table className='table mb-0'>
                        <tbody>
                            <tr>
                                <th className="w-[40%]">사용자 번호</th>
                                <TableCell 
                                    id="userIndex"
                                    content={state.userIndex}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate}
                                    editable={false} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">이름</th>
                                <TableCell 
                                    id="userName"
                                    content={state.userName}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                {/* 글자 위로 아이콘 올라가는 거 해결 부탁 */}
                                {/* 글자 크기 제한 추가 */}
                                <th className="w-[40%]">아이디</th>
                                <TableCell 
                                    id="userId"
                                    content={state.userID}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">닉네임</th>
                                <TableCell 
                                    id="userNickname"
                                    content={state.userNickname}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">성별</th>
                                <TableCell 
                                    id="userGender"
                                    content={state.userGender == "m" ? "남자" : "여자"}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={12} sm={12} md={3.6}>
                    <table className='table m-0'>
                        <tbody>
                            <tr>
                                <th className="w-[40%]">주소</th>
                                <TableCell 
                                    id="userAddress"
                                    content={state.userAddress + " " + state.userAddressDetail}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">이메일</th>
                                <TableCell 
                                    id="userEmail"
                                    content={state.userEmail}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">생년월일</th>
                                <TableCell 
                                    id="userBirth"
                                    content={state.userBirth}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">가입 날짜</th>
                                <TableCell 
                                    id="userCreateAt"
                                    content={state.userCreateAt.split(" ")[0]}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">수정 기록</th>
                                <TableCell 
                                    id="editHistory"
                                    content={(state.userUpdatedAt ? state.userUpdatedAt.split(" ")[0] : "")}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} />
                            </tr>
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={12} sm={12} md={2.7}>
                    <table className='table m-0'>
                        <tbody>
                            <tr>
                                <th className="w-[40%]">블랙리스트</th>
                                <TableCell 
                                    id="blacklist"
                                    content={state.userStatus === "inactive" || state.userStatus === "banned" ? "Yes" : "No"}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">권한</th>
                                <TableCell 
                                    id="permissions"
                                    content={state.userRole}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">출석일수</th>
                                <TableCell 
                                    id="attendance"
                                    content={state.userAttendance}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">아바타수</th>
                                <TableCell 
                                    id="avatarCount"
                                    content={state.userAvatarCount}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">차단 횟수</th>
                                <TableCell 
                                    id="blockCount"
                                    content={state.userBannedCount}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} />
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
                        <th className="w-[5%]">메모</th>
                        <TableCell 
                            id="memo"
                            content={state.memo}
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
