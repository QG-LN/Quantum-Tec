import React, { useState } from "react";
import { Button } from "react-bootstrap";
import background from "./screenshot1.png";
import hat from "./screenshot2.png";
import AvatarImg from "./Detail/Avatar/avatarImg";


function AvatarPage() {
    // 상태를 통해 현재 선택된 버튼 및 해당 버튼에 대응하는 이미지 src를 관리
  const [selectedButton, setSelectedButton] = useState("배경");
  
    // 각 버튼에 대한 이미지 src
  const buttonImageMap = [
    "전체",
    "배경",
    "모자",
    "이너",
    "바지"
  ];
  // 버튼 클릭 시 해당 버튼의 이미지 src를 변경
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="dashboard mt-24 fixed right-0 avatorBoardPageBody h-[54rem]">
        <div class='overflow-y-scroll h-full'>
      <h2 className="font-bold">AVATAR</h2>
      <div className="ml-20 flex justify-start space-x-2 mb-4">
        {/* 각 버튼에 대한 클릭 이벤트 핸들러 할당 */}
        {Object(buttonImageMap).map((buttonName) => (
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
      {/* 선택된 버튼에 대응하는 이미지 표시 */}
        <AvatarImg props={selectedButton}/>
      {/* <img src={buttonImageMap[selectedButton]} width="100%" alt={selectedButton} /> */}
      </div>
    </div>
  );
}

export default AvatarPage;