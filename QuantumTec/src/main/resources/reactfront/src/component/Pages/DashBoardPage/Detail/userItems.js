import React, { useEffect } from 'react';
import { useState } from 'react';
import {axiosRequest} from '../../../Utils/networkUtils';
import TablePage from '../userPage';
import ItemTableRow from '../../item-table-row';
function UserItems({state}) {
    const [filter, setFilter] = useState("all");
    const [userItems, setUserItems] = useState([]);
    const itemHeadLabel = [
        { id: 'paymentIndex', label: '번호', align: 'center' },
        { id: 'productType', label: '상품 종류', align: 'center' },
        { id: 'productName', label: '상품 명칭', align: 'center' },
        { id: 'paymentAmount', label: '결제 금액', align: 'center' },
        { id: 'paymentMethod', label: '결제 수단', align: 'center' },
        { id: 'paymentStatus', label: '결제 상태', align: 'center' },
        { id: 'paymentDate', label: '결제 일자', align: 'center' },
    ];
    useEffect(() => {
        if (!state?.userIndex) {
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
    }, [state?.userIndex]);

    const filteredPayments = userItems.filter(payment => {
        if (filter === "all") return true;
        return payment.productType === filter;
    });
    return (
        <div className="user-items">
            { state?.userIndex && (
                <>
                    <h2>사용자 보유 항목</h2>
                    <hr />
                    <table className='d-flex justify-content-center table text-center align-middle'>
                        <tbody>
                            <tr>
                                <th>현재 레벨</th>
                                <th>경험치</th>
                                <th>무료 캐시</th>
                                <th>유료 캐시</th>
                            </tr>
                            <tr>
                                <td>{state.userLevel}</td>
                                <td>{state.userLevelExp}</td>
                                <td>{state.userFreeCash}</td>
                                <td>{state.userCash}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='d-flex justify-content-end'>
                        <input className='form-check-input m-2' type="radio" name="filter" value="all" checked={filter === "all"} onChange={(e) => setFilter(e.target.value)} /> 전체
                        <input className='form-check-input m-2' type="radio" name="filter" value="avatar" checked={filter === "avatar"} onChange={(e) => setFilter(e.target.value)} /> 아바타
                        <input className='form-check-input m-2' type="radio" name="filter" value="game" checked={filter === "game"} onChange={(e) => setFilter(e.target.value)} /> 게임
                    </div>

                    <TablePage margin={false} createButton={false} title={""} dataRow={ItemTableRow} dataLabel={itemHeadLabel} data={filteredPayments} />
                </>
            )}
        </div>
    );
}

export default UserItems;
