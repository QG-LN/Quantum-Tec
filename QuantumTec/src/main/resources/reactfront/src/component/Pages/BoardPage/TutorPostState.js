import React, { useState } from 'react';

/**
 * 튜터링 게시글 상태를 관리하는 커스텀 훅
 * @returns 튜터링 게시글 상태를 관리하는 커스텀 훅
 */
export default function usePostState() {
	// state 기본 값 객체
	const initialState  = {
		postTitle: "오늘은 무엇을 스터디해볼까요?",    // 튜터링 게시글 제목
		postIndex: 0,                                // 튜터링 게시글 인덱스
		userNickname: "marais",                      // 튜터링 게시글 작성자 닉네임
		tags: [],                                    // 튜터링 태그
		postDate: "2023.09.16",                      // 튜터링 게시글 작성 날짜
		runningType: "",                             // 튜터링 진행 방식
		maxUserCount: 0,                             // 최대 신청 가능 인원
		userCount: 0,                                // 현재 신청한 인원
		startDate: "",                               // 튜터링 시작 날짜
		studyLink: "https://open.kakao.com/o/",      // 튜터링 링크
		expectedTime: 0,                             // 예상 기간
		category: [],                                // 튜터링 카테고리
		postIntro: "",                               // 튜터링 소개
		postContent: "",                             // 튜터링 내용
		postState: false,                            // 튜터링 게시글 상태
		avatarItemList: [],                          // 튜터링 게시글 작성자 아이템 목록
	  }

	const [state, setState] = useState(initialState); // state 

	return {
		state,
		setState,
	}
}