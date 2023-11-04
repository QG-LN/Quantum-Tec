import { useState } from "react";
import { axiosRequest } from "../../Utils/networkUtils";

/**
 * 튜터링 신청자 목록을 관리하는 커스텀 훅
 * @returns 튜터링 신청자 목록을 관리하는 변수 / 함수
 */
export default function useApplyListState() {
	const [applyList, setApplyList] = useState([]);							      // 튜터링 신청자 목록
	const [isShowApplyList, setIsShowApplyList] = useState(false);                // 튜터링 신청자 목록 보여주기 여부

	/**
	 * 튜터링 신청자 목록 조회
	 * @param {*} type 튜터링 신청 상태
	 * @param {*} apply 신청자의 정보
	 * @param {*} info 게시글 정보
	 * @returns 튜터링 신청자 목록
	 */
	const loadApplyList = async (type, apply, info) => {
		const path = "board/updateTutoringEnroll";
		const body = {
			postTutoringIndex: info.postIndex,
			userNickname: apply.userNickname,
			enrollState: type,
			tutoringLink: info.link,
			userEmail: apply.userEmail,
		};

		const data = await axiosRequest(path, body, "POST", "boolean");

		return data;
	}

	return {
		applyList,
		setApplyList,
		isShowApplyList,
		setIsShowApplyList,
		loadApplyList,
	};
}