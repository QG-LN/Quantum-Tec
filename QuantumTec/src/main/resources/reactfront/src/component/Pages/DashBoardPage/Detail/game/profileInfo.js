import React, { useEffect, useRef, useState } from "react";
import { Grid, Table } from "@mui/material";
import TableCell from "../../tableCell";
import AvatarCanvas from "../../../avatarInventory/avatarCanvas";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../../../Utils/networkUtils";
import axios from "axios";

export const EditingContext = React.createContext();

function ProfileInfo({ state, setState }) {
  const [editingId, setEditingId] = useState(null); // 현재 수정 중인 셀의 id
  const [originalContent, setOriginalContent] = useState(null); // 수정 전 셀의 내용
  const [gameImageLocation, setGameImageLocation] = useState(""); // 게임의 이미지 경로를 저장할 state
  const [gameMainImage, setGameMainImage] = useState(""); // 게임의 메인 이미지를 저장할 state
  const [gameImageList, setGameImageList] = useState([]); // 게임의 이미지를 저장할 state
  const [gameGenre, setGameGenre] = useState([]); // 게임의 장르를 저장할 state
  const { id, gameName } = useParams(); // url에서 게임번호와 이름을 가져옴
  const [categoryGameList, setCategoryGameList] = useState([]); // 카테고리 게임 리스트를 저장할 state

  const imagePath = "http://localhost:9090/image/game"; // 이미지 경로
  const imageListPath = "http://localhost:9090/image/game/list"; // 이미지 리스트 경로
  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"; // 이미지가 없을 경우 기본 이미지
  //이미지
  const handleInputImg = (e) => {
    console.log(e.target.value);
  };
  // 게임 해더 이미지 경로를 반환하는 함수
  const gameImageLink = (index) => {
    let path = `http://localhost:9090/image/game/games_`;
    path += index > 4 ? "test" : index; // 추후 이미부분은 수정해야함
    path += "_0.png";
    return path;
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
  const gameLink = (id, name) => {
    console.log(id, name);
    const gameName = name.replaceAll(" ", "_");
    window.open(`/game/${id}/${gameName}/`);
  };

  useEffect(() => {
    // 로그인이 안되어있으면 구매버튼만 출력
    let checkLogin = localStorage.getItem("truelogin");
    let userId = localStorage.getItem("userID") || ""; // 로그인이 되어있으면 userId를 가져옴
    if (checkLogin !== "true") {
    }

    const path = `http://localhost:9090/game/info?id=${id}&name=${gameName}&userId=${userId}`;
    axios
      .get(path)
      .then((response) => {
        if (response !== null) {
          console.log(response.data);
          // 게임 정보 저장

          setGameImageLocation(response.data.gameImageLocation);
        }
      })
      .catch((error) => {
        // 오류발생시 실행
      });
  }, []);

  useDidMountEffect(() => {
    console.log(imageListPath + "/games_" + gameImageLocation);
    axios
      .get(imageListPath + "/games_" + gameImageLocation)
      .then((response) => {
        console.log(response.data);
        setGameImageList(response.data);
      })
      .catch((error) => {});
  }, [gameImageLocation]);

  useDidMountEffect(() => {
    const mainImagePath =
      `games/${gameImageLocation}/${gameImageList[0]}`.replaceAll("/", "_");
    setGameMainImage(`${imagePath}/${mainImagePath}`);
  }, [gameImageList]);

  useDidMountEffect(() => {
    const categoryGamePath = "game/info/sameCategory";
    const categoryBody = {
      startIndex: 0,
      endIndex: 12,
    };
    axiosRequest(categoryGamePath, categoryBody, "POST", "list").then((res) => {
      // 현재 게임을 제외한 게임들만 저장
      const data = res.filter(
        (item) => item.gameName !== gameName.replaceAll("_", " ")
      );
      setCategoryGameList(data); // 카테고리 게임 리스트 저장
    });
  });

  return (
    <div className="profile-info">
      <h2>게임 정보</h2>
      <hr />
      <EditingContext.Provider
        value={{ editingId, setEditingId, originalContent, setOriginalContent }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={2} className="pt-3">
            <div class="overflow-x-scroll w-[800px] mt-4">
              <div className="image-slider flex">
                <fieldset class="imgButtonStyle flex ">
                  <legend class="absolute overflow-hidden h-1 w-1 m-[-1px] "></legend>
                  {categoryGameList.map((image, index) => (
                    <label className="hover:cursor-pointer w-[213px] h-[160px] m-2">
                      <input
                        type="radio"
                        class="hidden"
                        name="subimg"
                        id="subimg"
                        onChange={handleInputImg}
                        value={index}
                        onClick={() =>
                          gameLink(image.gameIndex, image.gameName)
                        }
                      />
                      <img
                        class="max-w-none w-[213px] h-[120px]"
                        src={gameImageLink(index + 1)}
                      />
                      <div class="mt-2 font-bold">{image.gameName}</div>
                      <div>{image.gamePrice}</div>
                    </label>
                  ))}
                </fieldset>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3.6}>
            <table className="table mb-0">
              <tbody>
                <tr>
                  <th className="w-[40%]">게임 번호</th>
                  <TableCell
                    id="gameIndex"
                    content={state.gameIndex}
                    className="w-[60%]"
                    onUpdate={handleContentUpdate}
                    editable={false}
                  />
                </tr>
                <tr>
                  <th className="w-[40%]">게임명</th>
                  <TableCell
                    id="gameName"
                    content={state.gameName}
                    className="w-[60%]"
                    onUpdate={handleContentUpdate}
                  />
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
                    editable={false}
                  />
                </tr>
                <tr>
                  <th className="w-[40%]">가격</th>
                  <TableCell
                    id="gamePrice"
                    content={state.userNickname}
                    className="w-[60%]"
                    onUpdate={handleContentUpdate}
                  />
                </tr>
                <tr>
                  <th className="w-[40%]">게임 개발사</th>
                  <TableCell
                    id="gameDeveloper"
                    content=""
                    className="w-[60%]"
                    onUpdate={handleContentUpdate}
                  />
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item xs={12} sm={12} md={3.6}>
            <table className="table m-0">
              <tbody>
                <tr>
                  <th className="w-[40%]">장르</th>
                  <TableCell
                    id="gameGenre"
                    content={state.gameGenre}
                    className="w-[60%]"
                    onUpdate={handleContentUpdate}
                  />
                </tr>
                <tr>
                  <th className="w-[40%]">출시일</th>
                  <TableCell
                    id="gameReleaseDate"
                    content={state.gameReleaseDate}
                    className="w-[60%]"
                    onUpdate={handleContentUpdate}
                  />
                </tr>
                <tr>
                  <th className="w-[40%]">게임 구매량</th>
                  <TableCell
                    id="gamePurchaseCount"
                    content={state.gamePurchaseCount}
                    className="w-[60%]"
                    onUpdate={handleContentUpdate}
                  />
                </tr>
                <tr>
                  <th className="w-[40%]">게임 결제 금액</th>
                  <TableCell
                    id="gamePurchaseAmount"
                    content={state.gamePurchaseAmount}
                    className="w-[60%]"
                    onUpdate={handleContentUpdate}
                    editable={false}
                  />
                </tr>
                <tr>
                  <th className="w-[40%]">게임 평가/댓글</th>
                  <TableCell
                    id="gameReviewCount"
                    content={state.gameReviewCount}
                    className="w-[60%]"
                    onUpdate={handleContentUpdate}
                    editable={false}
                  />
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
