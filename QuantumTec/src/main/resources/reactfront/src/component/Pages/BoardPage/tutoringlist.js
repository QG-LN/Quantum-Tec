import { useEffect, useState } from "react";
import newIcon from "./newIcon.png";

export default function Tutoringlist(props) {
  const info = props.info;

  const id = info.id; // 게시글 번호
  const title = info.title; // 게시글 제목
  const date = info.date; // 게시글 등록일
  const category = info.category; // 게시글 카테고리
  const tag = info.tag; // 게시글 태그
  const userNickname = info.userNickname; // 게시글 작성자 닉네임
  const userIcon = info.userIcon; // 게시글 작성자 아이콘
  const tutorCount = info.tutorCount; // 튜터링 인원 수

  let defaultIconAddress =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

  const [ttcate, setTtcate] = useState(["튜터링", "학습위주"]); // 튜터링 카테고리
  const [tttitle, setTttitle] = useState(
    "안녕하세요반갑습니다안녕하세요반갑습니다안녕하세요반갑습니다"
  ); // 튜터링 제목
  const [userIconAddress, setUserIconAddress] = useState(defaultIconAddress); // 사용자 아이콘 주소
  const [titleImage, setTitleImage] = useState(null); // 게임 타이틀 이미지
  // const tttitle = props.name;
  const imagePath = "http://localhost:9090/image/game/games_"; // 게임 이미지 경로
  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"; // 이미지가 없을 경우 기본 이미지

  useEffect(() => {
    if (userIcon === null) {
      // 이미지가 없을 경우 기본 이미지로 설정
      setTitleImage(defaultImage);
    } else {
      // 이미지가 있을 경우 해당 이미지로 설정
      setTitleImage(imagePath + userIcon + "_0.png");
    }
  }, [userIcon]);

  //글자 제한
  const setTitleSize = (title) => {
    if (title.length > 28) {
      return title.slice(0, 28) + "...";
    } else {
      return title;
    }
  };

  // new 아이콘 활성화 체크
  /**
   * 게시글 등록일로부터 days일 이내에 등록된 게시글인지 체크
   * @param {int} days 몇일 이내에 등록된 게시글인지 체크 
   * @returns true/false
   */
  const checkNewTagEnable = (days) => {
    const today = new Date();
    const date = new Date(info.date);
    const timeValue = today.getTime() - date.getTime(); // 현재 날짜 - 게시글 등록일

    const day = 1000 * 60 * 60 * 24 * days; // 24시간

    if(timeValue < day) { // 24시간 이내에 등록된 게시글일 경우
      return true;
    }else{
      return false;
    }

  }

  // 튜터링 인원 수 랜더링
  const renderTutorCount = () => {
    return (
      <span class="my-3 text-center text-gray-400 font-bold text-base">
        {tutorCount}/20
      </span>
    );
  };

  // new 아이콘 랜더링
  const renderNewTag = () => {
    return (
      <img
        src={newIcon}
        class="w-[40px] h-[40px]"
        alt="New"
        style={{ position: "absolute", top: "-20px", left: "-20px" }}
      />
    );
  }

return (
    <>
      <div class="col mb-5 hover:cursor-pointer">
        <div class="card shadow-sm h-100 w-[290px] h-[400px]" id={props.id}>
          {checkNewTagEnable(1) && renderNewTag()}
          <div class="flex mt-3 ml-5">
            {ttcate.slice(0, 2).map((cate, idx) => (
              <div
                key={idx}
                style={{
                  marginLeft: idx === 0 ? "-0.5rem" : "0", // 첫 번째 요소에만 margin-left 설정
                }}
              >
                <div
                  className={`text-xs rounded-full font-bold p-1 ml-2 ${
                    cate === "튜터링"
                      ? "bg-green-200 text-gray-500"
                      : cate === "학습위주"
                      ? "bg-yellow-200 text-gray-500"
                      : ""
                  }`}
                >
                  #{cate}
                </div>
              </div>
            ))}
            <div class=" absolute right-5">
              <div
                class=" h-12 bg-gray-100 border-2 border-green-400 rounded-xl justify-center items-center flex"
                style={{ width: "3rem" }}
              >
                <span class="">N</span>
              </div>
            </div>
          </div>
          <div
            class="flex ml-5 mt-2 text-gray-400"
            style={{ fontSize: "12px" }}
          >
            <p>등록일</p>
            <span class="ml-2">{date}</span>
          </div>
          <span class="mx-3.5 text-left font-bold h-20">
            {setTitleSize(title)}
          </span>
          {renderTutorCount()}
          <div class="flex ml-5">
          {category.map((cate, idx) => (
            <div key={idx} 
                className="text-xs rounded-full bg-green-200 font-bold text-gray-500 p-1 mr-2">
              #{cate}
            </div>
          ))}
          </div>
          <hr class="mx-4 text-gray-400 mb-auto" />
          <div class="card-body p-3 ml-4">
            <div class="flex row">
              <div class='col-4'>
                <img class="w-8 h-8 rounded-full" src={userIconAddress} />
              </div>
              <div class='col-auto'>
                <span class="id text-center">{userNickname}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
