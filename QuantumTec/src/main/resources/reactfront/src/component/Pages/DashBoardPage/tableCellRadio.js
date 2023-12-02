import React, { useState, useRef, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {EditingContext} from './Detail/profileInfo';

function TableCellRadio({ id, content, items, className, onUpdate, editable = true, isLoading }) {
    const { editingId, setEditingId, originalContent, setOriginalContent } = useContext(EditingContext);
    const [inputValue, setInputValue] = useState(content); // 수정 중인 셀의 값
    const [showIcon, setShowIcon] = useState(false); // 수정(연필) 아이콘 표시 여부
    const inputRef = useRef(null); // 수정 중인 셀의 input 엘리먼트

    const isEditing = editingId === id; // 현재 셀이 수정 중인 셀인지 여부

    // 테이블 셀을 클릭하면 수정 모드로 변경
    const handleEdit = () => {
        if (isEditing || !editable || isLoading) return;  // 추가된 코드
        setEditingId(id);
        setOriginalContent(inputValue);
    };
    // 테이블 셀에서 포커스가 벗어나면 수정 모드 종료
    const handleChangeValue = (e) => {
        console.log(e.target.value)
        setInputValue(e.target.value);
        if (originalContent !== e.target.value) {
            if (window.confirm("수정사항이 있습니다. 저장하시겠습니까?")) {
                // 수정이 완료되면 inputValue를 부모 컴포넌트로 전달
                if (onUpdate) {
                    onUpdate(id, e.target.value);
                }
                setEditingId(null);
            }
            else{
                setInputValue(originalContent);
            }
        }
        setEditingId(null);
    };
    
    console.log(items)
    return (
        <td 
            className={className+" position-relative pe-4"+ (editable&&!isLoading ? " cursor-text" : " cursor-not-allowed")} 
            onClick={handleEdit}
            onMouseEnter={() => setShowIcon(editable&&!isLoading?true:false)}
            onMouseLeave={() => setShowIcon(false)}
            style={{backgroundColor: "transparent"}}
        >
            {isEditing ? (
                items.map((item) => (
                    <label onClick={e=>e.stopPropagation()}>
                        <input
                            className='form-check-input'
                            type="radio"
                            value={item}
                            ref={inputRef}
                            onClick={handleChangeValue}
                            checked={inputValue === item}
                        />
                        {item}
                    </label>
                ))
            ) : (
                <>
                    {content}
                    {showIcon && <FontAwesomeIcon className='position-absolute top-50 end-0 translate-middle' icon={faPencilAlt} />}
                </>
            )}
        </td>
    );
}

export default TableCellRadio;