import React, { useEffect } from 'react';
import { useState } from 'react';
import {axiosRequest} from '../../../../Utils/networkUtils';
import TablePage from '../../tablePage';
import ItemTableRow from '../../../item-table-row';
import LogDetailTableRow from '../../../log-detail-table-row';
function AvatarItems({state,setState}) {
    const [itemItems, setItemItems] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [logData, setLogData] = useState([]);

    // 결제 테이블 헤드 라벨
    const itemHeadLabel = [
        { id: 'paymentIndex', label: '번호', align: 'center' },
        { id: 'productUser', label: '결제명', align: 'center' },
        { id: 'paymentAmount', label: '결제 금액', align: 'center' },
        { id: 'paymentMethod', label: '결제 수단', align: 'center' },
        { id: 'paymentStatus', label: '결제 상태', align: 'center' },
        { id: 'paymentDate', label: '결제 일자', align: 'center' },
    ];

    //값없으면 아무값없이 나오게
    state = {
        itemIndex : 1,
    }

    useEffect(() => {
        if (!state.itemIndex) {
            // userIndex가 없다면, 요청을 보내지 않습니다.
            return;
        }
        const path = 'dashboard/gamepaymentlist';
        const body = {
            gameIndex: state.gameIndex
        }
        axiosRequest(path, body, 'POST', 'json')
            .then((response) => {
                setItemItems(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [state.itemIndex]);

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

    return (
        <div className="game-release">
            <h2>아바타 거래 내역</h2>
            <hr />
            <TablePage margin={false} createButton={false}  dataRow={ItemTableRow} dataLabel={itemHeadLabel} data={itemItems} />
                </div>
    );
}

export default AvatarItems;
