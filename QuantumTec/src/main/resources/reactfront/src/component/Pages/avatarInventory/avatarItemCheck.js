import React from 'react';
import AvatarItem from './avatarItem';

/**
 * 아바타 아이템이 존재하는지 확인하는 컴포넌트
 * @param {Object} props - 부모 컴포넌트로부터 받아온 props
 * @param {Object[]} props.itemList[] - 아이템 목록 또는
 * @param {string} props.itemList[].itemCategoryName - 아이템 카테고리 이름
 * @param {string} props.itemList[].itemName - 아이템 이름
 * @param {string|undefined} props.itemList[].itemDescription - 아이템 설명
 * @param {string|undefined} props.itemList[].itemUsageStatus - 아이템 사용 여부
 * @param {string|undefined} props.itemList[].paymentDate - 아이템 구매 날짜
 * @returns {JSX.Element} - AvatarItemCheck 컴포넌트.
 * @author MayoneJY <mayone6063@kakao.com>
 */
export default function AvatarItemCheck(props) {
    if (props.itemList.length === 0) {
        return (
            <div>
                <h5 className='text-center'>아이템이 없습니다.</h5>
            </div>
        );
    }
    else {
        return (
            <div className='ms-2 mt-4 d-flex flex-wrap align-items-center'>
                {props.itemList.map((item) => (
                    <AvatarItem item={item}/>
                ))}
            </div>
        )
    }
}
