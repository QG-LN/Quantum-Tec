import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AvatarImg from "./Detail/Avatar/avatarImg";

function AvatarPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  
  const [selectedButton, setSelectedButton] = useState("전체");
  const buttonImageMap = ["전체", "배경", "모자", "이너", "바지"];

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const renderAvatarImages = () => {
    // 만약 "전체"가 선택되었다면 모든 속성 출력
    if (selectedButton === "전체") {
      const avatarAttributes = buttonImageMap.filter((elment)=>elment!=='전체');
      return avatarAttributes.map((attribute) => (
        <AvatarImg key={attribute} props={attribute}  />
      ));
    }
    // 그렇지 않다면 선택된 속성만 출력
    return <AvatarImg key={selectedButton} props={selectedButton} />;
  };

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
        {renderAvatarImages()}
      </div>
    </div>
  );
}





export default AvatarPage;