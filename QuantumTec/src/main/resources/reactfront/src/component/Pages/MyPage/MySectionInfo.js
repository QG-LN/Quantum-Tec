import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
export default function MySectionInfo(props){

    const [userInfo, setUserInfo] = useState({}); // 유저 정보
    const contentWidth = "75%"; // 내용의 너비를 75%로 설정

    const keyValue = [
        "ID",
        "이름",
        "닉네임",
        "이메일",
        "주소",
        "상세주소",
        "우편번호",
        "사용 여부",
        "성별",
    ]

    const renderUserInfoItems = () => {
        return Object.entries(userInfo).map(([key, value], index) => (
            <div className="d-flex mt-2" key={index} style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                <div className="w-25 text-end pe-2">
                    <span>{keyValue[index]}</span>
                </div>
                <div className="w-75 d-flex align-items-center" style={{ width: contentWidth }}>
                    <span className="mx-auto">{value}</span>
                </div>
            </div>
        ));
    };


    useEffect(() => {
       setUserInfo(props.info);
    });
    const handleClose = () => {
        // setIsOpen(false);
        props.setSendOk(false);
        props.setModalOpen(false);
    };

    const handleOk = () => {
        props.setSendOk(true);
        props.setModalOpen(false);
    };

    return (
        <>
            {/*  modalOpen값에 따라 활성/비활성화 */}
            <Modal show={props.modalOpen} onHide={handleClose}>
                <Modal.Body>
                    <h3 className="text-center"> 입력 정보 확인</h3>
                    <hr/>
                    <div class="text-center mb-3 text-secondary">
                        *  입력하신 정보가 올바른지 확인해주세요.  *
                    </div>
                    <div>
                        {renderUserInfoItems()}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleOk}>
                        확인
                    </button>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        취소
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}