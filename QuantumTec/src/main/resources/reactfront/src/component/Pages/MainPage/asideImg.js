// 사용자가 로그인을 햇는지 상태를 알기위해 import함
import React, { useState } from 'react';
import Logoimage from './1_logo.png';
export default function AsideImg({ onChange }) {
    const [hasImage, setHasImage] = useState(true);
    const handleChange = (event) => {
      if (event.target.files.length > 0) {
        setHasImage(true);
        onChange(event.target.files[0]);
      } else {
        setHasImage(false);
      }
    }

    return (
      <div class='userimg'>
        {/*현재는 이미지를 직접 올리게 되어있음*/}
        <label htmlFor="image-input">
          {hasImage ? (
            <img class='imgstyle'src={Logoimage}alt="이미지" />
          ) : (
            <div>이미지 없음</div>
          )}
        </label>
        {/* <input id="image-input" type="file" accept="image/*" onChange={handleChange} /> */}
      </div>
    );
  }