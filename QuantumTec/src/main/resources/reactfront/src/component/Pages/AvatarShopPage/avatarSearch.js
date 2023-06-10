import React, { useState, useEffect } from 'react';
import AvatarItem from './avatarItem';

export default function AvatarSearch(props) {
    const [avatarCategory, setAvatarCategory] = useState(""); // 카테고리 목록
    const [itemList, setItemList] = useState([]); // 아이템 목록
    useEffect(() => {
        let tempArray = [];
        setAvatarCategory(props.searchName)

        tempArray = [];
        for(let i = 0; i < 20; i++) {
            tempArray.push({ id: i, name: '모자' });
        }
        setItemList(itemList.concat(tempArray))
    }, []);
    return (
        <div className="">
            <div className='p-2 pt-5 me-0 user-wrap'>
                <img className="rounded mx-auto d-block w-[60%] user-image" src='https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?resize=476%2C280&ssl=1' alt="..." />
                <div className='user-text text-white'>
                    <h3>게임을 플레이하고 포인트를 받으세요</h3>
                    <h5>포인트 상점 아이템으로 자신만의 모습을 표현해보세요</h5>
                </div>
            </div>
            <h3 className='my-5'>
                {avatarCategory}의 검색 결과입니다.
            </h3>
            <div className='ms-2 mt-4 d-flex flex-wrap align-items-center'>
                {itemList.map((item) => (
                    <AvatarItem />
                ))}
            </div>
        </div>
    );
};

