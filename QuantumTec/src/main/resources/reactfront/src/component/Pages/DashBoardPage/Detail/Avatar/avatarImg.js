import React, { useEffect, useState } from "react";
import "./avatarImg.css";

const AvatarImg = (props) => {
  const itemCategoryName = props.props;
  const itemName = [
    "빨간색 " + props.props,
    "파란색 " + props.props,
    "갈색 " + props.props,
    "초록색 " + props.props,
    "파란색 " + props.props,
  ];

  const [hiddenImages, setHiddenImages] = useState([]);

  const handleImageError = (index) => {
    setHiddenImages((prevHiddenImages) => [...prevHiddenImages, index]);
  };
  return (
    <div className="avatar-img-container">
      {/* 이미지 렌더링 */}
      {itemName.map((item, index) => (
        <div class='max-w-full'>
          <img
            key={index}
            src={`${process.env.PUBLIC_URL}/image/${itemCategoryName}/${item}_shop.png`}
            alt={`${item} Image`}
            style={{ display: hiddenImages.includes(index) ? "none" : "block" }}
            onError={() => handleImageError(index)}
          />
          <div class="text-start m-3 animated-box w-[full]">
            <h6 class='font-bold'>
              {item}
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvatarImg;
