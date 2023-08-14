import Modal from "react-bootstrap/Modal";
import React from "react";
import DaumPostcode from "react-daum-postcode";

export default function AddressModal(props){

    const handleComplete = (data) => {
        // 주소값을 받아 넣기
        props.setInputAddress(data.address);
        props.setInputPostAddress(data.zonecode);
        props.setIsModalOpen(false);                // 모달창을 닫기
    }

    const handleClose = () => {
        props.setIsModalOpen(false);
    };

    return (
        <>
            <Modal show={props.isModalOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        주소 검색
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DaumPostcode
                        onComplete={handleComplete}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}