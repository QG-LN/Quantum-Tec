import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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

    return (
        <div className="card w-[18.5%] ms-2 placeholder-glow mb-4" aria-hidden="true">
            <Modal show={show} onHide={handleClose} centered={true}>
                <Modal.Header>
                    <Modal.Title className='w-[100%]'>
                        <div className='row justify-content-between'>
                            <div className='col-2'>
                                구매
                            </div>
                            <div className='col-6 row justify-content-between'>
                                <h3 className="card-text placeholder-glow col-6">
                                    <div className="placeholder col-12"></div>
                                </h3>
                                <h3 className="card-text placeholder-glow col-6">
                                    <div className="placeholder col-12"></div>
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
                            {props.item && props.item.itemName ? props.item.itemName : "No item name available"}
                            <h6 className="card-text placeholder-glow">
                                <div className="placeholder col-5"></div> 제작
                            </h6>
                            <h6 className="card-text placeholder-glow">
                                <div className="placeholder col-8"></div>
                            </h6>
                            <h6 className="card-text placeholder-glow">
                                <div className="placeholder col-2"></div>
                                <div className="placeholder ms-2 col-5"></div>
                            </h6>
                            <br/>
                            <br/>
                            <h6 className="card-text placeholder-glow">
                                <div className="placeholder col-4"></div>
                            </h6>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn_close" variant="success" onClick={handleClose}>
                        10,000 freecash
                    </Button>
                    <Button className="btn_close" variant="success" onClick={handleClose}>
                        1,000 cash
                    </Button>
                    <Button className="btn_close" variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
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
        </div>
    );
}

