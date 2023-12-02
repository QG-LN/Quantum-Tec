import React, { useState, useRef, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {EditingContext} from './Detail/profileInfo';
//import {EditingContext} from './Detail/Game/profileInfo';

/**
 * TableCell 컴포넌트는 대시보드 테이블의 셀을 나타냅니다.
 * @param {Object} props - TableCell 컴포넌트의 속성
 * @param {string|array} props.id - 셀의 고유 식별자
 * @param {string|array} props.content - 셀의 내용
 * @param {string} props.className - 셀의 클래스 이름
 * @param {function} props.onUpdate - 셀 내용이 업데이트될 때 호출되는 콜백 함수
 * @param {boolean} [props.editable=true] - 셀이 편집 가능한지 여부
 * @param {boolean} props.isLoading - 셀이 로딩 중인지 여부
 * @returns {JSX.Element} TableCell 컴포넌트의 JSX 요소
 */
function TableCell({ id, content, className, onUpdate, editable = true, isLoading }) {
    const { editingId, setEditingId } = useContext(EditingContext);
    const [originalContent, setOriginalContent] = useState(content); // 수정 전 셀의 값
    const [inputValue, setInputValue] = useState(content); // 수정 중인 셀의 값
    const [showIcon, setShowIcon] = useState(false); // 수정(연필) 아이콘 표시 여부
    const inputRef = useRef(null); // 수정 중인 셀의 input 엘리먼트
    const [prevEditingId, setPrevEditingId] = useState(null); // 수정 중인 셀의 input 엘리먼트

    const isEditing = Array.isArray(id) ? editingId === id[0] : editingId === id; // 현재 셀이 수정 중인 셀인지 여부

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
    const handleEdit = () => {
        if (isEditing || !editable || isLoading) return;  // 추가된 코드
        setEditingId(Array.isArray(id) ? id[0] : id);
        setOriginalContent(inputValue);
    };
    // 테이블 셀에서 포커스가 벗어나면 수정 모드 종료
    const handleBlur = () => {
        if (originalContent !== inputValue) {
            if (window.confirm("수정사항이 있습니다. 저장하시겠습니까?")) {
                handleSave();
            }
            else{
                setInputValue(originalContent);
            }
        }
        setEditingId(null);
    };
    // 키보드의 Enter 키를 누르면 수정 모드 종료 후 저장
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    }

    // 수정 모드가 되면 input 엘리먼트에 포커스
    useEffect(() => {
        if(Array.isArray(id)){

            if (prevEditingId === id[0]) {
                handleClick(false);
            }

            setPrevEditingId(editingId);
        }
        else{
            if (isEditing && inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [isEditing]);


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

    return (
        <td 
            className={className+" position-relative pe-4"+ (editable&&!isLoading ? " cursor-text" : " cursor-not-allowed")} 
            onClick={handleEdit}
            onMouseEnter={() => setShowIcon(editable&&!isLoading?true:false)}
            onMouseLeave={() => setShowIcon(false)}
            style={{backgroundColor: "transparent"}}
        >
            {isEditing ? 
                (Array.isArray(content) ? 
                    (   
                        <>
                            {content.map((c,i)=>(
                                <input
                                    className='w-[100%] border-bottom text-sm'
                                    type="text"
                                    value={inputValue[i]}
                                    // ref={inputRef}
                                    // onKeyPress={handleKeyPress}
                                    onChange={(e) => {
                                        let temp = [...inputValue];
                                        temp[i] = parseInt(e.target.value);
                                        setInputValue(temp);
                                    }}
                                    // onBlur={handleBlur}
                                />
                            ))}
                            
                            <input
                                className='btn btn-success btn-sm'
                                type="button"
                                value="저장"
                                onClick={handleClick}/>
                        </>
                    )
                    :
                    (
                        <input
                            className='w-[100%]'
                            type="text"
                            value={inputValue}
                            ref={inputRef}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => setInputValue(e.target.value)}
                            onBlur={handleBlur}
                        />
                    )
                ) : (
                <>
                    {Array.isArray(content) ? content.join('/') : content}
                    {showIcon && <FontAwesomeIcon className='position-absolute top-50 end-0 translate-middle' icon={faPencilAlt} />}
                </>
            )}
        </td>
    );
}

export default TableCell;