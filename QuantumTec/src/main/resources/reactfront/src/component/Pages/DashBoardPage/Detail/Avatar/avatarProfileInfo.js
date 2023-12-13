import React, { useState, useEffect, useRef } from 'react';
import { Grid, Table } from '@mui/material';
import TableCell from '../../tableCell';
import AvatarCanvas from '../../../avatarInventory/avatarCanvas';
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../../../Utils/networkUtils";
import axios from "axios";

// export const EditingContext = React.createContext();

function ProfileInfo({state, setState}) {
    const [editingId, setEditingId] = useState(null); // 현재 수정 중인 셀의 id
    const [originalContent, setOriginalContent] = useState(null); // 수정 전 셀의 내용
    const [avatarImage, setAvatarImage] = useState(""); // 아바타의 메인 이미지를 저장할 state
    const [avatarImageList, setGameImageList] = useState([]); // 아바타의 이미지를 저장할 state
    const [avatarCate, setGameGenre] = useState([]); // 게임의 장르를 저장할 state
    const { id, avatarName } = useParams(); // url에서 게임번호와 이름을 가져옴
    const [categoryGameList, setCategoryGameList] = useState([]); // 카테고리 게임 리스트를 저장할 state
  
    const defaultImage =
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"; // 이미지가 없을 경우 기본 이미지
    //이미지
    const handleInputImg = (e) => {
      console.log(e.target.value);
    };
    console.log(state)
  console.log(state.itemName);
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
    const avatarLink = (id, name) => {
      console.log(id, name);
      const avatarName = name.replaceAll(" ", "_");
      window.open(`/avatar/${id}/${avatarName}/`);
    };
  
    // useEffect(() => {
    //   // 로그인이 안되어있으면 구매버튼만 출력
    //   let checkLogin = localStorage.getItem("truelogin");
    //   let userId = localStorage.getItem("userID") || ""; // 로그인이 되어있으면 userId를 가져옴
    //   if (checkLogin !== "true") {
    //   }
  
    //   const path = `http://localhost:9090/game/info?id=${id}&name=${avatarName}&userId=${avatarIndex}`;
    //   axios
    //     .get(path)
    //     .then((response) => {
    //       if (response !== null) {
    //         console.log(response.data);
    //       }
    //     })
    //     .catch((error) => {
    //       // 오류발생시 실행
    //     });
    // }, []);
  
    // useDidMountEffect(() => {
    //   const mainImagePath =
    //     `games/${gameImageLocation}/${gameImageList[0]}`.replaceAll("/", "_");
    //   setGameMainImage(`${imagePath}/${mainImagePath}`);
    // }, [gameImageList]);
  
    // useDidMountEffect(() => {
    //   const categoryGamePath = "game/info/sameCategory";
    //   const categoryBody = {
    //     startIndex: 0,
    //     endIndex: 12,
    //   };
    //   axiosRequest(categoryGamePath, categoryBody, "POST", "list").then((res) => {
    //     // 현재 게임을 제외한 게임들만 저장
    //     const data = res.filter(
    //       (item) => item.gameName !== gameName.replaceAll("_", " ")
    //     );
    //     setCategoryGameList(data); // 카테고리 게임 리스트 저장
    //   });
    // });
  state ={
    itemIndex: state.itemIndex,
    itemName: state.itemName,
    itemCategoryName: state.category,
    itemPrice: "3000",
    itemCreatorIndex: "남정연",
    itemCreateDate: "2023-12-05",
    itemDesc: "",

  }
  
  return (
    <div className="profile-info">
      <h3>아바타 정보</h3>
            <Grid container>
                <Grid item xs={12} sm={12} md={2} className='pt-3'>
                    {/*이미지 처리하는 부분 */}
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm w-full scale-90 mt-[-20px]"
              data-v0-t="card"
            >
              <div class="space-y-1.5 p-6">
                <img
                  src={`${process.env.PUBLIC_URL}/image/${state.itemCategoryName}/${state.itemName}_shop.png`}
                  alt={`${state.itemName} Image`}
                />
              </div>
            </div>
          
                </Grid>
                <Grid item xs={12} sm={12} md={3.6}>
                
                  
                    <table className='table mb-0'>
                        <tbody>
                            <tr>
                                <th className="w-[40%]">아바타 번호</th>
                                <TableCell 
                                    id="itemIndex"
                                    content={state.itemIndex}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate}
                                    editable={false} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">아바타 이름</th>
                                <TableCell 
                                    id="itemName"
                                    content={state.itemName}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">카테고리</th>
                                <TableCell 
                                    id="itemCategoryName"
                                    content={state.itemCategoryName }
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} 
                                    editable={false} />
                            </tr>
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={12} sm={12} md={3.6}>
                    <table className='table mb-0'>
                        <tbody>
                            <tr>
                                <th className="w-[40%]">제작자</th>
                                <TableCell 
                                    id="itemCreatorIndex"
                                    content={state.itemCreatorIndex}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate}
                                    editable={false} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">생성 일자</th>
                                <TableCell 
                                    id="itemCreateDate"
                                    content={state.itemCreateDate}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                            <tr>
                                <th className="w-[40%]">가격</th>
                                <TableCell 
                                    id="itemPrice"
                                    content={state.itemPrice}
                                    className="w-[60%]"
                                    onUpdate={handleContentUpdate} />
                            </tr>
                        </tbody>
                    </table>
                </Grid>
                <table className='table'>
                        <tbody>
                            <tr>
                                {/* 글자 위로 아이콘 올라가는 거 해결 부탁 */}
                                {/* textarea로 변경 */}
                                <th className="w-[40%]">아바타 설명</th>
                                <TableCell 
                                    id="itemDesc"
                                    content={state.itemDesc}
                                    colSpan={5}
                                    onUpdate={handleContentUpdate} />
                            </tr>
                        </tbody>
                    </table>

            </Grid>
        {/* <EditingContext.Provider value={{ editingId, setEditingId, originalContent, setOriginalContent }}>  
        </EditingContext.Provider> */}

    </div>
  );
}

export default ProfileInfo;
