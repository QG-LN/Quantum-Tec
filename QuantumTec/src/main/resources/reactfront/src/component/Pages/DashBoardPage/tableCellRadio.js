import React, { useState, useRef, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
// import {EditingContext} from './Detail/User/profileInfo';
import { editingId, setEditingId, originalContent, setOriginalContent } from './Data/editingValue';


/**
 * TableCellRadio 컴포넌트는 대시보드 테이블의 라디오 버튼셀을 나타냅니다.
 * @param {Object} props - TableCellRadio 컴포넌트의 속성
 * @param {string} props.id - 셀의 고유 식별자
 * @param {string} props.content - 셀의 내용
 * @param {array} props.items - 라디오버튼의 내용
 * @param {string} props.className - 셀의 클래스 이름
 * @param {function} props.onUpdate - 셀 내용이 업데이트될 때 호출되는 콜백 함수
 * @param {boolean} [props.editable=true] - 셀이 편집 가능한지 여부
 * @param {boolean} props.isLoading - 셀이 로딩 중인지 여부
 * @returns {JSX.Element} TableCellRadio 컴포넌트의 JSX 요소
 */
function TableCellRadio({ id, content, items, className, onUpdate, editable = true, isLoading }) {
    // const { editingId, setEditingId, originalContent, setOriginalContent } = useContext(EditingContext);
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
                    <>
                        <input
                            className='btn-check'
                            name={id}
                            autocomplete="off" 
                            type="radio"
                            value={item}
                            id={item}
                            ref={inputRef}
                            onClick={handleChangeValue}
                            checked={inputValue === item}
                        />
                        <label className="btn btn-sm" onClick={e=>e.stopPropagation()} for={item}>
                            {item}
                        </label>
                    </>
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