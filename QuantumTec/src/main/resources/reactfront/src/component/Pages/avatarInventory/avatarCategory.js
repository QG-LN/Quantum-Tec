// @ts-check
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvatarItemCheck from './avatarItemCheck';
import {axiosRequest} from '../../../module/networkUtils';

/**
 * @typedef {Object} AvatarItemRequest
 * @property {string|null} userId - 유저 아이디
 * @property {string} itemCategoryName - 카테고리 이름
 */

/**
 * @typedef {Object} AvatarItemSearchRequest
 * @property {string|null} userId - 유저 아이디
 * @property {string} itemCategoryName - 카테고리 이름
 * @property {string} searchValue - 검색어
 */

/**
 * @typedef {Object} Item
 * @property {string} itemCategoryName - 아이템 카테고리 이름
 * @property {string} itemName - 아이템 이름
 * @property {(string|undefined)} itemDescription - 아이템 설명
 * @property {(string|undefined)} itemUsageStatus - 아이템 사용 여부
 * @property {(string|undefined)} paymentDate - 아이템 구매 날짜
 */

/**
 * 로그인을 하고, 카테고리를 선택했을 때 해당 카테고리의 아이템을 보여주는 컴포넌트
 * @param {Object} props - 부모 컴포넌트로부터 받아온 props
 * @param {string} props.categoryName - 아바타 카테고리 이름
 * @returns {JSX.Element} - AvatarCategory 컴포넌트.
 * @author MayoneJY <mayone6063@kakao.com>
 */
export default function AvatarCategory(props) {

    /** @type {Item} */
    const initialItem = {
        itemCategoryName: "",
        itemName: "",
        itemDescription: undefined,
        itemUsageStatus: undefined,
        paymentDate: undefined
    };
    /**
     * 아바타 아이템 목록
     * @type {[Item[], React.Dispatch<React.SetStateAction<Item[]>>]}
     */
    const [itemList, setItemList] = useState([initialItem]);
    useEffect(() => {
        /** 카테고리별 아바타 아이템을 가져오기 위한 요청. @type {AvatarItemRequest} */
        const body = {
            userId: localStorage.getItem("userID"),
            itemCategoryName: props.categoryName,
        };
        axiosRequest('http://localhost:9090/avatar/category/inventory', body, 'POST', 'json')
            .then(res => {
                setItemList(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    /**
     * 아바타 아이템 검색을 처리하는 함수.
     * @param {Object} e - 이벤트 객체
     */
    const handleSearch = (e) => {
        /** 아바타 아이템을 카테고리별로 검색하기 위한 요청. @type {AvatarItemSearchRequest} */
        const body = {
            userId: localStorage.getItem("userID"),
            itemCategoryName: props.categoryName,
            searchValue: e.target.previousElementSibling.value,
        };
        axiosRequest('http://localhost:9090/avatar/category/inventory/search', body, 'POST', 'json')
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
                <AvatarItemCheck itemList={itemList}/>
            </div>
        </div>
    );
};
