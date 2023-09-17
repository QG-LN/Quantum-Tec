// import ttlist from './tutoringlist.js';
import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import { useInView } from 'react-intersection-observer';
import img from '../MainPage/1_logo.png'
import {Dropdown} from 'react-bootstrap'
import newIcon from './newIcon.png'

export default function TutoringBoardPage() {
    let defaultIconAddress = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';

    const boardName = '튜터링 게시판'
    const [items, setItems] = useState([])                  // 보여줄 튜터 리스트
    const [page, setPage] = useState(1)                     // 현재 페이지
    const [ref, inView] = useInView()                       // 스크롤이 끝에 도달했는지 여부
    const [loading, setLoading] = useState(false)           // 로딩중인지 여부
    const [userIconAddress, setUserIconAddress] = useState(defaultIconAddress);    // 사용자 아이콘 주소
    const [selectedCategories, setSelectedCategories] = useState([]); // 선택한 카테고리
    const [ttcate, setTtcate] = useState(['튜터링', '학습위주'])                // 튜터링 카테고리
    const [ttdate, setTtdate] = useState('2020-01-01')                // 튜터링 등록일
    const [tttitle, setTttitle] = useState('안녕하세요반갑습니다안녕하세요반갑습니다안녕하세요반갑습니다')                // 튜터링 제목

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
    //글자 제한
    const handleChange = (e) => {
        const tttltie = e.target.innerText;
        if (tttitle.length <= 28) {
          setTttitle(tttltie);
        }
      };

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
      '카테고리 1',
      '카테고리 2',
      '카테고리 3',
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
                    <span class='float-left ml-6 mt-1'> {selectedCategories.join(', ')}</span>
                    <Dropdown.Menu>
                            {categories.map((category, index) => (
                                <Dropdown.Item key={index} onClick={() => toggleCategory(category)}>
                                <input
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
                            <div class="col mb-5 hover:cursor-pointer">
                                
                                <div class="card shadow-sm h-100 w-[290px] h-[400px]" >
                                <img src={newIcon} class='w-[40px] h-[40px]' alt="New" style={{ position: 'absolute', top: '-20px', left: '-20px' }} />
                                    <div class='flex mt-3 ml-5'>
                                        {ttcate.slice(0, 2).map((cate, idx) => (
                                            <div key={idx} style={{
                                                marginLeft: idx === 0 ? '-0.5rem' : '0', // 첫 번째 요소에만 margin-left 설정
                                              }}>
                                                <div
                                                    className={`text-xs rounded-full font-bold p-1 ml-2 ${
                                                    cate === '튜터링' ? 'bg-green-200 text-gray-500' :
                                                    cate === '학습위주' ? 'bg-yellow-200 text-gray-500' : ''
                                                    }`}>
                                                    #{cate}
                                                </div>
                                            </div>
                                        ))}
                                        <div class=' absolute right-5'>
                                            <div class=' h-12 bg-gray-100 border-2 border-green-400 rounded-xl justify-center items-center flex' style={{width:"3rem"}}>
                                                <span class=''>N</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div class='flex ml-5 mt-2 text-gray-400' style={{fontSize:'12px'}}>
                                        <p>
                                            등록일
                                        </p>
                                        <span class='ml-2'>
                                            {ttdate}
                                        </span>                                
                                    </div>
                                    <span class='mx-3.5 text-left font-bold h-20' onInput={handleChange}>
                                        {tttitle}
                                    </span>

                                    <span class='my-3 text-center text-gray-400 font-bold text-base'>1/20</span>
                                    <div class='flex ml-5'>
                                        <div class='text-xs rounded-full bg-green-200 font-bold text-gray-500 p-1'>#수학</div>
                                        <div class='text-xs rounded-full bg-green-200 font-bold text-gray-500 p-1 ml-2'>#과학</div>
                                        <div class='text-xs rounded-full bg-green-200 font-bold text-gray-500 p-1 ml-2'>#일본어</div>
                                        <div class='text-xs rounded-full bg-green-200 font-bold text-gray-500 p-1 ml-2'>#세계지리</div>
                                    </div>
                                    {/* <div class='flex ml-5 mt-2'>
                                            <img class='w-8 h-8 rounded-full border' src={userIconAddress} />
                                            <img class='w-8 h-8 ml-2 rounded-full border' src={userIconAddress} />
                                            <img class='w-8 h-8 ml-2 rounded-full border' src={userIconAddress} />
                                    </div> */}
                                    <hr class='mx-4 text-gray-400 mb-auto'/>
                                    <div class="card-body p-3">
                                        <div class="flex ml-1">
                                            <img class='w-8 h-8 rounded-full' src={userIconAddress} />
                                            <h5 class="id ml-4">userid</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        }

    </>
    )
}