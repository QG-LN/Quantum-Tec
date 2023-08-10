import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AvatarItem(props) {
    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imgSrc = `${process.env.PUBLIC_URL}/image/${props.eng_category==="bg"?"background":props.eng_category}/${props.item.eng_name}_${props.eng_category}_shop.png`;
    useEffect(() => {
        // console.log(props);
    }, []);
    return (
        <div class="card w-[18.5%] ms-2 placeholder-glow mb-4" aria-hidden="true">
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
                            <div class="placeholder ratio ratio-1x1 rounded"></div>
                        </div>
                        <div className='col-7'>
                            {props.item.name}
                            <h6 class="card-text placeholder-glow">
                                <div class="placeholder col-5"></div> 제작
                            </h6>
                            <h6 class="card-text placeholder-glow">
                                <div class="placeholder col-8"></div>
                            </h6>
                            <h6 class="card-text placeholder-glow">
                                <div class="placeholder col-2"></div>
                                <div class="placeholder ms-2 col-5"></div>
                            </h6>
                            <br/>
                            <br/>
                            <h6 class="card-text placeholder-glow">
                                <div class="placeholder col-4"></div>
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
                {/* <div class="placeholder ratio ratio-1x1 rounded-top"></div> */}
                <img src={imgSrc}/>
                {/* <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" class="card-img-top" alt="..."/> */}
                <div class="text-start m-3">
                    <h5 class="card-title placeholder-glow">
                        {props.item.name} {props.category}
                    {/* <div class="placeholder col-5"></div> */}
                    </h5>
                    <h6 class="card-text placeholder-glow">
                        <div class="placeholder col-7"></div>
                    </h6>
                    <h6 class="card-text placeholder-glow text-end">
                        <div class="placeholder col-5"></div>
                    </h6>
                </div>
            </div>
        </div>
    );
}

