import React, { useState, useEffect, useRef } from 'react';
import { Grid, Table } from '@mui/material';
import TableCell from '../../tableCell';
import { useParams } from "react-router-dom";
import { setEditingValue } from '../../Data/editingValue';

// export const EditingContext = React.createContext();

function ProfileInfo({state, setState, avatarInfo}) {
    const [loading, setLoading] = useState(false); // 수정 로딩 상태
    const [editingId, setEditingId] = useState(null); // 현재 수정 중인 셀의 id
    const [originalContent, setOriginalContent] = useState(null); // 수정 전 셀의 내용

    const [avatarImage, setAvatarImage] = useState(""); // 아바타의 메인 이미지를 저장할 state
    const [avatarImageList, setGameImageList] = useState([]); // 아바타의 이미지를 저장할 state
    const [avatarCate, setGameGenre] = useState([]); // 게임의 장르를 저장할 state
    const { id, avatarName } = useParams(); // url에서 게임번호와 이름을 가져옴
    const [categoryGameList, setCategoryGameList] = useState([]); // 카테고리 게임 리스트를 저장할 state
  
    const defaultImage = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"; // 이미지가 없을 경우 기본 이미지
    //이미지
    const handleInputImg = (e) => {
      console.log(e.target.value);
    };
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


    state ={
      //undefined 방지
      itemIndex: state?.itemIndex || "", 
      itemName: state?.itemName || "",
      itemCategoryName: state?.category || "",
      itemPrice: state?.itemPrice || "0",
      itemCreatorIndex: state?.itemCreatorIndex || "홍길동",
      itemCreateDate: state?.itemCreateDate || "9999-99-99",
      itemDesc: state?.itemDesc || "-",

    }
    setEditingValue({ editingId, setEditingId, originalContent, setOriginalContent });

  return (
    <div className="profile-info">
      <h3>아바타 정보</h3>
      <Grid container>
        <Grid item xs={12} sm={12} md={2} className="pt-3">
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
        <Grid item xs={12} sm={12} md={5}>
          <table className="table mb-0">
            <tbody>
              <tr>
                <th className="w-[40%]">아바타 번호</th>
                <TableCell
                  id="itemIndex"
                  content={state.itemIndex}
                  className="w-[60%]"
                  onUpdate={handleContentUpdate}
                  editable={false}
                  isLoading={loading}
                />
              </tr>
              <tr>
                <th className="w-[40%]">아바타 이름</th>
                <TableCell
                  id="itemName"
                  content={state.itemName}
                  className="w-[60%]"
                  onUpdate={handleContentUpdate}
                  isLoading={loading}
                />
              </tr>
              <tr>
                <th className="w-[40%]">카테고리</th>
                <TableCell
                  id="itemCategoryName"
                  content={state.itemCategoryName}
                  className="w-[60%]"
                  onUpdate={handleContentUpdate}
                  editable={false}
                  isLoading={loading}
                />
              </tr>
            </tbody>
          </table>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <table className="table mb-0">
            <tbody>
              <tr>
                <th className="w-[40%]">제작자</th>
                <TableCell
                  id="itemCreatorIndex"
                  content={avatarInfo.itemCreatorName}
                  className="w-[60%]"
                  onUpdate={handleContentUpdate}
                  editable={false}
                  isLoading={loading}
                />
              </tr>
              <tr>
                <th className="w-[40%]">생성 일자</th>
                <TableCell
                  id="itemCreateDate"
                  content={avatarInfo.itemCreateDate}
                  className="w-[60%]"
                  onUpdate={handleContentUpdate}
                  isLoading={loading}
                />
              </tr>
              <tr>
                <th className="w-[40%]">가격</th>
                <TableCell
                  id="itemPrice"
                  content={avatarInfo.itemPrice + " 원"}
                  className="w-[60%]"
                  onUpdate={handleContentUpdate}
                  isLoading={loading}
                />
              </tr>
            </tbody>
          </table>
        </Grid>
      </Grid>
      <table className="table">
        <tbody>
          <tr>
            {/* 글자 위로 아이콘 올라가는 거 해결 부탁 */}
            {/* textarea로 변경 */}
            <th className="w-[40%]">아바타 설명</th>
            <TableCell
              id="itemDesc"
              content={avatarInfo.itemDesc}
              colSpan={5}
              onUpdate={handleContentUpdate}
              isLoading={loading}
            />
          </tr>
        </tbody>
      </table>
      {/* <EditingContext.Provider value={{ editingId, setEditingId, originalContent, setOriginalContent }}>  
        </EditingContext.Provider> */}
    </div>
  );
}

export default ProfileInfo;
