import React, { useState, useEffect } from 'react';
import { Grid, Table } from '@mui/material';
import TableCell, {setEditingValue} from '../../tableCell';
import AvatarCanvas from '../../../avatarInventory/avatarCanvas';
import {axiosRequest} from '../../../../Utils/networkUtils';
import CircularProgress from '@mui/material/CircularProgress';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';

// export const EditingContext = React.createContext();

function ProfileInfo({state, setState}) {
    const [loading, setLoading] = useState(false); // 수정 로딩 상태
    const [editingId, setEditingId] = useState(null); // 현재 수정 중인 셀의 id
    const [originalContent, setOriginalContent] = useState(null); // 수정 전 셀의 내용
    // const { id } = useParams();
    // const dispatch = useDispatch();
    // const states = useSelector(state => state.dashboardUserProfile.dashboardUserList);
    // const state = states.filter(e => e.userIndex === parseInt(id))[0];
    // 수정 된 셀의 내용을 저장. 
    const handleContentUpdate = (id, newContent) => {
        // if(typeof state === "object" && Object.values(state).length === 0)
        //     return;
        setLoading(true);

        // 수정 된 내용 db에 저장
        const path = 'dashboard/userinfo/update';
        // 모든 정보 보내기
        const body = {
            userIndex: state.userIndex,
            userName: state.userName,
            userNickname: state.userNickname,
            userAddress: state.userAddress,
            userAddressDetail: state.userAddressDetail,
            userEmail: state.userEmail,
            userBirth: state.userBirth,
            userGender: state.userGender,
            userRole: state.userRole,
            userMemo: state.userMemo
        };
        body[id] = newContent;

        axiosRequest(path, body, 'POST', 'json')
            .then((response) => {
                if(response){
                    setState(prevState => ({
                        ...prevState,
                        [id]: newContent
                    }));
                }
                else{
                    alert("수정 실패");
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });



    };
    
  const Loading = () => {
    return (
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      className='bg-black bg-gradient bg-opacity-50'>
        <CircularProgress />
      </div>
    );
  }

  setEditingValue({ editingId, setEditingId, originalContent, setOriginalContent });

  return (
    <div className="profile-info">
        { state?.userIndex && (
            <>
            <h2>프로필 정보</h2>
            <hr />
                <div className='position-relative'>
                    {/* { loading && <CircularProgress className="position-absolute top-50 start-50 translate-middle"/>} */}
                    {!state?.userUpdatedAt && ( {loading} && (
                        <Loading />
                    ))}
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
                                            editable={false}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">이름</th>
                                        <TableCell 
                                            id="userName"
                                            content={state.userName}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">현재 레벨</th>
                                        <TableCell
                                            id="userLevel"
                                            content={state.userLevel}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate}
                                            editable={false}
                                            isLoading={loading} />
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
                                            editable={false}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">닉네임</th>
                                        <TableCell 
                                            id="userNickname"
                                            content={state.userNickname}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">성별</th>
                                        <TableCell 
                                            id="userGender"
                                            content={state.userGender == "m" ? "남자" : "여자"}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate}
                                            isLoading={loading} />
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
                                            onUpdate={handleContentUpdate}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">이메일</th>
                                        <TableCell 
                                            id="userEmail"
                                            content={state.userEmail}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">경험치</th>
                                        <TableCell
                                            id="userLevelExp"
                                            content={state.userLevelExp}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">생년월일</th>
                                        <TableCell 
                                            id="userBirth"
                                            content={state.userBirth}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">가입 날짜</th>
                                        <TableCell 
                                            id="userCreateAt"
                                            content={state.userCreateAt.split(" ")[0]}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate} 
                                            editable={false}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">수정 기록</th>
                                        <TableCell 
                                            id="editHistory"
                                            content={(state.userUpdatedAt ? state.userUpdatedAt.split(" ")[0] : "")}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate} 
                                            editable={false}
                                            isLoading={loading} />
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
                                            onUpdate={handleContentUpdate}
                                            editable={false}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">권한</th>
                                        <TableCell 
                                            id="permissions"
                                            content={state.userRole}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">무료/유료 캐시</th>
                                        <TableCell
                                            id="userFreeCash"
                                            content={state.userFreeCash + "/" + state.userCash}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">출석일수</th>
                                        <TableCell 
                                            id="attendance"
                                            content={state.userAttendance}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate} 
                                            editable={false}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">아바타수</th>
                                        <TableCell 
                                            id="avatarCount"
                                            content={state.userAvatarCount}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate} 
                                            editable={false}
                                            isLoading={loading} />
                                    </tr>
                                    <tr>
                                        <th className="w-[40%]">차단 횟수</th>
                                        <TableCell 
                                            id="blockCount"
                                            content={state.userBannedCount}
                                            className="w-[60%]"
                                            onUpdate={handleContentUpdate} 
                                            editable={false}
                                            isLoading={loading} />
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
                                    id="userMemo"
                                    content={state.userMemo}
                                    colSpan={5}
                                    onUpdate={handleContentUpdate}
                                    isLoading={loading} />
                            </tr>
                        </tbody>
                    </table>
                </div>
            {/* 
                <EditingContext.Provider value={{ editingId, setEditingId, originalContent, setOriginalContent }}>
                </EditingContext.Provider> 
            */}
            </>
        )}

    </div>
  );
}

export default ProfileInfo;
