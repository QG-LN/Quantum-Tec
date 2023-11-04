/**
 * @fileoverview QuickButton의 초기 버튼 정보를 정의한 파일
 */

import { faArrowLeft, faRepeat, faTrash, faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

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