// import ttlist from './tutoringlist.js';
import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import { useInView } from 'react-intersection-observer';
import img from '../MainPage/1_logo.png'
import {Dropdown} from 'react-bootstrap'

import { Link } from 'react-router-dom';
import Tutoringlist from './tutoringlist';

export default function TutoringBoardPage() {

    const boardName = '튜터링 게시판'
    const [items, setItems] = useState([])                  // 보여줄 튜터 리스트
    const [page, setPage] = useState(1)                     // 현재 페이지
    const [ref, inView] = useInView()                       // 스크롤이 끝에 도달했는지 여부
    const [loading, setLoading] = useState(false)           // 로딩중인지 여부
   const [selectedCategories, setSelectedCategories] = useState([]); // 선택한 카테고리

    const [search, setSearch] = useState("");   //검색어
    
    const searchIcon = 'http://localhost:9090/image/game/default_icon_search.png'; // 검색 아이콘
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const onClickSearch = () => {
        setItems([]);
        if(page !== 1) {            // 페이지가 1이 아닐 경우 페이지를 1로 초기화하여 page useEffect를 실행
            setPage(1);
        }else{                      // 페이지가 1일 경우 기존 게임 목록을 삭제하고 새로 받아옴
           
        }
    }


      const handleboardAdd = () => {
        alert('게시판 추가')
    }


    const ttlist = [
        {
            id: 1,
            name: '테스트1',
            cate: '테스트1',
            img: '테스트1',
            link: '테스트1'
        },
        {
            id: 2,
            name: '테스트2',
            cate: '테스트2',
            img: '테스트2',
            link: '테스트2'
        },
        {
            id: 1,
            name: '테스트1',
            cate: '테스트1',
            img: '테스트1',
            link: '테스트1'
        },
        {
            id: 2,
            name: '테스트2',
            cate: '테스트2',
            img: '테스트2',
            link: '테스트2'
        },
        {
            id: 1,
            name: '테스트1',
            cate: '테스트1',
            img: '테스트1',
            link: '테스트1'
        },
        {
            id: 2,
            name: '테스트2',
            cate: '테스트2',
            img: '테스트2',
            link: '테스트2'
        },
        {
            id: 1,
            name: '테스트1',
            cate: '테스트1',
            img: '테스트1',
            link: '테스트1'
        },
        {
            id: 2,
            name: '테스트2',
            cate: '테스트2',
            img: '테스트2',
            link: '테스트2'
        },
        {
            id: 1,
            name: '테스트1',
            cate: '테스트1',
            img: '테스트1',
            link: '테스트1'
        },
        {
            id: 2,
            name: '테스트2',
            cate: '테스트2',
            img: '테스트2',
            link: '테스트2'
        },
        {
            id: 2,
            name: '테스트2',
            cate: '테스트2',
            img: '테스트2',
            link: '테스트2'
        },
        {
            id: 2,
            name: '테스트2',
            cate: '테스트2',
            img: '테스트2',
            link: '테스트2'
        },
        {
            id: 2,
            name: '테스트2',
            cate: '테스트2',
            img: '테스트2',
            link: '테스트2'
        },
        {
            id: 2,
            name: '테스트2',
            cate: '테스트2',
            img: '테스트2',
            link: '테스트2'
        },
        {
            id: 2,
            name: '테스트2',
            cate: '테스트2',
            img: '테스트2',
            link: '테스트2'
        },
        {
            id: 2,
            name: '테스트2',
            cate: '테스트2',
            img: '테스트2',
            link: '테스트2'
        },
    ]


  
    const categories = [
        '기간', '튜터', '1명','2명','3명', '수학','영어','국어','과학','사회','기타'

      // 원하는 만큼 카테고리를 추가할 수 있습니다.
    ];
  

      
      // 카테고리 선택/해제
    const toggleCategory = (category) => {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((item) => item !== category));
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    };
    
    return(
        <>
        <div class=' bg-slate-300 justify-center items-center  mt-auto h-24 flex'>
            <h1 class='text-black'>{boardName}</h1>
            </div>
            <div className="w-[1320px] h-[32px] mt-14 mx-auto pl-12 pr-12">
                
                <Dropdown autoClose='outside'> 
                    <div class='float-left'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        카테고리 목록
                    </Dropdown.Toggle>
                    </div>
                    <span class='float-left ml-6 mt-1 border-b-2 pb-2 px-2'> {selectedCategories.join(', ')}</span>
                    <Dropdown.Menu>
                            {categories.map((category, index) => (
                                <Dropdown.Item key={index} onClick={() => toggleCategory(category)}>
                                <input className='mr-2'
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    readOnly
                                    
                                />
                                {category}
                                </Dropdown.Item>
                            ))}
                    </Dropdown.Menu>
                    <div class='absolute top-[-10px] right-[0px]'>
                <fieldset>
                    <input class='w-[302px] h-[44px] pr-[3px] pl-[10px] mr-0 border-b-2 rounded-full bg-[#f2f2f2]' type='text'
                           placeholder='튜터링 검색'onChange={handleSearch} value={search}></input>
                    <button type='button' class='absolute right-0 w-[44px] h-[44px]' onClick={onClickSearch}>
                        <span class='inline-block w-[40px] h-[40px] rounded-full'>
                            <img class='w-[20px] h-[20px] m-[10px]' src={searchIcon} alt='search'/>
                        </span></button>
                </fieldset>
                </div>
                </Dropdown>

            </div>
                
                
            {loading ? <div>로딩중</div> :
            <section class="py-5">
                <div class='container px-lg-5'>
                <button class='float-right bg-green-300 p-2 mr-2 rounded-full shadow-sm' onClick={handleboardAdd}>게시판 추가</button>
                </div>
                <div class="container ml-n1 grid-cols-4 gap-[20px] gx-1 px-lg-5 mt-5 flex flex-wrap max-w-full">
                    {ttlist.map((tutor, idx) => (
                        <div key={idx} id={tutor.id}
                                className='row gx-0 row-cols-2 row-cols-md-3 row-cols-xl-4'
                                ref={idx === ttlist.length - 1 ? ref : null}>
                                <Tutoringlist 
                                    name={tutor.name}
                                    cate={tutor.cate}
                                    img={tutor.img}
                                    link={tutor.link}
                                    // key={tutor.id}
                                    id={tutor.id}
                                />
                        </div>
                    ))}

                </div>
            </section>
        }

    </>
    )
}