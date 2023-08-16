import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginLogo from './BringUP_LOGO.png'

export default function AvatarSide(props) {
    const [avatarCategory, setAvatarCategory] = useState([]); // 카테고리 목록
    const navigate = useNavigate();

    const imgSrc = `${process.env.PUBLIC_URL}/image/`;


    useEffect(() => {
        // 카테고리 목록 받아오기
        axios.get('http://localhost:8080/api/avatar/category')
            .then((response) => {
                setAvatarCategory(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        const tempArray = [];
        tempArray.push({ id: 0, name: '추천', eng_name: 'recommendation', img_src: 'recommendation.png'});
        tempArray.push({ id: 1, name: '배경', eng_name: 'bg', img_src: 'background/blue_bg.png'});
        tempArray.push({ id: 2, name: '모자', eng_name: 'hat', img_src: 'hat/hat.png' });
        tempArray.push({ id: 3, name: '이너', eng_name: 'inner', img_src: 'inner/inner.png' });
        tempArray.push({ id: 4, name: '바지', eng_name: 'pants', img_src: 'pants/pants.png' });
        tempArray.push({ id: 5, name: '치마', eng_name: 'skirt', img_src: 'skirt/skirt.png' });
        setAvatarCategory(avatarCategory.concat(tempArray))


    }, []);

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className='h-[100%]'>
            {/* 로그인이 되어 있을 때 */}
            {localStorage.getItem("truelogin") === "true" ?
            <>
                <div className='text-sm text-start m-2'>
                    내 아바타
                </div>
                <div className='w-[70%] m-[15%] me-0'>
                    <img className="rounded " src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' alt="..." />
                </div>
            </>
            : 
            <>
                <div className='w-[70%] m-[15%] me-0'>
                    <button type="button" class="btn btn-success" onClick={handleLogin}>
                        <img src={loginLogo}/> 로그인
                    </button>
                    <div className='text-sm text-center m-2 text-secondary'>
                        로그인이 필요한 서비스입니다.
                    </div>
                </div>
            </>
            }
            <hr className='mb-0' />
            <div className='text-sm text-start m-2'>
                카테고리
            </div>
            {avatarCategory.map((category) => (
                <div className='d-flex align-items-center shop-category hover:cursor-pointer' id={category.name} onClick={props.onClick}>
                    <div className='w-[15%] m-2 me-0 placeholder-glow'>
                        {/* <div class="placeholder ratio ratio-1x1 rounded"></div> */}
                        <img className="rounded " src={imgSrc + category.img_src} alt="..." />
                        {/* <img className="rounded " src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' alt="..." /> */}
                    </div>
                    <div className='ms-4 text-start'>
                        <h5 className=''>{category.name}</h5>
                    </div>
                </div>
            ))}
        </div>
    );
}
