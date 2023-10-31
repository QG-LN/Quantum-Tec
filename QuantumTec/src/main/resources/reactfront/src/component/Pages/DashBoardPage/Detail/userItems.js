import React from 'react';
import { useState } from 'react';
function UserItems() {
    const [filter, setFilter] = useState("all");


    const userItems = {
        level: 10,
        exp: 50000000,
        freeCash: 100000,
        paidCash: 20000,
    };
      
    const paymentHistory = [
        {
          paymentIndex: 1,
          type: "game", // 정렬을 위한 필드
          itemName: "게임A",
          itemIndex: 1, // 아이템 확인을 위한 필드
          paymentDate: "2022-09-01",
          amount: 10000,
          paymentMethod: "신용카드",
          paymentStatus: "결제 완료"
        },
        {
            paymentIndex: 2,
            type: "avatar",
            itemName: "아바타A",
            itemIndex: 1,
            paymentDate: "2022-09-01",
            amount: 10000,
            paymentMethod: "신용카드",
            paymentStatus: "결제 완료"
        }
    ];
    const filteredPayments = paymentHistory.filter(payment => {
        if (filter === "all") return true;
        return payment.type === filter;
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
                    <td>{userItems.level}</td>
                    <td>{userItems.exp}</td>
                    <td>{userItems.freeCash}</td>
                    <td>{userItems.paidCash}</td>
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
                    <td>{payment.type}</td>
                    <td>{payment.itemName}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>{payment.paymentStatus}</td>
                    <td>{payment.paymentDate}</td>
                    <td></td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default UserItems;
