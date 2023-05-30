import React, { useState } from 'react'

export default function GameImage(props) {
    //props로 이미지 배열을 가져옴
    const images = props.img;
    // console.log(images)
    
    //큰 이미지 화면 초기값 설정
    const [selectImg, setSelectImg] = useState(images[0].url);


    //이미지 갯수확인
    const handleInputImg = (e) => {
        console.log(e.target.value);
    }
    


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
        <div>
            <img className='w-[720px] h-[405px]' src={selectImg} alt='게임이미지' />
            <div class='overflow-x-scroll w-[720px] mt-4'>
                <div className="image-slider flex">
                <fieldset class='imgButtonStyle flex'>
                            <legend class='absolute overflow-hidden h-1 w-1 m-[-1px] '></legend>
                    {images.map((image, index) => (
                                    <label className='hover:cursor-pointer w-[160px] h-[90px]'>
                                        <input type="radio" class='hidden' name='subimg' id='subimg' onChange={handleInputImg} value={index}/><img class='max-w-none w-[160px] h-[90px]'src={image.url} onClick={OnClickimg}></img>
                                    </label>

                    ))}
                </fieldset>
                </div>
            </div>
      </div>
    )
}