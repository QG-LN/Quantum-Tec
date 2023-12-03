import React, { useState } from "react";
import { Button } from "react-bootstrap";
import background from "./screenshot1.png";
import hat from "./screenshot2.png";


function AvatarPage() {
    // 상태를 통해 현재 선택된 버튼 및 해당 버튼에 대응하는 이미지 src를 관리
  const [selectedButton, setSelectedButton] = useState("배경");
    // 각 버튼에 대한 이미지 src
  const buttonImageMap = {
    배경: background,
    모자: hat,
    겉옷: "https://example.com/flower.jpg",
    상의: "https://example.com/top.jpg",
    치마: "https://example.com/skirt.jpg",
    신발: "https://example.com/shoes.jpg",
  };
  // 버튼 클릭 시 해당 버튼의 이미지 src를 변경
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="dashboard mt-24 fixed right-0 avatorBoardPageBody">
      <h2 className="font-bold">AVATAR</h2>
      <div className="ml-20 flex justify-start space-x-2 mb-4">
        {/* 각 버튼에 대한 클릭 이벤트 핸들러 할당 */}
        {Object.keys(buttonImageMap).map((buttonName) => (
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
      <img src={buttonImageMap[selectedButton]} width="100%" alt={selectedButton} />
    </div>
  );
}

export default AvatarPage;