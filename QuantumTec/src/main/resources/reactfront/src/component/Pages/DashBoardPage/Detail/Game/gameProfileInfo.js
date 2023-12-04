import React, { useState, useEffect, useRef } from 'react';
import { Grid, Table } from '@mui/material';
import TableCell from '../../tableCell';
import { axiosRequest } from "../../../../Utils/networkUtils";
import axios from "axios";
import GameImage from '../../../GamePage/gpimage';
import CircularProgress from '@mui/material/CircularProgress';
import { setEditingValue } from '../../Data/editingValue';

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


    // 수정 된 셀의 내용을 저장.
    const handleContentUpdate = (id, newContent) => {
    //   setState((prevState) => ({
    //     ...prevState,
    //     [id]: newContent,
    //   }));
        setLoading(true);

        const path = 'dashboard/gameinfo/update';
        const body = {
            gameIndex: state.gameIndex,
            gameName: state.gameName,
            gamePrice: state.gamePrice,

            gamePlatform: state.gamePlatform,
            gameVersion: state.gameVersion,
            gameVersionUpdateDate: state.gameVersionUpdateDate,
            gameDescription: state.gameDescription,
            gameShortDescription: state.gameShortDescription,
            gameMemo: state.gameMemo,

            gameImageLocation: state.gameImageLocation,
        }

        if(Array.isArray(id)){
            for(let i=0; i<id.length; i++){
                body[id[i]] = newContent[i];
            }
        }else{
            body[id] = newContent;
        }

        axiosRequest(path, body, 'POST', 'json')
            .then((response) => {
                if(response){
                    setState(prevState => ({
                        ...prevState,
                        // 만약 id가 배열형태라면
                        ...(Array.isArray(id) ? id.reduce((acc, cur, i) => ({...acc, [cur]: newContent[i]}), {}) : {
                        [id]: newContent
                        })
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

    setEditingValue({ editingId, setEditingId, originalContent, setOriginalContent });

  return (
    <div className="profile-info">
        <h2>게임 정보</h2>
        <hr />
        <div className='position-relative'>
            {!state?.gameIndex && ( {loading} && ( <Loading /> ))}
            <Grid container>
                <Grid item xs={12} sm={12} md={4}>
                    <div style={{ width: `auto`, height: `auto`}} className='mr-2 ml-2'>
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
                                    editable={false} 
                                    isLoading={loading}/>
                            </tr>
                            <tr>
                                <th className="w-[40%]">출시일</th>
                                <TableCell 
                                    id="gameReleaseDate"
                                    content={state.gameReleaseDate}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false}
                                    isLoading={loading}/>
                            </tr>
                            <tr>
                                <th className="w-[40%]">가격</th>
                                <TableCell 
                                    id="gamePrice"
                                    content={state.gamePrice}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    isLoading={loading}/>
                            </tr>
                            <tr>
                                <th className="w-[40%]">사용 가능 플랫폼</th>
                                <TableCell 
                                    id="gamePlatform"
                                    content={state.gamePlatform}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    isLoading={loading}/>
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 개발사</th>
                                <TableCell 
                                    id="gameDeveloper"
                                    content={state.gameDeveloper}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    isLoading={loading}/>
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 버전</th>
                                <TableCell 
                                    id="gameVersion"
                                    content={state.gameVersion}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false}
                                    isLoading={loading}/>
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
                                    id="gameCategoryName"
                                    content={state.gameCategoryName}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false}
                                    isLoading={loading}/>
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임명</th>
                                <TableCell 
                                    id="gameName"
                                    content={state.gameName}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    isLoading={loading}/>
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 이미지 위치</th>
                                    <TableCell 
                                        id="gameImageLocation"
                                        content={"image/game/" + state.gameImageLocation+"/"}
                                        className="w-[60%]"
                                        onUpdate={handleContentUpdate} 
                                        isLoading={loading}/>
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 구매량</th>
                                <TableCell 
                                    id="gameSales"
                                    content={state.gameSales}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false}
                                    isLoading={loading}/>
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 평가</th>
                                <TableCell 
                                    id="gameRating"
                                    content={state.gameRating}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} 
                                    isLoading={loading}/>
                            </tr>
                            <tr>
                                <th className="w-[40%]">업데이트 날짜</th>
                                <TableCell 
                                    id="gameVersionUpdateDate"
                                    content={state.gameVersionUpdateDate}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} 
                                    isLoading={loading}/>
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
                                    onUpdate={handleContentUpdate} 
                                    isLoading={loading}/>
                            </tr>
                            <tr>
                                <th className="w-[20%]">게임 소개</th>
                                <TableCell 
                                    id="gameDescription"
                                    content={state.gameDescription}
                                    colSpan={5}
                                    onUpdate={handleContentUpdate} 
                                    isLoading={loading}/>
                            </tr>
                            <tr>
                                <th className="w-[20%]">게임 메모</th>
                                <TableCell 
                                    id="gameMemo"
                                    content={state.gameMemo}
                                    colSpan={5}
                                    onUpdate={handleContentUpdate} 
                                    isLoading={loading}/>
                            </tr>
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        </div>
        {/* <EditingContext.Provider value={{ editingId, setEditingId, originalContent, setOriginalContent }}>  
        </EditingContext.Provider> */}

    </div>
  );
}

export default ProfileInfo;
