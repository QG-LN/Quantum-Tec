// @ts-check
import React, { useEffect, useRef, useState} from 'react';
import { axiosRequest } from '../../../module/networkUtils';

/**
 * @typedef {Object} AvatarItemRequest
 * @property {string|null} userId - 유저 아이디
 */

/**
 * 로그인이 되었을 때 나의 아바타를 보여주는 컴포넌트
 * @param {Object} props - 부모 컴포넌트로부터 받아온 props
 * @param {Array<string>} props.category - 아바타 카테고리 이름들
 * @returns {JSX.Element} - AvatarItem 컴포넌트.
 * @author MayoneJY <mayone6063@kakao.com>
 */
export default function AvatarCanvas(props) {
    /** 캔버스를 그리기 위한 ref @type {React.MutableRefObject} */
    const canvasRef = useRef(null);
    /** 아바타 카테고리 이름들 @type {Array<string>} */
    const avatarCategory = [];

    useEffect(() => {
        /** @type {HTMLCanvasElement} */
        const canvas = canvasRef.current;
        /** @type {CanvasRenderingContext2D} */
        const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
        /** @type {HTMLImageElement} */
        const imgBg = new Image();
        /** @type {HTMLImageElement} */
        const imgStickman = new Image();
        /** 착용중인 아바타 아이템을 가져오기 위한 요청. @type {AvatarItemRequest} */
        const body = {
            userId: localStorage.getItem("userID"),
        }

        imgBg.src = `${process.env.PUBLIC_URL}/image/bg.png`;
        imgBg.onload = () =>{
            /** @type {number} */
            const inW = imgBg.width;
            /** @type {number} */
            const inH = imgBg.height;

            canvas.width = inW;
            canvas.height = inH;
            
            ctx.drawImage(imgBg, 0, 0);
        }
        ctx.globalCompositeOperation = 'source-over';

        imgStickman.src = `${process.env.PUBLIC_URL}/image/stickman.png`;
        imgStickman.onload = () =>{
            ctx.drawImage(imgStickman, 0, 0);
        }

        for(let i = 1; i < props.category.length; i++) {
            avatarCategory.push(props.category[i]);
        }

        
        axiosRequest('http://localhost:9090/avatar/inventory/active', body, 'POST', 'json')
            .then(res => {
                console.log(res);
                for (let i = 0; i < res.length; i++) {
                    /** @type {HTMLImageElement} */
                    const img = new Image();

                    img.src = `${process.env.PUBLIC_URL}/image/${res[i].itemCategoryName}/${res[i].itemName}.png`;
                    img.onload = () =>{
                        ctx.drawImage(img, 0, 0);
                        if(res[i].itemCategoryName === '배경'){
                            ctx.drawImage(imgStickman, 0, 0);
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err);
            }
        );
    }, [canvasRef]);

    return (
        <div className='w-[70%] m-[15%] me-0'>
            <canvas className='w-[100%] h-[100%] rounded' ref={canvasRef}>캔버스를 지원하지 않는 브라우저 입니다</canvas>
        </div>
    );
}
