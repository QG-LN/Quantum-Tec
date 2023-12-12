import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AvatarImg from "./Detail/Avatar/avatarImg";

function AvatarPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  
  const [selectedButton, setSelectedButton] = useState("전체");
  const buttonImageMap = ["전체", "배경", "모자", "이너", "바지"];

  const [loadedImages, setLoadedImages] = useState([]);
  
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
 const avatorcolor = [
  "빨간색",
  "파란색",
  "초록색",
  "갈색",
  "보라색"
 ]


 const renderAvatarImages = () => {
  // 만약 "전체"가 선택되었다면 모든 속성 출력
  if (selectedButton === "전체") {
    const avatarAttributes = buttonImageMap.filter((el) => el !== '전체');
    const newImages = avatarAttributes.flatMap((attribute) =>
      avatorcolor.map((color) => ({
        category: attribute,
        filename: color + ' ' + attribute,
      }))
    );
    // 이미지 업데이트
    setLoadedImages(newImages);
  } else {
    // 그렇지 않다면 선택된 속성만 출력
    const newImages = avatorcolor.map((color) => ({
      category: selectedButton,
      filename: color + ' ' + selectedButton,
    }));
    // 이미지 업데이트
    setLoadedImages(newImages);
  }
};

useEffect(() => {
  // 렌더링 시에 이미지를 초기화하고 렌더링
  renderAvatarImages();
}, [selectedButton]); // selectedButton이 변경될 때마다 실행

  return (
    <div className="dashboard mt-24 fixed right-0 avatorBoardPageBody h-[54rem]">
      <div className='overflow-y-scroll h-full'>
        <h2 className="font-bold">AVATAR</h2>
        <div className="ml-20 flex justify-start space-x-2 mb-4">
          {buttonImageMap.map((buttonName) => (
            <Button
              key={buttonName}
              className={`bg-[#f0f0f0] border-2 border-black ${
                selectedButton === buttonName
                  ? "bg-black text-white"
                  : "bg-[#f0f0f0] text-black"
              }`}
              variant="ghost"
              onClick={() => handleButtonClick(buttonName)}
            >
              {buttonName}
            </Button>
          ))}
        </div>
        <hr />
        <div class='row container m-auto'>
      {/* 이미지를 렌더링 */}
      {loadedImages.map((image) => (
        <AvatarImg key={image.filename} category={image.category} filename={image.filename} />
      ))}
        </div>
      </div>
    </div>
  );
}





export default AvatarPage;