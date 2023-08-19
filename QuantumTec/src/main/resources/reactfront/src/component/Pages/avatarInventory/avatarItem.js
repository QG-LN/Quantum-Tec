import React, { useState, useEffect, useRef } from 'react';
import Tooltip from '../../tooltip';
import { OverlayTrigger } from 'react-bootstrap';

/**
 * 아바타 아이템을 보여주는 컴포넌트
 * @param {Object} props - 부모 컴포넌트로부터 받아온 props
 * @param {Object} props.item - 아이템 정보
 * @param {string} props.item.itemCategoryName - 아이템 카테고리 이름
 * @param {string} props.item.itemName - 아이템 이름
 * @param {string|undefined} props.item.itemDescription - 아이템 설명
 * @param {string|undefined} props.item.itemUsageStatus - 아이템 사용 여부
 * @param {string|undefined} props.item.paymentDate - 아이템 구매 날짜
 * @returns {JSX.Element} - AvatarItem 컴포넌트.
 * @author MayoneJY <mayone6063@kakao.com>
 */
export default function AvatarItem(props) {

    // 모달을 보여주기 위한 상태
    const [show, setShow] = useState(false);
    // 모달을 닫기 위한 함수
    const handleClose = () => setShow(false);
    // 모달을 보여주기 위한 함수
    const handleShow = () => setShow(true);
    // 아이템 이미지 경로
    let imgSrc;

    try {
        imgSrc = `${process.env.PUBLIC_URL}/image/${props.item.itemCategoryName}/${props.item.itemName}_shop.png`;
    } catch (e) {
        imgSrc = "";
        console.log(e);
    }

    const tooltip = (
        <div className='text-left m-3'>
            <h4>파란색 배경</h4><br />
            구매일 : 2023-08-16 22:54:50<br />
            분류 : 배경<br />
            파란색 배경 아이템입니다.<br />
        </div>
    );

    return (
        <div className="card w-[18.5%] ms-2 placeholder-glow mb-4" aria-hidden="true">
                
            <Tooltip content={tooltip}>
                <div onClick={handleShow}>
                    {/* <div className="placeholder ratio ratio-1x1 rounded-top"></div> */}
                    <img src={imgSrc} className='rounded-top'/>
                    {/* <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" class="card-img-top" alt="..."/> */}
                    <div className="text-start m-3">
                        <h5 className="card-title placeholder-glow">
                            {props.item && props.item.itemName ? props.item.itemName : "No item name available"}
                        {/* <div className="placeholder col-5"></div> */}
                        </h5>
                        <h6 className="card-text placeholder-glow">
                            <div className="placeholder col-7"></div>
                        </h6>
                        <h6 className="card-text placeholder-glow text-end">
                            <div className="placeholder col-5"></div>
                        </h6>
                    </div>
                </div>
            </Tooltip>
        </div>
    );
}

