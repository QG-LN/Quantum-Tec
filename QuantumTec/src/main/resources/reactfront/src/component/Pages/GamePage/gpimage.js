import React, {useEffect, useState} from 'react'
import axios from "axios";

export default function GameImage(props) {

    const imgSize = props.imgSize === undefined ? [720, 405] : props.imgSize;
    console.log(props.imgSize);
    //props로 이미지 배열을 가져옴
    const imgList = props.imgList;
    const imgPath = props.imgPath;

    // console.log(imgPath + "_" + imgList[0]);
    //큰 이미지 화면 초기값 설정
    const [selectImg, setSelectImg] = useState();

    //이미지 갯수확인
    const handleInputImg = (e) => {
        // console.log(e.target.value);
    }

    useEffect(() => {
        setSelectImg(imgPath + "_" + imgList[0]);
    },[props.imgList])


    //이미지를 클릭할시
    const OnClickimg = (e) => {
        //클릭한 이미지를 제외한 이미지 border 삭제 및 밝기 조절
        const img = document.querySelectorAll('.imgButtonStyle label img');
        img.forEach((e) => {
            e.style.border = 'none';
            e.style.filter = 'brightness(100%)';
        });
        //화면 테두리 및 밝기 조절
        e.target.style.border = '2px solid #ff0000';
        e.target.style.filter = 'brightness(50%)';

        setSelectImg(e.target.src);
    }

    return (
        <div style={{ width: `100%`, height: `100%` }}>
            {imgList.length > 0 ?
                <img  style={{ width: `${imgSize[0]}px`, height: `${imgSize[1]}px` }} src={selectImg} alt='게임이미지'/> : <div>이미지가 없습니다.</div>
            }
            {/* <div class='overflow-x-scroll w-[720px] mt-4'> */}
            <div class={`overflow-x-scroll w-[${imgSize[0]}] mt-4`}>
                <div className="image-slider flex">
                    <fieldset class='imgButtonStyle flex'>
                        <legend class='absolute overflow-hidden h-1 w-1 m-[-1px] '></legend>
                        {imgList.map((image, index) => (
                            // <label className='hover:cursor-pointer w-[160px] h-[90px]'>
                            <label className={`w-[${imgSize[0]/ 4.5}px] h-[${imgSize[1]/4.5}px]`}>
                                <input
                                    type="radio"
                                    class='hidden'
                                    name='subimg'
                                    id='subimg'
                                    onChange ={handleInputImg}
                                    value={index}
                                />
                                {/* <img class='max-w-none w-[160px] h-[90px]' src={imgPath + "_" + image} onClick={OnClickimg}/> */}
                                <img className={`max-w-none`} style={{ width: `${imgSize[0]/4.5}px`, height: `${imgSize[1]/4.5}px` }} src={imgPath + "_" + image} onClick={OnClickimg}/>
                            </label>
                        ))}
                    </fieldset>
                </div>
            </div>
        </div>
    )
}