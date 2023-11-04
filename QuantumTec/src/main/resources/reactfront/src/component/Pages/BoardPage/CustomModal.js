import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/**
 * 튜터링 상세 페이지에서 사용할 모달 컴포넌트
 * @param {*} param0 close : 모달 닫기 함수, button : 모달에 표시할 버튼 정보
 * @returns 모달 컴포넌트
 */
export default function CustomModal({ close, button}) {

	const customModalStyles = {
		content: {
		  position: "fixed",
		  top: "50%",
		  left: "50%",
		  transform: "translate(-50%, -50%)",
		},
	};

	return (
		<Modal 
			show={true} 
			onHide={close} 
			style={customModalStyles}
			contentLabel="Example Modal"
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-lg">
					{button.text === undefined ? "Example Modal" : button.text}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{button.comment}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={button.buttonOK.event}>
					{button.text}
				</Button>
				<Button variant="secondary" onClick={close}>
					취소하기
				</Button>
			</Modal.Footer>
			
		</Modal>
	)
}