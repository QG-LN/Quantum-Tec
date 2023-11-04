/**
 * @fileoverview QuickButton의 초기 버튼 정보를 정의한 파일
 */

import { faArrowLeft, faRepeat, faTrash, faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// 초기 버튼 정보를 상수로 정의
export const initialButtons = [
  { id: 1, text: "뒤로가기", to: "/tutoring", icon: faArrowLeft },
  { id: 2, text: "수정하기", icon: faRepeat },
  { id: 3, text: "삭제하기", icon: faTrash, comment: "정말로 삭제하시겠습니까?"},
  { id: 4, text: "", icon: faCheck, comment: "" },
  { id: 5, text: "신청자 목록", icon: faCheck },
  { id: 6, text: "", icon: faBan, comment: "" },
];

// 초기 버튼 정보에 대한 상수값
export const NONE_BUTTON = 0;			// 미정의 버튼
export const BACK_BUTTON = 1;			// 뒤로가기 버튼
export const EDIT_BUTTON = 2;
export const DELETE_BUTTON = 3;
export const CHECK_BUTTON = 4;
export const APPLICANT_LIST_BUTTON = 5;
export const BAN_BUTTON = 6;

export default function useQuickButtonState() {
  const [buttons, setButtons] = useState(initialButtons);		// 버튼 정보
  
  /**
   * 버튼 이벤트에 따라 초기화
   * 기존 버튼 정보에 showModal, isHovered, buttonOK 추가
   * showModal -> 모달창 활성화 여부
   * isHovered -> 버튼 위에 마우스 올려져 있는지 여부
   * buttonOK -> 모달창에서 확인 버튼 클릭시 실행할 모달창 데이터 [title, event]
   * title -> 모달창에서 확인 버튼 텍스트
   * event -> 모달창에서 확인 버튼 클릭시 실행할 함수 
   * [buttonOkEvent="delete" | "insert" | "postUpdate"]= 모달창에서 확인 버튼 클릭시 실행할 함수 종류
   */
  const initializeButtons = (buttonOkEvent) => {
    setButtons(
      initialButtons.map((button) => {
        return {
          ...button,
          showModal: false,
          isHovered: false,
          buttonOK: 
            button.id === DELETE_BUTTON ? {
            title: "삭제하기",
            event: () => buttonOkEvent("delete"),
          } : button.id === CHECK_BUTTON ? {
            title: "",
            event: () => buttonOkEvent("insert"),
          } : button.id === BAN_BUTTON ? {
            title: "",
            event: () => buttonOkEvent("postUpdate"),
          } : undefined,
        };
      })
    );
  }

  /**
   * 이벤트가 없는 버튼으로 변경
   * @param {*} id 버튼 인덱스
   * @param {*} title 버튼 텍스트
   * @param {*} newIcon 버튼 아이콘
   */
  const setNoneButtonEvent = (id, title, newIcon) => {
    setButtons(
      buttons.map((button) => {
        if (button.id === id) {
          return {
            ...button,
            text: title,
            icon: newIcon,
            buttonOK: undefined,
          };
        } else {
          return button;
        }
      })
    );
  }

  return {
    buttons,
    setButtons,
    initializeButtons,
    setNoneButtonEvent,
  }
}