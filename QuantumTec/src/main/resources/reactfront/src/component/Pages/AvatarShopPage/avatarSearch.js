import React, { useState, useEffect } from 'react';
import AvatarItem from './avatarItem';

export default function AvatarSearch(props) {
    const [avatarCategory, setAvatarCategory] = useState(""); // 카테고리 목록
    const [itemList, setItemList] = useState([]); // 아이템 목록
    const [searchValue, setSearchValue] = useState(props.searchName); // 검색어
    useEffect(() => {
        let tempArray = [];
        setAvatarCategory(props.searchName)

        tempArray = [];
        for(let i = 0; i < 20; i++) {
            tempArray.push({ id: i, name: props.searchName });
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
            <div className='row justify-content-end me-4'>
                <div className='w-[30%] col-auto'>
                    <div class="input-group input-group-sm">
                        <input type="text" class="form-control" placeholder="검색할 아이템을 입력하세요" aria-label="검색할 아이템을 입력하세요" aria-describedby="avatar-search-button" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                        <button class="btn btn-outline-secondary" type="button" id="avatar-search-button" onClick={props.onClick}>검색</button>
                    </div>
                </div>
            </div>
            <div className='d-flex align-items-center ms-4 mt-4'>
                <h5 className=''>모든 {avatarCategory} 아이템 (20)</h5>
                <hr className='flex-fill mx-3'/>
            </div>
            <div className='ms-2 mt-4 d-flex flex-wrap align-items-center'>
                {itemList.map((item) => (
                    <AvatarItem item={item}/>
                ))}
            </div>
        </div>
    );
};

