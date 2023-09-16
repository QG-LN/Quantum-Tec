import React, { useState, useEffect } from 'react';
import AvatarItemCheck from './avatarItemCheck';
import {axiosRequest} from '../../../module/networkUtils';
import { useSelector } from 'react-redux';

/**
 * 로그인을 하고, 카테고리를 선택했을 때 해당 카테고리의 아이템을 보여주는 컴포넌트
 * @param {Object} props - 부모 컴포넌트로부터 받아온 props
 * @param {string} props.categoryName - 아바타 카테고리 이름
 * @returns {JSX.Element} - AvatarCategory 컴포넌트.
 * @author MayoneJY <mayone6063@kakao.com>
 */
export default function AvatarCategory(props) {

    // 아이템 목록
    const [itemList, setItemList] = useState([]);
    const page = useSelector(state => state.avatar.page);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey(refreshKey + 1);
    }
    useEffect(() => {
        // 카테고리에 해당하는 아이템 목록을 가져오기 위한 요청
        const body = {
            userId: localStorage.getItem("userID"),
            itemCategoryName: props.categoryName,
        };
        let url;
        if(page === 'shop')
            url = 'avatar/shop/category/item';
        else
            url = 'avatar/category/inventory';
        axiosRequest(url, body, 'POST', 'json')
            .then(res => {
                setItemList(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, [,refreshKey]);

    // 아바타 아이템을 검색하는 함수
    const handleSearch = (e) => {
        // 아바타 아이템을 카테고리에 맞게 검색하기 위한 요청.
        const body = {
            userId: localStorage.getItem("userID"),
            itemCategoryName: props.categoryName,
            searchValue: e.target.previousElementSibling.value,
        };
        let url;
        if(page === 'shop')
            url = 'avatar/shop/category/search';
        else
            url = 'avatar/category/inventory/search';
        axiosRequest(url, body, 'POST', 'json')
            .then(res => {
                setItemList(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

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
                    <div className="input-group input-group-sm">
                        <input type="text" className="form-control" placeholder="검색할 아이템을 입력하세요" aria-label="검색할 아이템을 입력하세요" aria-describedby="avatar-search-button" />
                        <button className="btn btn-outline-secondary" type="button" id="avatar-search-button" onClick={handleSearch}>검색</button>
                    </div>
                </div>
            </div>
            <hr className='mx-3'/>
            <div>
                <AvatarItemCheck itemList={itemList} refreshKey={handleRefresh}/>
            </div>
        </div>
    );
};
