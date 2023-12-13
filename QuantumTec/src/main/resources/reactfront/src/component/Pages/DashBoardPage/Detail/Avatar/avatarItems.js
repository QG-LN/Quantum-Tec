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
        { id: 'productUser', label: '결제자', align: 'center' },
        { id: 'paymentAmount', label: '결제 금액', align: 'center' },
        { id: 'paymentMethod', label: '결제 수단', align: 'center' },
        { id: 'paymentDate', label: '결제 일자', align: 'center' },
        { id: 'paymentStatus', label: '결제 상태', align: 'center' },
    ];

    //값없으면 아무값없이 나오게
    state === undefined ? state = {
        itemIndex : 1,
    } : state = state;

    useEffect(() => {
        if (!state.itemIndex) {
            // userIndex가 없다면, 요청을 보내지 않습니다.
            return;
        }
        const path = 'dashboard/avatarinfo/paymentlist';
        const body = {
            itemIndex: state.itemIndex
        }
        console.log(body);
        axiosRequest(path, body, 'POST', 'json')
            .then((response) => {
                console.log(response);
                setItemItems(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [state.itemIndex]);

    return (
        <div className="game-release">
            <h2>아바타 관련 정보</h2>
            <hr />
            <TablePage margin={false} createButton={false} title={"구매내역_"+ state.itemName}  dataRow={ItemTableRow} dataLabel={itemHeadLabel} data={itemItems} />
        </div>
    );
}

export default AvatarItems;
