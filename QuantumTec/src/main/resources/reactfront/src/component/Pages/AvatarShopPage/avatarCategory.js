import React, { useState, useEffect } from 'react';

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
                    <div class="card w-[18.5%] ms-2 mb-4" aria-hidden="true">
                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" class="card-img-top" alt="..."/>
                        <div class="text-start m-3">
                            <h5 class="card-title placeholder-glow">
                            <div class="placeholder col-5"></div>
                            </h5>
                            <h6 class="card-text placeholder-glow">
                                <div class="placeholder col-7"></div>
                            </h6>
                            <h6 class="card-text placeholder-glow text-end">
                                <div class="placeholder col-5"></div>
                            </h6>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

