// @ts-check
import React, { useState, useEffect } from 'react';
import AvatarItemCheck from './avatarItemCheck';
import {axiosRequest} from '../../../module/networkUtils';

/**
 * @typedef {Object} AvatarItemSearchRequest
 * @property {string|null} userId - 유저 아이디
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
 * 검색을 했을 때 해당 아이템을 보여주는 컴포넌트
 * @param {Object} props - 부모 컴포넌트로부터 받아온 props
 * @param {string} props.searchName - 검색어
 * @param {React.MouseEventHandler<HTMLButtonElement>} props.onClick - 검색 버튼 클릭 이벤트
 * @returns {JSX.Element} - AvatarSearch 컴포넌트.
 * @author MayoneJY <mayone6063@kakao.com>
 */
export default function AvatarSearch(props) {
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
    /** 검색어 @type {string} */
    const searchValue = props.searchName;
    useEffect(() => {
        /** 검색어로 아바타 아이템을 가져오기 위한 요청. @type {AvatarItemSearchRequest} */
        const body = {
            userId: localStorage.getItem("userID"),
            searchValue: searchValue,
        }
        axiosRequest('http://localhost:9090/avatar/inventory/search', body, 'POST', 'json')
            .then(res => {
                if(res !== null)
                    setItemList(res);
            })
            .catch(err => {
                console.log(err);
            }
        );
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
                <div className='w-[30%] col-4'>
                    <div className="input-group input-group-sm">
                        <input type="text" className="form-control" placeholder="검색할 아이템을 입력하세요" aria-label="검색할 아이템을 입력하세요" aria-describedby="avatar-search-button"/>
                        <button className="btn btn-outline-secondary" type="button" id="avatar-search-button" onClick={props.onClick}>검색</button>
                    </div>
                </div>
            </div>
            <div className='d-flex align-items-center ms-4 mt-4'>
                {/* 왜 input박스 글자 바뀔 때 마다 바뀔까 */}
                <h5 className=''>모든 {searchValue} 아이템 ({itemList.length})</h5>
                <hr className='flex-fill mx-3'/>    
            </div>
            <div>
                <AvatarItemCheck itemList={itemList}/>
            </div>
        </div>
    );
};

