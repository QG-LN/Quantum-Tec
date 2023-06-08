import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AvatarSide() {
    const [avatarCategory, setAvatarCategory] = useState([]); // 카테고리 목록
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
            <div className='w-[70%] m-[15%] me-0'>
                <img className="rounded " src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' alt="..." />
            </div>
            <hr />
            {avatarCategory.map((category) => (
            <div className='d-flex align-items-center'>
                <div className='w-[15%] m-2 me-0'>
                    <img className="rounded " src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' alt="..." />
                </div>
                <div className='text-center flex-fill'>
                    <h5 className=''>{category.name}</h5>
                </div>
            </div>
            ))}
        </div>
    );
}
