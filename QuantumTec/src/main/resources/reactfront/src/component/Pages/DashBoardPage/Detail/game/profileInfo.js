import React, { useState, useEffect } from 'react';
import { Grid, Table } from '@mui/material';
import TableCell from '../../tableCell';
import AvatarCanvas from '../../../avatarInventory/avatarCanvas';

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
        <h2>게임 정보</h2>
        <hr />
        <EditingContext.Provider value={{ editingId, setEditingId, originalContent, setOriginalContent }}>
            <Grid container>
                <Grid item xs={12} sm={12} md={2} className='pt-3'>
                    <div>
                        {/* 게임 이미지*/}
                        <AvatarCanvas size={[512,512]} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={3.6}>
                    <table className='table mb-0'>
                        <tbody>
                            <tr>
                                <th className="w-[40%]">게임 번호</th>
                                <TableCell 
                                    id="gameIndex"
                                    content={state.gameIndex}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate}
                                    editable={false} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임명</th>
                                <TableCell 
                                    id="gameName"
                                    content={state.gameName}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                {/* 글자 위로 아이콘 올라가는 거 해결 부탁 */}
                                {/* 글자 크기 제한 추가 */}
                                <th className="w-[40%]"></th>
                                <TableCell 
                                    id="gameId"
                                    content={state.gameId}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">가격</th>
                                <TableCell 
                                    id="gamePrice"
                                    content={state.userNickname}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 개발사</th>
                                <TableCell 
                                    id="gameDeveloper"
                                    content=""
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
                                <th className="w-[40%]">장르</th>
                                <TableCell 
                                    id="gameGenre"
                                    content={state.gameGenre}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">출시일</th>
                                <TableCell 
                                    id="gameReleaseDate"
                                    content={state.gameReleaseDate}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 구매량</th>
                                <TableCell 
                                    id="gamePurchaseCount"
                                    content={state.gamePurchaseCount}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 결제 금액</th>
                                <TableCell 
                                    id="gamePurchaseAmount"
                                    content={state.gamePurchaseAmount}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 평가/댓글</th>
                                <TableCell 
                                    id="gameReviewCount"
                                    content={state.gameReviewCount}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} />
                            </tr>
                        </tbody>
                    </table>
                </Grid>

            </Grid>
            
        </EditingContext.Provider>

    </div>
  );
}

export default ProfileInfo;
