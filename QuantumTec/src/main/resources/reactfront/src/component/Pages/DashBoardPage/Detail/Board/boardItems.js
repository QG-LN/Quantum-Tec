import React, {useEffect, useState} from 'react';
import {axiosRequest} from '../../../../Utils/networkUtils';
import TablePage from '../../tablePage';
import ItemTableRow from '../../../item-table-row';
import LogDetailTableRow from '../../../log-detail-table-row';

function BoardItems({state, setState}){
	const [commentData, setCommentData] = useState([]);		// 댓글 리스트
	const [logData, setLogData] = useState([]);				// 게시글 수정 로그

	const commentHeadLabel = [
		{ id: 'commentIndex', label: '번호', align: 'center'},
		{ id: 'commentContent', label: '댓글 내용', align: 'center' },
		{ id: 'commentCreatedDate', label: '댓글 작성 시간', align: 'center' },
		{ id: 'commentWriter', label: '사용자명', align: 'center' },
		{ id: 'commentRating', label: '평점', align: 'center' },
		{ id: 'commentUpvote', label: '추천 수', align: 'center' },
		{ id: 'commentDownvote', label: '비추천 수', align: 'center' },
	];

	const logDetailHeadLabel = [
        { id: 'columnName', label: '활동사항', align: 'center' },
        { id: 'newValue', label: '활동내용', align: 'center' },
        { id: 'operatedBy', label: '활동자', align: 'center' },
        { id: 'timestamp', label: '활동 시간', align: 'center'}
    ];

	useEffect(() => {
		if (!state.postIndex) {
			// userIndex가 없다면, 요청을 보내지 않습니다.
			return;
		}
		const path = 'dashboard/postcomment';
		const body = {
			postIndex: state.postIndex
		}
		axiosRequest(path, body, 'POST', 'json')
			.then((response) => {
				console.log(response);
				setCommentData(response);
			})
			.catch((error) => {
				console.log(error);
			});

		// const path2 = 'dashboard/postinfo/modifylog';
		// const body2 = {
		// 	postIndex: state.postIndex
		// }
		// axiosRequest(path2, body2, 'POST', 'json')
		// 	.then((response) => {
		// 		console.log(response);
		// 		setLogData(response);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	}, [state.postIndex]);

	return (
		<div>
			<TablePage margin={false} createButton={false} title={"댓글리스트_"+ state.postTitle} dataRow={ItemTableRow} dataLabel={commentHeadLabel} data={commentData} />
			{/* <TablePage margin={false} createButton={false} title={"활동사항_"+state.postTitle} dataRow={LogDetailTableRow} dataLabel={logDetailHeadLabel} data={logData} /> */}
		</div>
	)
}

export default BoardItems;