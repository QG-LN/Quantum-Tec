import React, { useState, useEffect, useRef } from 'react';
import Tooltip from '../../Utils/tooltip';
import { axiosRequest } from '../../../module/networkUtils';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatarItemList } from '../../../redux/actions/avatarActions';

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
    // 아이템 이미지 경로
    let imgSrc;
    // 아이템 착용 상태
    const [itemUsageStatus, setItemUsageStatus] = useState(false);

    const avatarItemList = useSelector(state => state.avatarItemList);
    const dispatch = useDispatch();

    const handleUpdate = (newItemList) => {
        dispatch(setAvatarItemList(newItemList));
    };

    useEffect(() => {
        // 아이템 착용 상태 확인
        for(let i = 0; i < avatarItemList.length; i++){
            if(avatarItemList[i].itemName === props.item.itemName){
                setItemUsageStatus(true);
                break;
            }
        }
    }, []);

    try {
        imgSrc = `${process.env.PUBLIC_URL}/image/${props.item.itemCategoryName}/${props.item.itemName}_shop.png`;
    } catch (e) {
        imgSrc = "";
        console.log(e);
    }

    // 툴팁 내용
    const tooltip = (
        <div className='text-left m-3'>
            <h4>{props.item.itemName}</h4><br />
            구매일 : {props.item.paymentDate}<br />
            분류 : {props.item.itemCategoryName}<br />
            {props.item.itemDesc}<br />
        </div>
    );
    
    // 아이템 착용 토글 핸들러
    const handleItemToggle = () => {
        const itemList = [...avatarItemList];
        if (itemUsageStatus) {
            // 아이템 착용 해제 요청
            const body = {
                userId: localStorage.getItem("userID"),
                itemIndex: props.item.itemIndex,
            }
            axiosRequest('http://localhost:9090/avatar/inventory/item/inactive', body, 'POST', 'json')
                .then(res => {
                    console.log(res);
                    setItemUsageStatus(false);
                    for(let i = 0; i < itemList.length; i++){
                        if(itemList[i].itemIndex === props.item.itemIndex){
                            itemList.splice(i, 1);
                            handleUpdate(itemList);
                            break;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            // 아이템 착용 요청
            const body = {
                userId: localStorage.getItem("userID"),
                itemIndex: props.item.itemIndex,
            }
            axiosRequest('http://localhost:9090/avatar/inventory/item/active', body, 'POST', 'json')
                .then(res => {
                    console.log(res);
                    setItemUsageStatus(true);
                    for(let i = 0; i < itemList.length; i++){
                        if(itemList[i].itemCategoryName === props.item.itemCategoryName){
                            itemList.splice(i, 1);
                            itemList.push(props.item);
                            handleUpdate(itemList);
                            break;
                        }
                    }
                    itemList.push(props.item);
                    handleUpdate(itemList);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    return (
        <div className={'card w-[18.5%] ms-2 placeholder-glow mb-4 border border-5'+((itemUsageStatus)?' border-success-subtle':'')} aria-hidden="true" onClick={handleItemToggle}>
                
            <Tooltip content={tooltip}>
                {/* <div className="placeholder ratio ratio-1x1 rounded-top"></div> */}
                <img src={imgSrc}/>
                {/* <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" class="card-img-top" alt="..."/> */}
                <hr className='m-0 border-1' />
                <div className="text-start m-3">
                    <h5 className="card-title placeholder-glow">
                        {props.item && props.item.itemName ? props.item.itemName : "No item name available"}
                    {/* <div className="placeholder col-5"></div> */}
                    </h5>
                </div>
            </Tooltip>
        </div>
    );
}

