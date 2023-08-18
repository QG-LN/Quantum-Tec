import React, { useEffect, useRef} from 'react';

export default function AvatarCanvas() {
    const canvasRef = useRef(null);
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
    }, [canvasRef]);

    return (
        <div className='w-[70%] m-[15%] me-0'>
            <canvas className='w-[100%] h-[100%] rounded' ref={canvasRef}>캔버스를 지원하지 않는 브라우저 입니다</canvas>
        </div>
    );
}
