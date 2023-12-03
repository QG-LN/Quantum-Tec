import React, { useEffect } from 'react';
import { useState } from 'react';
import {axiosRequest} from '../../../../Utils/networkUtils';
import TablePage from '../../tablePage';
import ItemTableRow from '../../../item-table-row';
import LogDetailTableRow from '../../../log-detail-table-row';
function GameItems({state,setState}) {

    const [filter, setFilter] = useState("all");
    const [gameItems, setGameItems] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [logData, setLogData] = useState([]);

    console.log(state.gameName);

    // 결제 테이블 헤드 라벨
    const itemHeadLabel = [
        { id: 'paymentIndex', label: '번호', align: 'center' },
        { id: 'productUser', label: '결제자', align: 'center' },
        { id: 'paymentAmount', label: '결제 금액', align: 'center' },
        { id: 'paymentMethod', label: '결제 수단', align: 'center' },
        { id: 'paymentStatus', label: '결제 상태', align: 'center' },
        { id: 'paymentDate', label: '결제 일자', align: 'center' },
    ];

    // 댓글 테이블 헤드 라벨
    const commentHeadLabel = [
        { id: 'userName', label: '사용자명', align: 'center' },
        { id: 'commentContent', label: '댓글 내용', align: 'center' },
        { id: 'commentCreatedDate', label: '댓글 작성 시간', align: 'center' },
        { id: 'commentRating', label: '평점', align: 'center' },
        { id: 'commentUpvote', label: '추천 수', align: 'center' },
        { id: 'commentDownvote', label: '비추천 수', align: 'center' },
    ];

    const logDetailHeadLabel = [
        { id: 'title', label: '활동사항', align: 'center' },
        { id: 'content', label: '활동내용', align: 'center' },
        { id: 'changer', label: '활동자', align: 'center' },
        { id: 'changeDate', label: '활동 시간', align: 'center'}
    ];

    

    useEffect(() => {
        if (!state.gameIndex) {
            // userIndex가 없다면, 요청을 보내지 않습니다.
            return;
        }
        const path = 'dashboard/gamepaymentlist';
        const body = {
            gameIndex: state.gameIndex
        }
        axiosRequest(path, body, 'POST', 'json')
            .then((response) => {
                setGameItems(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [state.gameIndex]);

    useEffect(() => {
        const commentPath = 'dashboard/gamecomment';
        const commentBody = {
            gameIndex: state.gameIndex
        };
        axiosRequest(commentPath, commentBody, 'POST', 'json')
            .then((response) => {
                // userId를 제외한 데이터 추출 [추후 userId를 전달하지 않는다면 변경 필요]
                const commentDataWithoutUserId = response.map(comment => {
                    // comment 객체를 복사하여 userId 속성을 제외하고 반환
                    const { userId, ...commentWithoutUserId } = comment;
                    return commentWithoutUserId;
                });

                setCommentData(commentDataWithoutUserId);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    const filteredPayments = gameItems.filter(payment => {
        if (filter === "all") return true;
        return payment.productType === filter;
    });

    const filteredComments = commentData.filter(comment => {
        if (filter === "all") return true;
        return comment.productType === filter;
    });

    // const filteredLogData = logData.filter(log => {
    //     if (filter === "all") return true;
    //     return log.productType === filter;
    // });
    return (
        <div className="game-release">
            <h2>게임 릴리즈 정보</h2>
            <hr />
            <div className='d-flex justify-content-end'>
                <input className='form-check-input m-2' type="radio" name="filter" value="all" checked={filter === "all"} onChange={(e) => setFilter(e.target.value)} /> 전체
                <input className='form-check-input m-2' type="radio" name="filter" value="avatar" checked={filter === "avatar"} onChange={(e) => setFilter(e.target.value)} /> 아바타
                <input className='form-check-input m-2' type="radio" name="filter" value="game" checked={filter === "game"} onChange={(e) => setFilter(e.target.value)} /> 게임
            </div>
            <TablePage margin={false} createButton={false} title={"결제내역_"+ state.gameName} dataRow={ItemTableRow} dataLabel={itemHeadLabel} data={filteredPayments} />
        
            <TablePage margin={false} createButton={false} title={"댓글내역_"+ state.gameName} dataRow={ItemTableRow} dataLabel={commentHeadLabel} data={filteredComments} />
        </div>
    );
}

export default GameItems;
