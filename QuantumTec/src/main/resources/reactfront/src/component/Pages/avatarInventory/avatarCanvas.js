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
    const reduxAvatarItemList = useSelector(state => state.avatar.itemList);
    // 다른 사용자의 착용중인 아이템 목록
    const avatarItemList = props.avatarItemList || reduxAvatarItemList;
    /**
     * 카테고리 목록을 받아오는 함수
     * @returns {Promise<void>} 로컬 스토리지에 카테고리 목록(avatarCategoryList)을 저장
     */
    const loadCategoryList = async () => {
        try{
            const response = await axios.get('http://localhost:9090/avatar/category');
            localStorage.setItem('avatarCategoryList', JSON.stringify(response.data));
        }catch(error){
            console.log(error);
            throw error;                // 에러를 다시 throw하여 해당 함수를 호출한 곳에서 에러 처리를 할 수 있도록
        }
    }

    /**
     * 캔버스 배경을 그리는 함수
     * @param {*} ctx 캔버스의 2D 렌더링 컨텍스트
     * @param {*} imgBg 배경 이미지
     * @param {*} canvas 캔버스
     */
    const drawBackground = (ctx, imgBg, canvas) => {
        imgBg.onload = () => {
            const inW = imgBg.width;
            const inH = imgBg.height;

            // 컨버스 초기화
            canvas.width = inW;
            canvas.height = inH;

            ctx.drawImage(imgBg, 0, 0);
        }
    }

    /**
     * 캔버스 스틱맨을 그리는 함수
     * @param {*} ctx 캔버스의 2D 렌더링 컨텍스트
     * @param {*} imgStickman 스틱맨 이미지
     * @param {*} position 캔버스 속 스틱맨 위치
     * @param {*} size 스틱맨 크기
     * @param {*} canvas 캔버스
     */
    const drawStickman = (ctx, imgStickman, position, size, canvas) => {
        imgStickman.onload = () => {
            ctx.drawImage(imgStickman, position[0], position[1], size[0], size[1], 0, 0, canvas.width, canvas.height);
        }
    }

    /**
     * 캔버스에 아바타 아이템을 그리는 함수
     * @param {*} ctx 캔버스의 2D 렌더링 컨텍스트
     * @param {*} img 아바타 아이템 이미지
     * @param {*} position 캔버스 속 아바타 아이템 위치
     * @param {*} size 아바타 아이템 크기
     * @param {*} canvas 캔버스
     * @param {*} stickmaOverlay 스틱맨 이미지를 그릴지 여부 
     */
    const drawAvatarItem = (ctx, img, position, size, canvas, stickmaOverlay) => {
        img.onload = () => {
            ctx.drawImage(img, position[0], position[1], size[0], size[1], 0, 0, canvas.width, canvas.height);

            // 스틱맨 이미지를 그릴 것이라면 [null 이 아니라면 || 보여줄 스틱맨이 존재한다면]
            if(stickmaOverlay){
                ctx.drawImage(stickmaOverlay, position[0], position[1], size[0], size[1], 0, 0, canvas.width, canvas.height);
            }
        }
    }

    /**
     * 캔버스에 아바타 아이템들을 그리는 함수
     * @param {*} ctx 캔버스의 2D 렌더링 컨텍스트
     * @param {*} imgBg  배경 이미지
     * @param {*} imgStickman  스틱맨 이미지
     * @param {*} avatarItemList  착용중인 아바타 아이템 목록
     * @param {*} canvas  캔버스
     */
    const drawAvatarItems = (ctx, imgBg, imgStickman, avatarItemList, canvas) => {        
        const categoryList = JSON.parse(localStorage.getItem('avatarCategoryList'));

        if(categoryList !== null){
            for(let j = 0; j < categoryList.length; j++){                               // 카테고리 목록을 순회
                // 착용중인 아바타 아이템들을 그림
                for(let i = 0; i < avatarItemList.length; i++){                         // 착용중인 아바타 아이템 목록을 순회
                    if (categoryList[j] === avatarItemList[i].itemCategoryName) {       // 카테고리 목록과 착용중인 아바타 아이템의 카테고리가 같다면
                        if (avatarItemList[0].itemCategoryName !== '배경') {            // 착용중인 아바타 아이템이 배경이 아니라면
                            drawBackground(ctx, imgBg, canvas);                         // 배경 이미지 그리기
                            drawStickman(ctx, imgStickman, position, size, canvas);      // 스틱맨 이미지 그리기
                        }
    
                        const img = new Image();                                        // 아바타 아이템 이미지 출력을 위한 변수
                        img.src = `${process.env.PUBLIC_URL}/image/${avatarItemList[i].itemCategoryName}/${avatarItemList[i].itemName}.png`; // 아바타 아이템 기본값 설정
    
                        // 아바타 아이템 이미지 출력
                        drawAvatarItem(ctx, img, position, size, canvas, (avatarItemList[i].itemCategoryName === '배경' ? imgStickman : null));
                    }
                }
            }
        }

    }

    /**
     * 캔버스에 배경/스틱맨/아바타 아이템들을 그리는 함수
     * @param {*} canvas 캔버스
     * @param {*} ctx 캔버스의 2D 렌더링 컨텍스트
     * @param {*} imgBg 배경 이미지
     * @param {*} imgStickman 스틱맨 이미지
     * @param {*} position 그려줄 위치
     * @param {*} size 그려줄 크기
     * @param {*} avatarItemList  착용중인 아바타 아이템 목록
     */
    const drawCanvas = (canvas ,ctx, imgBg, imgStickman, position, size, avatarItemList) =>{
        // 기본 구조[배경/스틱맨] 이미지 그리기
        drawBackground(ctx, imgBg, canvas);
        drawStickman(ctx, imgStickman, position, size, canvas);

        // 착용중인 아바타 아이템이 없을 경우
        if(!avatarItemList || avatarItemList.length === 0){
            // 기본 배경 이미지 그리기
            drawBackground(ctx, imgBg, canvas);

            // 기본 스틱맨 이미지 그리기
            drawStickman(ctx, imgStickman, position, size, canvas);
        }else if(avatarItemList !== null){
            // 캔버스에 아바타 아이템들을 그림
            drawAvatarItems(ctx, imgBg, imgStickman, avatarItemList, canvas);
        }else{
            alert("예상치 못한 오류가 발생했습니다. 다시 로그인해주세요. [착용 아바타 관련]");
            localStorage.clear();
            // 로그아웃이 생기면 로그아웃 하는 주소로 변경하기
            document.location.href = "/";
        }
    }

    // 착용중인 아바타 아이템 목록이 변경되었을 때 캔버스를 다시 그림
    useEffect(() => {
        const fatchData = async () => {
            const canvas = canvasRef.current;                                       // 캔버스 참조
            const ctx = canvas.getContext('2d');                                    // 캔버스 컨텍스트 참조
    
            const imgBg = new Image();                                              // 배경 이미지 출력을 위한 변수
            const imgStickman = new Image();                                        // 스틱맨 이미지 출력을 위한 변수
    
            imgBg.src = `${process.env.PUBLIC_URL}/image/bg.png`;                   // 배경 기본값 설정 
            imgStickman.src = `${process.env.PUBLIC_URL}/image/stickman.png`;       // 스틱맨 기본값 설정
    
            if(localStorage.getItem('avatarCategoryList') === null){
                await loadCategoryList()
            }
    
            drawCanvas(canvas, ctx, imgBg, imgStickman, position, size, avatarItemList);
        }
        fatchData();
;
    }, [canvasRef, avatarItemList]);

    return (
        <>
            <canvas className={`w-[100%] h-[100%] border rounded${props.circle ? '-circle' : ''}`} ref={canvasRef}>캔버스를 지원하지 않는 브라우저 입니다</canvas>
        </>

    );
}
