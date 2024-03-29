// import ttlist from './tutoringlist.js';
import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import { useInView } from 'react-intersection-observer';
import img from '../MainPage/1_logo.png'
import {Dropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Tutoringlist from './tutoringlist';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {axiosRequest} from '../../Utils/networkUtils';

export default function TutoringBoardPage() {

    const [items, setItems] = useState([])                  // 보여줄 튜터 리스트
    const [page, setPage] = useState(1)                     // 현재 페이지
    const [ref, inView] = useInView()                       // 스크롤이 끝에 도달했는지 여부
    const [loading, setLoading] = useState(false)           // 로딩중인지 여부
    const [selectedCategories, setSelectedCategories] = useState([]); // 선택한 카테고리

   const [tutoringInfoList, setTutoringInfoList] = useState([]); // 튜터링 게시글 목록
   const [orderCategory, setOrderCategory] = useState({
        subject : [],
        tag: [],
        person : [],
        date : [],
   }); // 정렬 기준

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
            getTutoringList();
        }
    }

    useEffect(() => {
        getTutoringList();
        getTutoringOrderDataList();
    }, [selectedCategories]);

    
    // 게시글 목록 조회
    const getTutoringList = async () => {
        const filteredCategory = selectedCategories.filter(category => orderCategory.subject.includes(category));

        const path = 'board/tutoringList';
        const body = {
            pageNum : page,
            keyword : search,
            subject : filteredCategory,
        }
        const data = await axiosRequest(path, body, 'POST', 'json');
        if(data !== null) {
            setTutoringInfoList(data);
        }
    }

    // 튜터링 태그/ 카테고리 목록 조회
    const getTutoringOrderDataList = async () => {
        const path = 'board/tutoringOrderDataList';
        const data = await axiosRequest(path, null, 'POST', 'json');
        setOrderCategory({subject:data.category.split(','), tag:data.tags.split(',')})
    }


    const categroties = {
        subject: [ "수학", "과학"],
        person: [ "2명", "4명", "5명 이상"],
        date: ["1일", "1주일", "한달", "3개월이상"],
    }
  
    // 카테고리 선택/해제
    const toggleCategory = (category, categoryList) => {
        if(category === '전체') {
            const allSelected = categoryList.every(option => selectedCategories.includes(option));  // 전체 선택 여부 확인

            // 전체 선택 여부에 따라 선택/해제
            if(allSelected) {
                setSelectedCategories(selectedCategories.filter((item) => !categoryList.includes(item))); // 전체 해제
            }else{
                const uniqueCategories = Array.from(new Set([...selectedCategories, ...categoryList])); // 중복 제거
                setSelectedCategories(uniqueCategories);    // 전체 선택
            }
        }else{
            selectedCategories.includes(category) ? setSelectedCategories(selectedCategories.filter((item) => item !== category)) : setSelectedCategories([...selectedCategories, category]);
        }
    };

    // 카테고리 전체 선택해제
    const toggleAllCategoriesReset  = () => {
        setSelectedCategories([]);
    }


    const renderDropdown = (title, options) => (
        <Dropdown autoClose='outside'>
            <div className='float-left mr-4'>
                <Dropdown.Toggle variant="success" id={`dropdown-${title.toLowerCase()}`}>
                    {title}
                </Dropdown.Toggle>
            </div>
            <Dropdown.Menu>
                <Dropdown.Item key={-1}  onClick={() => toggleCategory('전체',options)}>
                    <input
                        className='mr-2'
                        type="checkbox"
                        checked={selectedCategories.includes(...options)}
                        readOnly
                    />
                    전체
                </Dropdown.Item>
                {options.map((category, index) => (
                    <Dropdown.Item key={index} onClick={() => toggleCategory(category,options)}>
                        <input
                            className='mr-2'
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            readOnly
                        />
                        {category}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
    
    return(
        <div>
            <div class=' bg-black  h-[211px] flex'>
                <h1 class='text-white my-auto ml-80 text-[3.5rem] text-left'>튜터링 게시판</h1>
            </div>
            <div className="w-[65vw] h-[8vh] mx-auto mt-4">
                <div class='container'>
                    <div className='row justify-content-end'>
                        {/* 게시글 추가 버튼을 우측 상단에 배치 */}
                        <div className='bg-green-300 p-2 rounded-full shadow-sm col-md-1 mb-2 mr-2'>
                            <Link to={`/tutoringPost`} class='text-decoration-none text-black'
                                state={{subject : orderCategory.subject, tag : orderCategory.tag}}
                            >
                                게시글 추가
                            </Link>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-8'>
                            {renderDropdown("과목", orderCategory.subject)}
                            {renderDropdown("인원", categroties.person)}
                            {renderDropdown("날짜", categroties.date)}
                        </div>
                        <div className='col-sm-4'>
                            {/* 검색 창 */}
                            <div class='relative'>
                                <input className='w-[100%] h-[44px] pr-[50px] pl-[20px] mr-0 border-b-2 rounded-full bg-[#f2f2f2]'
                                    type='text' placeholder='튜터링 검색' onChange={handleSearch} value={search}></input>
                                <button type='button' className='absolute right-0 w-[44px] h-[44px]' onClick={onClickSearch}>
                                    <span className='inline-block w-[40px] h-[40px] rounded-full'>
                                        <img className='w-[20px] h-[20px] m-[10px]' src={searchIcon} alt='search'/>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                    <span className='float-left mt-2 border-b-2 pb-2 px-2'>
                        {selectedCategories.join(', ')}
                        {selectedCategories.length > 0 && 
                           <button class='ml-2' onClick={toggleAllCategoriesReset}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </button>}
                    </span>
                    </div>
                </div>
            </div>

            {loading ? <div>로딩중</div> :
                <section class="py-5">
                    <div class="container ml-n1 grid-cols-4 gap-[20px] gx-1 px-lg-5 mt-5 flex flex-wrap max-w-full">
                        {tutoringInfoList.map((tutor, idx) => (
                            <div key={idx} id={tutor.postIndex}
                                 className='row gx-0 row-cols-2 row-cols-md-3 row-cols-xl-4'
                                 ref={idx === tutoringInfoList.length - 1 ? ref : null}>
                                    <Link to={`/tutoring/${tutor.postIndex}/${tutor.userNickname}`} class='text-decoration-none text-black'
                                            state={{ info: { info: tutor, orderCategory: orderCategory } }}>
                                        <Tutoringlist info={tutor}/>    
                                    </Link>
                            </div>
                        ))}

                    </div>
                </section>
            }

    </div>
    )
}