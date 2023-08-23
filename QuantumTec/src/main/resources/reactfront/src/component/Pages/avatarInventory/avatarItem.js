import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
    const handleClose = (e) => {
        setShow(false);
        // 이벤트 버블링 방지
        e?.stopPropagation();
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log(show);
    }, [show]);
    // 아이템 이미지 경로
    let imgSrc;
    // 아이템 착용 상태
    const [itemUsageStatus, setItemUsageStatus] = useState(false);

    const avatarItemList = useSelector(state => state.avatar.itemList);
    const page = useSelector(state => state.avatar.page);
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

    const changeNumberFormat = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        if(page !== 'inventory'){
            handleShow();
            return;
        }
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
    };

    const Item = () => {
        return (
            <>
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
            </>
        )
    };

    const showTooltip = () => {
        if (page === 'inventory') {
            return (
                <Tooltip content={tooltip}>
                    <Item />
                </Tooltip>
            )
        }
        else {
            return (
                <Item />
            )
        }
    }

    const showModal = () => {
        return (
            <div onClick={e=>e.stopPropagation()}>
                <Modal show={show} onHide={handleClose} centered={true}>
                    <Modal.Header>
                        <Modal.Title className='w-[100%]'>
                            <div className='row justify-content-between'>
                                <div className='col-2'>
                                    구매
                                </div>
                                <div className='col-6 row justify-content-between'>
                                    <h3 class="card-text placeholder-glow col-6">
                                        <div class="placeholder col-12"></div>
                                    </h3>
                                    <h3 class="card-text placeholder-glow col-6">
                                        <div class="placeholder col-12"></div>
                                    </h3>
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row justify-content-between'>
                            <div className='placeholder-glow col-5'>
                                {/* <div class="placeholder ratio ratio-1x1 rounded"></div> */}
                                <img src={imgSrc} className='rounded'/>
                            </div>
                            <div className='col-7'>
                                <h4>
                                    {props.item.itemName} 아이템
                                </h4>
                                
                                <h6 class="card-text placeholder-glow">
                                    {props.item.userNickname} 제작
                                </h6>
                                <h6 class="card-text placeholder-glow">
                                    카테고리 : {props.item.itemCategoryName}
                                </h6>
                                <br/>
                                <h6 class="card-text placeholder-glow">
                                    {props.item.itemDesc}
                                </h6>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn_close" variant="success" onClick={handleClose}>
                            {changeNumberFormat(props.item.itemPrice * 10)} freecash
                        </Button>
                        <Button className="btn_close" variant="success" onClick={handleClose}>
                            {changeNumberFormat(props.item.itemPrice)} cash
                        </Button>
                        <Button className="btn_close" variant="secondary" onClick={handleClose}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    };
    return (
        <div className={'card w-[18.5%] ms-2 placeholder-glow mb-4 border border-5'+((itemUsageStatus)?' border-success-subtle':'')} aria-hidden="true" onClick={handleItemToggle}>
            {page === 'shop' ? showModal() : null}
            {showTooltip()}
        </div>
    );
}

