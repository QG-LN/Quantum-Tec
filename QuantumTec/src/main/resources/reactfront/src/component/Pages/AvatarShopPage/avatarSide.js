import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AvatarSide(props) {
    const [avatarCategory, setAvatarCategory] = useState([]); // 카테고리 목록
    const navigate = useNavigate();
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
        tempArray.push({ id: 0, name: '추천' });
        tempArray.push({ id: 1, name: '모자' });
        tempArray.push({ id: 2, name: '악세서리' });
        tempArray.push({ id: 3, name: '머리카락' });
        tempArray.push({ id: 4, name: '이너' });
        tempArray.push({ id: 5, name: '아웃터' });
        tempArray.push({ id: 6, name: '바지' });
        tempArray.push({ id: 7, name: '치마' });
        tempArray.push({ id: 8, name: '원피스' });
        tempArray.push({ id: 9, name: '신발' });
        tempArray.push({ id: 10, name: '구두' });
        tempArray.push({ id: 11, name: '배경' });
        tempArray.push({ id: 12, name: '가구' });
        setAvatarCategory(avatarCategory.concat(tempArray))


    }, []);

    return (
        <div className='h-[100%]'>
            <div className='text-sm text-start m-2'>
                내 아바타
            </div>
            <div className='w-[70%] m-[15%] me-0'>
                <img className="rounded " src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' alt="..." />
            </div>
            <hr className='mb-0' />
            <div className='text-sm text-start m-2'>
                카테고리
            </div>
            {avatarCategory.map((category) => (
                <div className='d-flex align-items-center shop-category' id={category.name} onClick={props.onClick}>
                    <div className='w-[15%] m-2 me-0 placeholder-glow'>
                        <div class="placeholder ratio ratio-1x1 rounded"></div>
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
