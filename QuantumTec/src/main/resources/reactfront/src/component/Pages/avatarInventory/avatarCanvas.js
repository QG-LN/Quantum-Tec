import React, { useEffect, useRef} from 'react';
import { axiosRequest } from '../../../module/networkUtils';

export default function AvatarCanvas(props) {
    const canvasRef = useRef(null);
    const avatarCategory = [];
    const avatarActive = [];
    for(let i = 1; i < props.category.length; i++) {
        avatarCategory.push(props.category[i]);
        avatarActive.push(null);
    }
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


        const body = {
            userId: localStorage.getItem("userID"),
        }
        axiosRequest('http://localhost:9090/avatar/inventory/active', body, 'POST', 'json')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const itemIndex = avatarCategory.indexOf(res[i].categoryName);
                    avatarActive[itemIndex] = res[i];
                }
            })
            .catch(err => {
                console.log(err);
            }
        );

        for(let i = 0; i < avatarActive.length; i++) {
            if(avatarActive[i] !== null) {
                const img = new Image();
                img.src = `${process.env.PUBLIC_URL}/image/${avatarActive[i].categoryName}/${avatarActive[i].itemName}.png`;
                img.onload = () =>{
                    ctx.drawImage(img, 0, 0);
                }
            }
        }
    }, [canvasRef]);

    return (
        <div className='w-[70%] m-[15%] me-0'>
            <canvas className='w-[100%] h-[100%] rounded' ref={canvasRef}>캔버스를 지원하지 않는 브라우저 입니다</canvas>
        </div>
    );
}
