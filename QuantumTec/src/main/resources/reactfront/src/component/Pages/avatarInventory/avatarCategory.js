import React, { useState, useEffect } from 'react';
import AvatarItem from './avatarItem';

export default function AvatarCategory(props) {
    const [avatarCategory, setAvatarCategory] = useState(""); // 카테고리 목록
    const [itemList, setItemList] = useState([]); // 아이템 목록
    const [searchList, setSearchList] = useState([]); // 검색 결과 목록
    
    useEffect(() => {
        let tempArray = [];
        setAvatarCategory(props.categoryName)

        tempArray = [];
        tempArray.push({ id: 1, name: `파란색`, eng_name: `blue` });
        tempArray.push({ id: 2, name: `갈색`, eng_name: `brown` });
        tempArray.push({ id: 3, name: `초록색`, eng_name: `green` });
        tempArray.push({ id: 4, name: `보라색`, eng_name: `purple` });
        tempArray.push({ id: 5, name: `빨간색`, eng_name: `red` });
        setItemList(tempArray)
        setSearchList(tempArray);
    }, []);

    const handleSearch = (e) => {
        let filteredItems = itemList.filter(item => item.name.includes(e.target.previousElementSibling.value));
        setSearchList(filteredItems);
    }

    return (
        <div className="">
            <h1 className='mt-5'>
                {avatarCategory}
            </h1>
            <h3 className='mb-5'>
                자유롭게 아바타를 꾸며보세요!
            </h3>
            <div className='row justify-content-end me-4'>
                <div className='w-[30%] col-auto'>
                    <div class="input-group input-group-sm">
                        <input type="text" class="form-control" placeholder="검색할 아이템을 입력하세요" aria-label="검색할 아이템을 입력하세요" aria-describedby="avatar-search-button" />
                        <button class="btn btn-outline-secondary" type="button" id="avatar-search-button" onClick={handleSearch}>검색</button>
                    </div>
                </div>
            </div>
            <hr className='mx-3'/>
            <div className='ms-2 mt-4 d-flex flex-wrap align-items-center'>
                {searchList.map((item) => (
                    <AvatarItem item={item} category={avatarCategory} eng_category={props.eng_category}/>
                ))}
            </div>
        </div>
    );
};
