import React, { useEffect, useRef, useState} from 'react';
import { axiosRequest } from '../../../module/networkUtils';

export default function AvatarCanvas(props) {
    const canvasRef = useRef(null);
    const avatarCategory = [];
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const imgBg = new Image();
        imgBg.src = `${process.env.PUBLIC_URL}/image/bg.png`;
        imgBg.onload = () =>{
            const inW = imgBg.width;
            const inH = imgBg.height;

            canvas.width = inW;
            canvas.height = inH;
            
            ctx.drawImage(imgBg, 0, 0);
        }
        ctx.globalCompositeOperation = 'source-over';
        const imgStickman = new Image();
        imgStickman.src = `${process.env.PUBLIC_URL}/image/stickman.png`;
        imgStickman.onload = () =>{
            ctx.drawImage(imgStickman, 0, 0);
        }

        for(let i = 1; i < props.category.length; i++) {
            avatarCategory.push(props.category[i]);
        }


        const body = {
            userId: localStorage.getItem("userID"),
        }
        axiosRequest('http://localhost:9090/avatar/inventory/active', body, 'POST', 'json')
            .then(res => {
                console.log(res);
                for (let i = 0; i < res.length; i++) {
                    
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
