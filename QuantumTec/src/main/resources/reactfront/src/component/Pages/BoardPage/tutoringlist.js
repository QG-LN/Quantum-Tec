import { useEffect, useState } from "react";
import newIcon from "./newIcon.png";

export default function Tutoringlist(props) {
  let defaultIconAddress =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

  const [ttcate, setTtcate] = useState(["튜터링", "학습위주"]); // 튜터링 카테고리
  const [ttdate, setTtdate] = useState("2020-01-01"); // 튜터링 등록일
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
    if (props.img === null) {
      // 이미지가 없을 경우 기본 이미지로 설정
      setTitleImage(defaultImage);
    } else {
      // 이미지가 있을 경우 해당 이미지로 설정
      setTitleImage(imagePath + props.img + "_0.png");
    }
  }, [props.img]);


  //글자 제한
  const handleChange = (e) => {
    const tttltie = e.target.innerText;
    if (tttitle.length <= 28) {
      setTttitle(tttltie);
    }
  };
  return (
    <>
      <div class="col mb-5 hover:cursor-pointer">
        <div
          class="card shadow-sm h-100 w-[290px] h-[400px]"
          id={props.id}
        >
          <img
            src={newIcon}
            class="w-[40px] h-[40px]"
            alt="New"
            style={{ position: "absolute", top: "-20px", left: "-20px" }}
          />
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
            <span class="ml-2">{ttdate}</span>
          </div>
          <span class="mx-3.5 text-left font-bold h-20" onInput={handleChange}>
            {tttitle}
          </span>

          <span class="my-3 text-center text-gray-400 font-bold text-base">
            1/20
          </span>
          <div class="flex ml-5">
            <div class="text-xs rounded-full bg-green-200 font-bold text-gray-500 p-1">
              #수학
            </div>
            <div class="text-xs rounded-full bg-green-200 font-bold text-gray-500 p-1 ml-2">
              #과학
            </div>
            <div class="text-xs rounded-full bg-green-200 font-bold text-gray-500 p-1 ml-2">
              #일본어
            </div>
            <div class="text-xs rounded-full bg-green-200 font-bold text-gray-500 p-1 ml-2">
              #세계지리
            </div>
          </div>
          <hr class="mx-4 text-gray-400 mb-auto" />
          <div class="card-body p-3">
            <div class="flex ml-1">
              <img class="w-8 h-8 rounded-full" src={userIconAddress} />
              <h5 class="id ml-4">userid</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
