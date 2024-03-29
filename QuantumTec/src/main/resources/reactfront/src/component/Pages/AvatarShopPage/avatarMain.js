import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvatarItem from './avatarItem';
import '../../../css.scss'

export default function AvatarMain(props) {
    const [avatarCategory, setAvatarCategory] = useState([]); // 카테고리 목록
    const [hatList, setHatList] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/api/avatar/hat')
            .then((response) => {
                setHatList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        let tempArray = [];
        for(let i = 0; i < 5; i++) {
            tempArray.push({ id: i, name: `아이템${i+1}`, priceCash: 1000, priceFreeCash:10000 });
        }
        setHatList(hatList.concat(tempArray));
        tempArray = []
        // tempArray.push({ id: 1, name: '모자' });
        // tempArray.push({ id: 2, name: '악세서리' });
        // tempArray.push({ id: 3, name: '머리카락' });
        // tempArray.push({ id: 4, name: '이너' });
        // tempArray.push({ id: 5, name: '아웃터' });
        // tempArray.push({ id: 6, name: '바지' });
        // tempArray.push({ id: 7, name: '치마' });
        // tempArray.push({ id: 8, name: '원피스' });
        // tempArray.push({ id: 9, name: '신발' });
        // tempArray.push({ id: 10, name: '구두' });
        // tempArray.push({ id: 11, name: '배경' });
        // tempArray.push({ id: 12, name: '가구' });
        tempArray.push({ id: 1, name: '배경', eng_name: 'bg'});
        tempArray.push({ id: 2, name: '모자', eng_name: 'hat' });
        tempArray.push({ id: 3, name: '이너', eng_name: 'inner' });
        tempArray.push({ id: 4, name: '바지', eng_name: 'pants' });
        tempArray.push({ id: 5, name: '치마', eng_name: 'skirt' });
        setAvatarCategory(avatarCategory.concat(tempArray))
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
                    <div class="input-group input-group-sm">
                        <input type="text" class="form-control" placeholder="검색할 아이템을 입력하세요" aria-label="검색할 아이템을 입력하세요" aria-describedby="avatar-search-button" />
                        <button class="btn btn-outline-secondary" type="button" id="avatar-search-button" onClick={props.onClick}>검색</button>
                    </div>
                </div>
            </div>
            {avatarCategory.map((category) => (
                <div className='mt-2 mb-5'>
                    <div className='d-flex align-items-center'>
                        <h5 className={category.name.length > 2 ? 'w-[20%]' : 'w-[18%]'}>모든 {category.name} 아이템</h5>
                        <button type="button" class="btn btn-secondary btn-sm" id={category.name} onClick={props.onClick}>모두 보기 ({avatarCategory.length})</button>
                        <hr className='flex-fill mx-3'/>
                    </div>
                    <div className='ms-4 mt-4 d-flex flex-wrap align-items-center'>
                        {hatList.map((item) => (
                            <AvatarItem item={item} category={category.name} eng_category={category.eng_name}/>
                        ))}
                    </div>
                </div>
            ))}
            
            
        </div>
    );
}
