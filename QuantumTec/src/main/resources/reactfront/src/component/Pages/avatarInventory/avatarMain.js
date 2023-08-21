import React, { useState, useEffect } from 'react';
import { axiosRequest } from '../../../module/networkUtils';
import '../../../css.scss'
import AvatarItemCheck from './avatarItemCheck';

/**
 * 아바타 메인 컴포넌트
 * @param {Object} props - 부모 컴포넌트로부터 받아온 props
 * @param {*} props.onClick - 검색 버튼 클릭 이벤트
 * @returns {JSX.Element} - AvatarMain 컴포넌트.
 * @author MayoneJY <mayone6063@kakao.com>
 */
export default function AvatarMain(props) {
    
    // 아바타 아이템 목록
    const [itemList, setItemList] = useState([]);
    
    useEffect(() => {
        // 아바타 아이템 목록을 가져오기 위한 요청.
        const body = {
            userId: localStorage.getItem("userID"),
        }
        axiosRequest('http://localhost:9090/avatar/inventory', body, 'POST', 'json')
            .then(res => {
                if(res !== null)
                    setItemList(res);
            })
            .catch(err => {
                console.log(err);
            }
        );
    }, []);

    return (
        <div className=''>
            <div className='p-2 pt-5 me-0 user-wrap'>
                <img className="rounded mx-auto d-block w-[60%] user-image" src='https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?resize=476%2C280&ssl=1' alt="..." />
                <div className='user-text text-white'>
                    <h3>게임을 플레이하고 포인트를 받으세요</h3>
                    <h5>포인트 상점 아이템으로 자신만의 모습을 표현해보세요</h5>
                </div>
            </div>
            
            <div className='row justify-content-end me-4'>
                <div className='w-[30%] col-4'>
                    <div className="input-group input-group-sm">
                        <input type="text" className="form-control" placeholder="검색할 아이템을 입력하세요" aria-label="검색할 아이템을 입력하세요" aria-describedby="avatar-search-button" />
                        <button className="btn btn-outline-secondary" type="button" id="avatar-search-button" onClick={props.onClick}>검색</button>
                    </div>
                </div>
            </div>
            <div className='mt-2 mb-5'>
                <div className='text-center'>
                    <h5>모든 아이템</h5>
                    <hr className='mx-3'/>
                </div>
                <div className='ms-4 mt-4 d-flex flex-wrap align-items-center'>
                    {<AvatarItemCheck itemList={itemList}/> }
                </div>
            </div>
            
            
        </div>
    );
}
