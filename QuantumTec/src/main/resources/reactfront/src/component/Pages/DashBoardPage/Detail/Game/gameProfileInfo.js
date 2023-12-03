import React, { useState, useEffect, useRef } from 'react';
import { Grid, Table } from '@mui/material';
import TableCell from '../../tableCell';
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../../../Utils/networkUtils";
import axios from "axios";
import GameImage from '../../../GamePage/gpimage';

// export const EditingContext = React.createContext();

function ProfileInfo({state, setState}) {
    const [loading, setLoading] = useState(false); // 수정 로딩 상태
    const [editingId, setEditingId] = useState(null); // 현재 수정 중인 셀의 id
    const [originalContent, setOriginalContent] = useState(null); // 수정 전 셀의 내용

    const [gameImageList, setGameImageList] = useState([]); // 게임의 이미지를 저장할 state
    const imagePath = "http://localhost:9090/image/game"; // 이미지 경로
    const imageListPath = "http://localhost:9090/image/game/list"; // 이미지 리스트 경로

    const table1Ref = useRef(null);
    const table2Ref = useRef(null);

    const adjustRowHeights = () => {
        const tables = [table1Ref.current, table2Ref.current];
        let maxRowCount = 0;

        tables.forEach(table => {
            maxRowCount = Math.max(maxRowCount, table ? table.rows.length : 0);
        });
        requestAnimationFrame(() =>{
            for (let i = 0; i < maxRowCount; i++) {

                // 먼저 모든 행의 높이를 'auto'로 설정하여 자연스러운 높이를 갖도록 함
                tables.forEach(table => {
                    if (table && table.rows[i]) {
                        table.rows[i].style.height = 'auto';
                    }
                });
                let maxHeight = 0;

                tables.forEach(table => {
                    if (table && table.rows[i]) {
                    maxHeight = Math.max(maxHeight, table.rows[i].clientHeight);
                    }
                });

                tables.forEach(table => {
                    if (table && table.rows[i]) {
                    table.rows[i].style.height = `${maxHeight}px`;
                    }
                });
            }
        });
    };

    useEffect(() => {
        // 게임 이미지 리스트를 가져옴
        axios.get(imageListPath + "/games_" + state.gameImageLocation)
        .then((response) => {
          console.log(response.data);
          setGameImageList(response.data);
        })
        .catch((error) => {});

        // 테이블의 행 높이를 조정
        const resizeObserver = new ResizeObserver(adjustRowHeights);

        [table1Ref, table2Ref].forEach(ref => {
        if (ref.current) {
            Array.from(ref.current.rows).forEach(row => {
            resizeObserver.observe(row);
            });
        }
        });
    }, []);


    // 수정 된 셀의 내용을 저장.
    const handleContentUpdate = (id, newContent) => {
      setState((prevState) => ({
        ...prevState,
        [id]: newContent,
      }));
    };

  
  return (
    <div className="profile-info">
        <h2>게임 정보</h2>
        <hr />
            <Grid container>
                <Grid item xs={12} sm={12} md={4}>
                    <div style={{ width: `auto`, height: `auto`}}>
                        <GameImage imgSize={[400, 200]} imgList={gameImageList} imgPath={imagePath + "/games_" + state.gameImageLocation} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <table className='table mb-0' ref={table1Ref}>
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
                                <th className="w-[40%]">출시일</th>
                                <TableCell 
                                    id="gameReleaseDate"
                                    content={state.gameReleaseDate}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">가격</th>
                                <TableCell 
                                    id="gamePrice"
                                    content={state.gamePrice}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">사용 가능 플랫폼</th>
                                <TableCell 
                                    id="gamePlatform"
                                    content={state.gamePlatform}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 개발사</th>
                                <TableCell 
                                    id="gameDeveloper"
                                    content={state.gameDeveloper}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <table className='table m-0' ref={table2Ref}>
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
                                <th className="w-[40%]">게임명</th>
                                <TableCell 
                                    id="gameName"
                                    content={state.gameName}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 버전</th>
                                <TableCell 
                                    id="gameVersion"
                                    content={state.gameVersion}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 구매량</th>
                                <TableCell 
                                    id="gameSales"
                                    content={state.gameSales}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 평가</th>
                                <TableCell 
                                    id="gameRating"
                                    content={state.gameRating}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} />
                            </tr>
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th className="w-[20%]">게임 설명</th>
                                <TableCell 
                                    id="gameShortDescription"
                                    content={state.gameShortDescription}
                                    colSpan={5}
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[20%]">게임 소개</th>
                                <TableCell 
                                    id="gameDescription"
                                    content={state.gameDescription}
                                    colSpan={5}
                                    onUpdate={handleContentUpdate} />
                            </tr>
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        {/* <EditingContext.Provider value={{ editingId, setEditingId, originalContent, setOriginalContent }}>  
        </EditingContext.Provider> */}

    </div>
  );
}

export default ProfileInfo;
