import { useSearchParams } from "react-router-dom"
import React, { useEffect } from 'react';
import { axiosRequest } from "../../../module/networkUtils";
import { useDispatch } from 'react-redux';
import { setCashChange } from '../../../redux/actions/userActions';

export function Success() {
    const [searchParams] = useSearchParams()

    const dispatch = useDispatch();
    const handleUpdate = (newCash) => {
        dispatch(setCashChange(newCash));
    };
    // 서버로 승인 요청
    useEffect(() => {
        // 결제 승인 요청

        // 캐시 충전 요청
        const body = {
            userId: localStorage.getItem("userID"),
            amount: searchParams.get("amount"),
            orderId: searchParams.get("orderId"),
        };
        axiosRequest('http://localhost:9090/user/cash/charge', body, 'POST', 'json')
            .then(res => {
                console.log(res);
                if(res !== '' || res !== null){
                    if(res === -2){
                        alert('이미 결제가 완료된 주문입니다.');
                    }
                    else if(res === -1){
                        alert('결제 승인에 실패했습니다.');
                    }
                    handleUpdate(res);
                    localStorage.setItem("userCash", res);

                }
                else{
                    alert('충전에 실패했습니다.');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h1>결제 성공</h1>
            <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
            <div>{`결제 금액: ${Number(
                searchParams.get("amount")
            ).toLocaleString()}원`}</div>
        </div>
    )
}