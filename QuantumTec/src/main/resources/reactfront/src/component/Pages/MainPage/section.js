import React, { useState } from 'react';
import { useEffect } from 'react';
import Gamelist from './gamelist.js';
export default function Section() {
    const [gamelist, setgameList] = useState(["게임이름","수학게임"]);
    const [inputCate, setInputCate] = useState("#전체");

    const handleInputCate = (e) => {
        setInputCate(e.target.value)
    }

    // 더블클릭 문제 해결을 위한 id값으로 checked 설정
    useEffect(() => {
        let checkresult = document.getElementById("cate");
        checkresult.checked = true;
      }, []);

    const Clickcate = (e) => {
      let index = e.target;
      console.log(index)
      let index2 = index.text;
      console.log(index2)
      console.log(inputCate)
    }
    const Clicksearch = (e) => {
    
    }

    const games =[
        {
            "id": 1,
            "cate": 1, 
            "name": "수학게임",
            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            "description": "수학게임입니다.",
            "link": "https://www.naver.com/"
            },
        {
            "id": 2,
            "cate": 2,
            "name": "국어게임",
            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            "description": "국어게임입니다.",
            "link": "https://www.naver.com/"
            },
        {
            "id": 3,
            "cate": 1,
            "name": "수학게임2",
            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            "description": "수학게임입니다.",
            "link": "https://www.naver.com/"
            },
        {
            "id": 4,
            "cate": 2,
            "name": "국어게임2",
            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            "description": "국어게임입니다.",
            "link": "https://www.naver.com/"
            },
        {
            "id": 5,
            "cate": 4,
            "name": "사회게임",
            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            "description": "사회게임입니다.",
            "link": "https://www.naver.com/"
            },
    
    ]





      
    return (

        <div class='w-[1320px] relative pl-24px m-auto'>
        <h2 class='h-[28px] text-[#17191d] text-[24px] text-left mb-4 font-bold'>전체 게임</h2>
        <div class='absolute top-[-10px] right-[24px]'>
            <fieldset>
                <input class='w-[302px] h-[44px] pr-[3px] pl-[3px] mr-0 border-b-2' type='text' placeholder='게임명 검색'></input>
                <button type='button' class='absolute w-[44px] h-[44px]' onClick={Clicksearch}>
                    <span class='inline-block w-[20px] h-[20px] bg-black'></span>검색</button>
            </fieldset>
        </div>
        <section>
            <div class=' bg-white relative pt-[20px] pr-[30px] pb-[30px] pl-[3px]  text-center'>
                
                <fieldset class='radioButtonStyle'>
                    <legend class='absolute overflow-hidden h-1 w-1 m-[-1px]'></legend>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='0'/><span onClick={ Clickcate}>#전체</span>
                            </label>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate'id='cate' onChange={handleInputCate} value='1' /><span onClick={Clickcate}>#수학</span>
                            </label>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate'id='cate' onChange={handleInputCate} value='2'/><span onClick={Clickcate}>#국어</span>
                            </label>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate'id='cate' onChange={handleInputCate} value='3'/><span onClick={Clickcate}>#과학</span>
                            </label>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate'id='cate' onChange={handleInputCate} value='4'/><span onClick={Clickcate}>#영어</span>
                            </label>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate'id='cate' onChange={handleInputCate} value='5' /><span onClick={Clickcate}>#사회</span>
                            </label>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate'id='cate' onChange={handleInputCate} value='6'/><span onClick={Clickcate}>#일본어</span>
                            </label>
                </fieldset>
            </div>        
        </section>
      
        <section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {games.map((games)=>(<Gamelist name={games.name} cate={games.cate} img={games.img} link={games.link}/>))}
                </div>  
            </div>
        </section>
        </div>
    );
}