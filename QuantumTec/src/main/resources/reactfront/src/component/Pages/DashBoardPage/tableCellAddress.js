import React, { useState, useRef, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {EditingContext} from './Detail/profileInfo';
import AddressModal from '../LoginPage/AddressModal';
import Modal from "react-bootstrap/Modal";
import DaumPostcode from "react-daum-postcode";

function TableCell({ id, content, className, onUpdate, editable = true, isLoading }) {
    const { editingId, setEditingId } = useContext(EditingContext);
    const [originalContent, setOriginalContent] = useState(content); // 수정 전 셀의 값
    const [inputValue, setInputValue] = useState(content); // 수정 중인 셀의 값
    const [showIcon, setShowIcon] = useState(false); // 수정(연필) 아이콘 표시 여부
    const [prevEditingId, setPrevEditingId] = useState(null); // 수정 중인 셀의 input 엘리먼트

    const isEditing = editingId === id[0]; // 현재 셀이 수정 중인 셀인지 여부

    //주소 관련

    // 주소 검색
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputPostAddress, setInputPostAddress] = useState(content[2])

    // 수정이 완료되면 inputValue를 부모 컴포넌트로 전달
    const handleSave = () => {
        if (originalContent !== inputValue) {
            if (onUpdate) {
                onUpdate(id, inputValue);
            }
        }
        setEditingId(null);
    };

    // 테이블 셀을 클릭하면 수정 모드로 변경
    const handleEdit = (e) => {
        if (isEditing || !editable || isLoading) return;  // 추가된 코드
        setEditingId(id[0]);
        setOriginalContent(inputValue);
    };

    // 저장버튼 누르면 수정 모드 종료
    const handleClick = (check = true) => {
        if (originalContent !== inputValue) {
            if (window.confirm("수정사항이 있습니다. 저장하시겠습니까?")) {
                handleSave();
            }
            else{
                setInputValue(originalContent);
            }
        }
        if(check)
            setEditingId(null);

    };

    // 포커스를 잃으면 수정 모드 종료
    useEffect(() => {
        if (prevEditingId === id[0]) {
            handleClick(false);
            adjustRowHeights();
        }

        setPrevEditingId(editingId);
    }, [editingId]);

    const handleClose = () => {
        setIsModalOpen(false);
    };


    const handleComplete = (data) => {
        // 주소값을 받아 넣기
        setInputValue([data.address, inputValue[1], data.zonecode]);
        setInputPostAddress(data.zonecode);
        setIsModalOpen(false);                // 모달창을 닫기
    }

    return (
        <td 
            className={className+" position-relative pe-4"+ (editable&&!isLoading ? " cursor-text" : " cursor-not-allowed")} 
            onClick={handleEdit}
            onMouseEnter={() => setShowIcon(editable&&!isLoading?true:false)}
            onMouseLeave={() => setShowIcon(false)}
            style={{backgroundColor: "transparent"}}
        >

            <Modal show={isModalOpen} onHide={handleClose} className='mt-5'>
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

                    
            {isEditing ? (
                <>
                    <input 
                        type='text' 
                        className='w-[100%] border-bottom text-sm' 
                        value={inputValue[0]}
                        onClick={(e) => {e.stopPropagation();setIsModalOpen(true)}} 
                        readOnly/>
                    <input
                        className='w-[100%] border-bottom text-sm'
                        type="text"
                        value={inputValue[1]}
                        onChange={(e) => setInputValue([inputValue[0], e.target.value, inputValue[2]])}
                        />
                    <input
                        className='w-[100%] border-bottom text-sm'
                        type="text"
                        value={inputPostAddress}
                        readOnly/>
                    <input
                        className='btn btn-success btn-sm'
                        type="button"
                        value="저장"
                        onClick={handleClick}
                    />
                </>
            ) : (
                <div className='text-sm'>
                    {content[0] + " (" + content[2] + ") " + content[1]}
                    {showIcon && <FontAwesomeIcon className='position-absolute top-50 end-0 translate-middle' icon={faPencilAlt} />}
                </div>
            )}
        </td>
    );
}

export default TableCell;