import React, { useEffect } from 'react';
import { useState } from 'react';
import {axiosRequest} from '../../../../Utils/networkUtils';
import TablePage from '../../gamePage';
import ItemTableRow from '../../../item-table-row';
function GameItems({state,setState}) {

    
    const [filter, setFilter] = useState("all");
    const [userItems, setUserItems] = useState([]);
    const itemHeadLabel = [
        { id: 'paymentIndex', label: '번호', align: 'center' },
        { id: 'productType', label: '게임 종류', align: 'center' },
        { id: 'productName', label: '게임 명칭', align: 'center' },
        { id: 'paymentAmount', label: '환불 금액', align: 'center' },
        { id: 'paymentMethod', label: '결제 수단', align: 'center' },
        { id: 'paymentStatus', label: '환불 상태', align: 'center' },
        { id: 'paymentDate', label: '환불 일자', align: 'center' },
    ];
    useEffect(() => {
        if (!state.userIndex) {
            // userIndex가 없다면, 요청을 보내지 않습니다.
            return;
        }
        const path = 'dashboard/userinfo/itemlist';
        const body = {
            userIndex: state.userIndex
        }
        axiosRequest(path, body, 'POST', 'json')
            .then((response) => {
                console.log(response);
                setUserItems(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [state.userIndex]);

    const filteredPayments = userItems.filter(payment => {
        if (filter === "all") return true;
        return payment.productType === filter;
    });
    return (
        <div className="game-release">
        <h2>게임 릴리즈 정보</h2>
        <hr />
        {/* <table className='d-flex justify-content-center table text-center align-middle'>
            <tbody>
                <tr>
                    <th>게임 버전</th>
                    <th>사용 가능 플랫폼</th>
                    <th>최근 업데이트 날짜</th>
                    <th>게임 업데이트 정보</th>
                </tr>
                <tr>
                    <td>{state.gameVersion}</td>
                    <td>{state.gamePlatform}</td>
                    <td>{state.gameNewUpdate}</td>
                    <td>{state.gameUpdate}</td>
                </tr>
            </tbody>
        </table> */}
        <div className='d-flex justify-content-end'>
            <input className='form-check-input m-2' type="radio" name="filter" value="all" checked={filter === "all"} onChange={(e) => setFilter(e.target.value)} /> 전체
            <input className='form-check-input m-2' type="radio" name="filter" value="avatar" checked={filter === "avatar"} onChange={(e) => setFilter(e.target.value)} /> 아바타
            <input className='form-check-input m-2' type="radio" name="filter" value="game" checked={filter === "game"} onChange={(e) => setFilter(e.target.value)} /> 게임
        </div>
        {/* <table className='table text-center'>
                <tbody>
                    <tr>
                        <th className="w-[5%]">메모</th>
                        <textarea 
                            id="memo"
                            content={state.memo}
                            colSpan={5} />
                    </tr>
                </tbody>
            </table> */}
        <TablePage margin={false} createButton={false} title={""} dataRow={ItemTableRow} dataLabel={itemHeadLabel} data={filteredPayments} />
        
        </div>
    );
}

export default GameItems;
