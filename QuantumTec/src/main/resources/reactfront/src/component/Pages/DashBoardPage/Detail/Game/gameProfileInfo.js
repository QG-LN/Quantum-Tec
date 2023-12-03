import React, { useState, useEffect, useRef } from 'react';
import { Grid, Table } from '@mui/material';
import TableCell from '../../tableCell';
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../../../Utils/networkUtils";
import axios from "axios";
import GameImage from '../../../GamePage/gpimage';

// export const EditingContext = React.createContext();

function ProfileInfo({state, setState}) {
    const [editingId, setEditingId] = useState(null); // 현재 수정 중인 셀의 id
    const [originalContent, setOriginalContent] = useState(null); // 수정 전 셀의 내용
    
    const [gameImageLocation, setGameImageLocation] = useState(""); // 게임의 이미지 경로를 저장할 state
    const [gameImageList, setGameImageList] = useState([]); // 게임의 이미지를 저장할 state
  
    const imagePath = "http://localhost:9090/image/game"; // 이미지 경로
    const imageListPath = "http://localhost:9090/image/game/list"; // 이미지 리스트 경로

    const defaultImage = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"; // 이미지가 없을 경우 기본 이미지
  
    
    /**
     * 최초 렌더링을 제외한 렌더링에서만 실행되는 useEffect
     * 기존 useEffect와 동일하게 작동
     * */
    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);

        useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    };

    // 수정 된 셀의 내용을 저장.
    const handleContentUpdate = (id, newContent) => {
      setState((prevState) => ({
        ...prevState,
        [id]: newContent,
      }));
    };
    // const gameLink = (id, name) => {
    //   console.log(id, name);
    //   const gameName = name.replaceAll(" ", "_");
    //   window.open(`/game/${id}/${gameName}/`);
    // };
  
  
    useEffect(() => {
      axios.get(imageListPath + "/games_" + state.gameImageLocation)
        .then((response) => {
          console.log(response.data);
          setGameImageList(response.data);
        })
        .catch((error) => {});
    }, [state]);
  
  
  
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
                                <th className="w-[40%]">게임 설명</th>
                                <TableCell 
                                    id="gameShortDescription"
                                    content={state.gameShortDescription}
                                    colSpan={5}
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">게임 소개</th>
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
