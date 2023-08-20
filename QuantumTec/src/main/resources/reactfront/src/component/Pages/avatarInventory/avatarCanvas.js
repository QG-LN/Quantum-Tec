import React, { useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

/**
 * 로그인이 되었을 때 나의 아바타를 보여주는 컴포넌트
 * @param {Object} props - 부모 컴포넌트로부터 받아온 props
 * @param {Array<int>|undefined} props.size - 아바타 크기 (가로, 세로) (px) 기본값: [512, 512]
 * @param {Array<int>|undefined} props.position - 아바타 위치 (x, y) (px) 기본값: [0, 0]
 * @returns {JSX.Element} - AvatarItem 컴포넌트.
 * @author MayoneJY <mayone6063@kakao.com>
 */
export default function AvatarCanvas(props) {
    // 아바타 크기 (가로, 세로) (px) 기본값: [512, 512]
    const size = (props.size === undefined ? [512, 512] : props.size);
    // 아바타 위치 (x, y) (px) 기본값: [0, 0]
    const position = (props.position === undefined ? [0, 0] : props.position);
    // 캔버스를 그리기 위한 참조
    const canvasRef = useRef(null);
    // 착용중인 아바타 아이템 목록
    const avatarItemList = useSelector(state => state.avatarItemList);
    

    useEffect(() => {
        console.log(avatarItemList);
    }, [avatarItemList]);

    useEffect(() => {
        console.log(avatarItemList);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 기본 배경 이미지 그리기
        const imgBg = new Image();

        imgBg.src = `${process.env.PUBLIC_URL}/image/bg.png`;
        imgBg.onload = () =>{
            const inW = imgBg.width;
            const inH = imgBg.height;

            // 컨버스 초기화
            canvas.width = inW;
            canvas.height = inH;
            
            ctx.drawImage(imgBg, 0, 0);
        }

        // 기본 스틱맨 이미지 그리기
        const imgStickman = new Image();

        imgStickman.src = `${process.env.PUBLIC_URL}/image/stickman.png`;
        imgStickman.onload = () =>{
            ctx.drawImage(imgStickman, position[0], position[1], size[0], size[1], 0, 0, canvas.width, canvas.height);
        }

        
        
        if (avatarItemList !== null) {
            // 카테고리 목록 받아오기
            axios.get('http://localhost:9090/avatar/category')
            .then((response) => {
                const catrgoryList = response.data;
                for (let j = 0; j < catrgoryList.length; j++) {
                    // 착용중인 아바타 아이템들을 그림
                    for (let i = 0; i < avatarItemList.length; i++) {
                        if(catrgoryList[j] === avatarItemList[i].itemCategoryName){
                            const img = new Image();
    
                            img.src = `${process.env.PUBLIC_URL}/image/${avatarItemList[i].itemCategoryName}/${avatarItemList[i].itemName}.png`;
                            img.onload = () =>{
                                ctx.drawImage(img, position[0], position[1], size[0], size[1], 0, 0, canvas.width, canvas.height);
                                if(avatarItemList[i].itemCategoryName === '배경'){
                                    ctx.drawImage(imgStickman, position[0], position[1], size[0], size[1], 0, 0, canvas.width, canvas.height);
                                }
                            }
                        }
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
            
        }
        else {
            alert("예상치 못한 오류가 발생했습니다. 다시 로그인해주세요. [착용 아바타 관련]");
            localStorage.clear();
            // 로그아웃이 생기면 로그아웃 하는 주소로 변경하기
            document.location.href = "/";
        }
    }, [canvasRef, avatarItemList]);

    return (
        <canvas className='w-[100%] h-[100%] rounded' ref={canvasRef}>캔버스를 지원하지 않는 브라우저 입니다</canvas>
    );
}
