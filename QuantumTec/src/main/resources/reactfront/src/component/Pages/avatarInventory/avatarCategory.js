import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvatarItem from './avatarItem';

export default function AvatarCategory(props) {
    const [itemList, setItemList] = useState([]); // 아이템 목록
    
    useEffect(() => {
        axios.get('http://localhost:8080/api/avatar/category?category='+props.categoryName)
            .then((response) => {
                setItemList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSearch = (e) => {
        axios.get('http://localhost:8080/api/avatar/search?keyword='+e.target.previousElementSibling.value)
            .then((response) => {
                setItemList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const showItemList = () => {
        if (itemList.length === 0) {
            return (
                <div className='text-center'>
                    <h5>아이템이 없습니다.</h5>
                </div>
            );
        }
        else {
            return (
                itemList.map((item) => (
                    <AvatarItem item={item} category={props.categoryName} eng_category={props.eng_category}/>
                ))
            )
        }
    };
    return (
        <div className="">
            <h1 className='mt-5'>
                {props.categoryName}
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
                {showItemList()}
            </div>
        </div>
    );
};
