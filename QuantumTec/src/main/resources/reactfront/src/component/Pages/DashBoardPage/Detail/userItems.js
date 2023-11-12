import React, { useEffect } from 'react';
import { useState } from 'react';
import {axiosRequest} from '../../../Utils/networkUtils';
function UserItems({state}) {
    const [filter, setFilter] = useState("all");
    const [userItems, setUserItems] = useState([]);

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
        <div className="user-items">
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
        <table className='table text-center align-middle'>
            <tbody>
                <tr>
                    <th className='w-[5%]'>번호</th>
                    <th className='w-[10%]'>상품 종류</th>
                    <th className='w-[20%]'>상품 명칭</th>
                    <th className='w-[10%]'>결제 금액</th>
                    <th className='w-[10%]'>결제 수단</th>
                    <th className='w-[10%]'>결제 상태</th>
                    <th className='w-[15%]'>결제 일자</th>
                    <th>비고</th>
                </tr>
            {filteredPayments.map(payment => (
                <tr key={payment.paymentIndex}>
                    <td>{payment.paymentIndex}</td>
                    <td>{payment.productType}</td>
                    <td>{payment.productName}</td>
                    <td>{payment.paymentAmount}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>{payment.paymentStatus}</td>
                    <td>{payment.paymentDate.split(" ")[0]}</td>
                    <td></td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default UserItems;
