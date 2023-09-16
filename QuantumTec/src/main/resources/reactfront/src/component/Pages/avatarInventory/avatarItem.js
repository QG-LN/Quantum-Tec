import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tooltip from '../../Utils/tooltip';
import { axiosRequest } from '../../../module/networkUtils';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatarItemList } from '../../../redux/actions/avatarActions';
import { setCashChange } from '../../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();
    // 모달을 보여주기 위한 상태
    const [show, setShow] = useState(false);
    const handleClose = (e) => {
        setShow(false);
        // 이벤트 버블링 방지
        e?.stopPropagation();
    };
    const handleShow = () => setShow(true);

    // 텍스트 애니메이션 ref
    const textRef = useRef(null);
    const boxRef = useRef(null);

    const handleMouseEnter = () => {
        const boxWidth = boxRef.current.clientWidth;
        const textWidth = textRef.current.clientWidth;

        if (textWidth > boxWidth) {
            const moveDistance = boxWidth - textWidth;
            textRef.current.style.left = `${moveDistance}px`;
        }
    };

    const handleMouseLeave = () => {
        textRef.current.style.left = '0';
    };
    ////////////////////////////////////////////

    const checkLogin = () => {
        if(localStorage.getItem("userNickname") == null){
            alert("로그인이 필요한 서비스입니다.");
            navigate('/login');
        }
    }

    const checkCash = () => {
        if(localStorage.getItem("userCash") < props.item.priceCash){
            alert("캐시가 부족합니다.");
            navigate('/cashcharge');
        }
        else{
            const body = {
                userId: localStorage.getItem("userID"),
                itemIndex: props.item.itemIndex,
                paymentMethod: 'cash',
                paymentStatus: '결제 완료',
                paymentAmount: props.item.itemPrice,
            };
            axiosRequest('avatar/shop/item/buy', body, 'POST', 'json')
                .then(res => {
                    if(res === true){
                        // 구매 완료 후 캐시 차감된 내 캐시 상황을 어떻게 반영할지 고민해보기(DB에서 가져오는 방식으로?, 수동으로?)
                        handleCashUpdate(localStorage.getItem("userCash") - props.item.itemPrice);
                        localStorage.setItem("userCash", localStorage.getItem("userCash") - props.item.itemPrice);
                        setShow2(false);
                        setCheckBuy(true);
                        setTitleBuyItem('구매 완료!');
                        setContentBuyItem('구매가 완료되었습니다.');
                        setShow2(true);
                    }
                    else{
                        alert("구매에 실패하였습니다.");
                    }
                })

        }
    }

    const checkBuyItem = () => {
        const body = {
            userId: localStorage.getItem("userID"),
            itemIndex: props.item.itemIndex,
        };
        axiosRequest('avatar/shop/item/check', body, 'POST', 'json')
            .then(res => {
                if(res === true){
                    alert("이미 구매한 아이템입니다.");
                    handleClose();
                }
                else{
                    checkCash(); // 캐시 확인
                }
            }
        );

    }

    const handleBuyForCash = () => {
        checkLogin();   // 로그인 확인
        checkBuyItem(); // 이미 구매했는지 확인
        // 캐시 확인
        // 구매 처리
        // 구매 후 아이템 저장
    }

    const handleBuyForFreeCash = () => {
        checkLogin();   // 로그인 확인
        // 이미 구매했는지 확인
        // 프리캐시 확인
        // 구매 처리
        // 구매 후 아이템 저장
        alert("미구현");
    }

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

    const handleCashUpdate = (newCash) => {
        dispatch(setCashChange(newCash));
    };

    useEffect(() => {
        let isChanged = false;
        // 아이템 착용 상태 확인
        for(let i = 0; i < avatarItemList.length; i++){
            if(avatarItemList[i].itemName === props.item.itemName){
                setItemUsageStatus(true);
                isChanged = true;
                break;
            }
        }
        if(!isChanged){
            setItemUsageStatus(false);
        }
    }, [, avatarItemList]);

    try {
        imgSrc = `${process.env.PUBLIC_URL}/image/${props.item.itemCategoryName}/${props.item.itemName}_shop.png`;
    } catch (e) {
        imgSrc = "";
        console.log(e);
    }

    const changeNumberFormat = (num) => {
        if (num === undefined) {
            return 0;
        }
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
            console.log(props.item.itemIndex)
            axiosRequest('avatar/inventory/item/inactive', body, 'POST', 'json')
                .then(res => {
                    console.log(res);
                    setItemUsageStatus(false);
                    const itemIndex = itemList.findIndex(item => item.itemIndex === props.item.itemIndex);
                    if (itemIndex !== -1) {
                        itemList.splice(itemIndex, 1);
                        handleUpdate(itemList);
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
            axiosRequest('avatar/inventory/item/active', body, 'POST', 'json')
                .then(res => {
                    const itemIndex = itemList.findIndex(item => item.itemCategoryName === props.item.itemCategoryName);
                    if (itemIndex !== -1) {
                        itemList[itemIndex] = props.item;
                    } else {
                        itemList.push(props.item);
                    }
                    handleUpdate(itemList);
                    setItemUsageStatus(true);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };


    const Item = () => {

        return (
            <div className='animated-main'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={boxRef}>
                {/* <div className="placeholder ratio ratio-1x1 rounded-top"></div> */}
                <img className='ratio ratio-1x1' src={imgSrc}/>
                {/* <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" class="card-img-top" alt="..."/> */}
                <hr className='m-0 border-1' />
                <div className="text-start m-3 animated-box">
                    <h6 className="card-title placeholder-glow animated-text" ref={textRef}>
                    {props.item && props.item.itemName ? props.item.itemName : "No item name available"}
                    {/* <div className="placeholder col-5"></div> */}
                    </h6>
                </div>
            </div>
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

    const [show2, setShow2] = useState(false);
    const handleClose2 = (e) => {
        setShow2(false);
        setDarken(false);
        // 이벤트 버블링 방지
        e?.stopPropagation();
        if(checkBuy){
            
            handleClose();
            props.refreshKey();
        }
    };
    const [darken, setDarken] = useState(false);
    const [titleBuyItem, setTitleBuyItem] = useState('캐시');
    const [contentBuyItem, setContentBuyItem] = useState('');
    const [checkBuy, setCheckBuy] = useState(false);

    const handleShow2 = (e) => {
        
        if(e.target.id === 'cash'){
            setTitleBuyItem('캐시를 사용하여 구매');
            const content = `정말로 구매하시겠습니까?
            ${localStorage.getItem("userCash")} -> ${localStorage.getItem("userCash") - props.item.itemPrice}`;
            setContentBuyItem(content);
        }
        else{
            setTitleBuyItem('프리캐시를 사용하여 구매');
        }
        setShow2(true);
        setDarken(true);

    }

    const showModal = () => {
        return (
            <div onClick={e=>e.stopPropagation()}>

                <Modal show={show2} onHide={handleClose2} centered={true}>
                    <Modal.Header>
                        <Modal.Title className='w-[100%]'>
                            {titleBuyItem}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='ml-5'>
                        {contentBuyItem.split("\n").map((letter)=>(<>{letter}<br /></>))}
                    </Modal.Body>
                    <Modal.Footer>
                        { !checkBuy && <Button className="btn_close" variant="success" onClick={handleBuyForCash}>
                            구매
                        </Button>}
                        <Button className="btn_close" variant="secondary" onClick={handleClose2}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal className={darken ? 'darken' : 'lighten'} show={show} onHide={handleClose} centered={true}>
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
                        <Button className="btn_close" variant="success" onClick={handleBuyForFreeCash} id='freecash'>
                            {changeNumberFormat(props.item.itemPrice * 10)} freecash
                        </Button>
                        <Button className="btn_close" variant="success" onClick={handleShow2} id='cash'>
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
        <div className={'card w-[18.5%] ms-1 placeholder-glow mb-4 border border-5'+((itemUsageStatus)?' border-success-subtle':'')} aria-hidden="true" onClick={handleItemToggle}>
            {page === 'shop' ? showModal() : null}
            {showTooltip()}
        </div>
    );
}

