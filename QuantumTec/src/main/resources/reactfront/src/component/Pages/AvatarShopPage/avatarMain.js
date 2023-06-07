import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css.scss";
export default function AvatarMain() {
    const [hatList, setHatList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/avatar/hat')
            .then((response) => {
                setHatList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        const tempArray = [];
        for(let i = 0; i < 5; i++) {
            tempArray.push({ id: i, name: '모자' });
        }
        setHatList(hatList.concat(tempArray))
    }, []);
    return (
        <div className='bg-gray-200 h-[100%]'>
            <div className='p-2 pt-5 me-0 user-wrap'>
                <img className="rounded mx-auto d-block w-[60%] user-image" src='https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?resize=476%2C280&ssl=1' alt="..." />
                <div className='user-text text-white'>
                    <h3>게임을 플레이하고 포인트를 받으세요</h3>
                    <h5>포인트 상점 아이템으로 자신만의 모습을 표현해보세요</h5>
                </div>
            </div>
            <div className='d-flex align-items-center'>
                <h5 className='w-[18%]'>모든 모자 아이템</h5>
                <button type="button" class="btn btn-secondary btn-sm">Secondary</button>
                <hr className='flex-fill mx-3'/>
            </div>
            <div className='ms-4 mt-4 d-flex flex-wrap align-items-center'>
                {hatList.map((item) => (
                    <div class="card w-[18.5%] ms-2" aria-hidden="true">
                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" class="card-img-top" alt="..."/>
                        <div class="text-start m-3">
                            <h5 class="card-title placeholder-glow">
                            <div class="placeholder col-5"></div>
                            </h5>
                            <h6 class="card-text placeholder-glow">
                                <div class="placeholder col-7"></div>
                            </h6>
                            <h6 class="card-text placeholder-glow text-end">
                                <div class="placeholder col-5"></div>
                            </h6>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}
