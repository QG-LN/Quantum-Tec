import React, { useState, useEffect } from 'react';
import AvatarItem from './avatarItem';

export default function AvatarCategory(props) {
    const [avatarCategory, setAvatarCategory] = useState(""); // 카테고리 목록
    const [itemList, setItemList] = useState([]); // 아이템 목록
    useEffect(() => {
        let tempArray = [];
        setAvatarCategory(props.categoryName)

        tempArray = [];
        for(let i = 0; i < 20; i++) {
            tempArray.push({ id: i, name: '모자' });
        }
        setItemList(itemList.concat(tempArray))
    }, []);
    return (
        <div className="">
            <h1 className='mt-5'>
                {avatarCategory}
            </h1>
            <h3 className='mb-5'>
                자유롭게 아바타를 꾸며보세요!
            </h3>
            <div className='ms-2 mt-4 d-flex flex-wrap align-items-center'>
                {itemList.map((item) => (
                    <AvatarItem />
                ))}
            </div>
        </div>
    );
};

