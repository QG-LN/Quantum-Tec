import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate로 수정
import "./avatarImg.css";

const AvatarImg = (props) => {
  const navigate = useNavigate(); // useNavigate 사용

  const [hiddenImages, setHiddenImages] = useState([]);

  const handleImageError = (index) => {
    setHiddenImages((prevHiddenImages) => [...prevHiddenImages, index]);
  };

  const handleClick = () => {
    // 클릭 시 주소에 '/1' 추가
    const currentPath = window.location.pathname;
    navigate(`${currentPath}/${props.itemIndex}`,{ state: props});
  };

  console.log(props);

  return (
    <div className="avatar-img-container">
      {/* 이미지 렌더링 */}
        <div class='cursor-pointer' onClick={handleClick}>
          <img
            src={`${process.env.PUBLIC_URL}/image/${props.category}/${props.itemName}_shop.png`}
            alt={`Image`}
          />
          <div class="text-start m-3 animated-box w-[full]">
            <h6 class='font-bold'>
              {props.itemName}
            </h6>
          </div>
        </div>
    </div>
  );
};



export default AvatarImg;
