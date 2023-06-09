import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import {axiosRequest} from '../../../module/networkUtils';
import {useParams} from "react-router-dom";
import userEvent from "@testing-library/user-event";

const ITEMS_PER_PAGE = 10; // 페이지 당 아이템 수
export default function Board() {
    const tableBody = useRef(null);
    // 페에지네이션 첫 시작 페이지 넘버
    const [startPage, setStartPage] = useState(1);
    // 게시글 리스트
    const [Posts, setPosts] = useState([]);
    // 카테고리 리스트
    const [Categories, setCategories] = useState([]);
    // 현재 페이지 넘버
    const [currentPage, setCurrentPage] = useState(1);
    const [boardName, setBoardName] = useState("게시판");
    const [sortName, setSortName] = useState("최신순");
    const [searchName, setSearchName] = useState("제목");
    const [boardType , setBoardType] = useState('0');               // 현재 게시판 정보
    const [sortType, setSortType] = useState("latest");            // 현재 정렬 방식
    const [searchType, setSearchType] = useState("title");         // 현재 검색 방식
    const [searchKeyword, setSearchKeyword] = useState("");        // 현재 검색 키워드


    const [postCount, setPostCount] = useState(0);                 // 게시글 수


    const boardId = useParams();

    /////////////////////////// 수정 부탁

    // 카테고리 리스트 불러오기
    useEffect(() => {
        setBoardType(boardId);
        // getCategory();
        postListCount();
    }, []);


    // 현재 로드된 게시판 id값에 따라 게시판 이름 변경
    useEffect(() => {
        setBoardName(boardTypeToName(boardType.id));
    },[boardType]);

    useEffect(() => {
        console.log(sortType);

        switch (sortType) {
            case 'latest':
                setSortName('최신순');
                break;
            case 'past':
                setSortName('오래된순');
                break;
            case 'upvote':
                setSortName('별점순');
                break;
        }
    }, [sortType]);

    useEffect(() => {
        console.log(searchType);

        switch (searchType) {
            case 'title':
                setSearchName('제목');
                break;
            case 'author':
                setSearchName('작성자');
                break;
            case 'title_author':
                setSearchName('제목 + 작성자');
        }
    }, [searchType]);

    // 게시판 타입을 받아 게시판 이름으로 변환
    const boardTypeToName = (boardType) => {
        switch (boardType) {
            case '0':
                return '전체';
            case '1':
                return '자유';
            case '2':
                return '튜터링';
            case '3':
                return '공지사항';
        }
    };


    // 카테고리 리스트 불러오기
    const getCategory = async () => {
        // try{
        //     const path = 'http://localhost:9090/board/category';
        //     const data = await axiosRequest(path,{},'GET','json');
        //     setCategories(data);
        // }catch (e){
        //     console.log(e);
        // }
    }
    // 게시글 리스트 불러오기
    useEffect(() => {
        // axios.get(`/api/boards?page=${currentPage}&size=${ITEMS_PER_PAGE}`)
        //     .then(response => setPosts(response.data))
        //     .catch(error => console.error(error));
        console.log(currentPage, boardId.id, sortType, searchType, '');

        const path = 'http://localhost:9090/board/list';
        const body ={
            pageNum : currentPage,
            boardIndex : parseInt(boardId.id),
            sortType: sortType,
            searchType : searchType,
            searchKeyword : searchKeyword
        }
        axiosRequest(path,body,'POST','json')
            .then(res=>{
                console.log(res);
                setPosts([]);
                for (let i = 0; i < res.length; i++) {
                    const newPost = {
                        id: res[i].postIndex,
                        board: res[i].boardTitle,
                        title: res[i].postTitle,
                        writer: res[i].postAuthor,
                        createdDate: res[i].postDate,
                        view: res[i].postView,
                        upvote: res[i].postUpvotes
                    };
                    Posts.push(newPost);
                }
                tableBody.current.innerHTML = "";
                let tempHTML = "";
                for(let i = 0; i < Posts.length; i++){
                    tempHTML += `
                <tr key=${Posts[i].id} style='cursor:pointer' onClick='location.href = "/post/${Posts[i].id}"'>
                    <td>${Posts[i].id}</td>
                    <td>${Posts[i].board}</td>
                    <td>${Posts[i].title}</td>
                    <td>${Posts[i].writer}</td>
                    <td>${Posts[i].createdDate}</td>
                    <td>${Posts[i].view}</td>
                    <td>${Posts[i].upvote}</td>
                </tr>`
                }
                tableBody.current.innerHTML = tempHTML;

            }).catch(e=>{
                console.log(e);
            })

    }, [currentPage, sortType, searchKeyword]);

    ////////////////////////////

    // 페이지네이션 함수
    const handlePageChange = (pageNumber) => {
        setPosts([]);
        postListCount();
        setCurrentPage(pageNumber);
    };
    // 페이지네이션 다음 버튼 함수
    const handlePageUp = () => {
        setPosts([]);
        let page = ((Math.floor((currentPage-1)/10))+1)*10+1;
        setStartPage(page);
        setCurrentPage(page);
    };
    // 페이지네이션 이전 버튼 함수
    const handlePageDown = () => {
        setPosts([]);
        let page = (Math.floor((currentPage-1)/10))*10;
        setStartPage(page-9);
        setCurrentPage(page);
    };

    // 드롭다운 메뉴 버튼 함수
    const handleDropdown = (e) => {
        console.log(e.target.nextSibling);
        const ul = e.target.nextSibling;
        if(ul.style.display === "block")
            ul.style.display = "none";
        else
            ul.style.display = "block";
    }


    // 게시글 수 불러오기
    const postListCount = () =>{
        const path = 'http://localhost:9090/board/listCount';
        const body ={
            pageNum : currentPage,
            boardIndex : boardType.id,
            sortType: sortType,
            searchType : searchType,
            searchKeyword : ''
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                console.log(res);
                setPostCount(res);
            })
    }

    // 게시글 글쓰기 버튼 함수
    const handleWrite = () => {
        document.location.href = "/write";
    }

    const handleSort = (e) => {
        e.target.parentNode.parentNode.style.display = "none";
        switch (e.target.innerText) {
            case '최신순':
                setSortType('latest');
                break;
            case '오래된순':
                setSortType('past');
                break;
            case '별점순':
                setSortType('upvote');
                break;
        }
    }

    const handleSearch = (e) => {
        e.target.parentNode.parentNode.style.display = "none";
        switch (e.target.innerText) {
            case '제목':
                setSearchType('title');
                break;
            case '작성자':
                setSearchType('author');
                break;
            case '제목 + 작성자':
                setSearchType('title_author');
                break;
        }
    }

    const handleSearchButton = (e) => {
        setSearchKeyword(e.target.parentNode.previousSibling.childNodes[1].value);
    }

    // 총 게시글 카운트 더미 파일
    Posts.totalItems = 110;
      return (
        <div className="container">
            <h1>{boardName}</h1>

            <div class="row justify-content-around g-2 mt-1">
                <div class="row justify-content-start g-3 mt-1 col-6 p-0">
                    <div class="dropdown col-auto">
                        <button onClick={handleDropdown} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {boardName}
                        </button>
                        <ul class="dropdown-menu w-[100%]" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="/board/0">전체</a></li>
                            <li><a class="dropdown-item" href="/board/1">자유</a></li>
                            <li><a class="dropdown-item" href="/board/2">튜터링</a></li>
                            <li><a class="dropdown-item" href="/board/3">공지사항</a></li>
                        </ul>
                    </div>
                    <div class="dropdown col-auto">
                        <button onClick={handleDropdown} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {sortName}
                        </button>
                        <ul class="dropdown-menu user-select-none" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" onClick={handleSort}>최신순</a></li>
                            <li><a class="dropdown-item" onClick={handleSort}>오래된순</a></li>
                            <li><a className="dropdown-item" onClick={handleSort}>별점순</a></li>
                        </ul>
                    </div>
                </div>
                <div class="row justify-content-end g-3 mt-1 col-6">
                    <div class="col-auto">
                        <button type="submit" class="btn btn-success mb-3" onClick={handleWrite}>글쓰기</button>
                    </div>
                </div>
            </div>
            <hr />
            <table className="table table-striped mt-0 pt-0 table-hover user-select-none">
                <thead>
                    <tr>
                        <th className="w-[5%]">번호</th>
                        <th className="w-[10%]">게시판</th>
                        <th className="w-[46%]">제목</th>
                        <th className="w-[10%]">작성자</th>
                        <th className="w-[15%]">작성일</th>
                        <th className="w-[7%]">조회수</th>
                        <th className="w-[7%]">추천수</th>
                    </tr>
                </thead>
                <tbody ref={tableBody}>
                    
                </tbody>
            </table>
            <nav aria-label="Page navigation example mb-5">
                <div className="row justify-content-center">
                    <div class="dropdown col-auto">
                        <button onClick={handleDropdown} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {searchName}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a onClick={handleSearch} class="dropdown-item" href="#">제목</a></li>
                            <li><a onClick={handleSearch} class="dropdown-item" href="#">작성자</a></li>
                            <li><a onClick={handleSearch} class="dropdown-item" href="#">제목 + 작성자</a></li>
                        </ul>
                    </div>
                    <div class="col-auto">
                        <label for="inputSearch" class="visually-hidden">검색어</label>
                        <input type="text" class="form-control" id="inputSearch" placeholder="검색어"></input>
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-success mb-3" onClick={handleSearchButton}>검색</button>
                    </div>
                </div>
                <ul className="pagination nav justify-content-center">
                    {startPage !== 1 && 
                        <li key="<" className="page-item nav-item">
                            <button className="page-link nav-item" onClick={() => handlePageDown()}>
                                {"<"}
                            </button>
                        </li>
                    }
                    {/* 페이징 처리를 위한 컴포넌트 추가 */}
                    {Array.from({ length: Math.min(10, Math.ceil(postCount/ ITEMS_PER_PAGE) - startPage + 1) }, (_, i) => startPage + i).map(pageNumber => (
                        <li key={pageNumber} className={`page-item nav-item ${pageNumber === currentPage ? 'active' : ''}`}>
                            <button className="page-link nav-item" onClick={() => handlePageChange(pageNumber)}>
                                {pageNumber}
                            </button>
                        </li>
                    ))}

                    {Math.ceil(postCount / ITEMS_PER_PAGE) > Math.floor((currentPage-1) / ITEMS_PER_PAGE + 1) * 10 &&
                        <li key=">" className="page-item nav-item">
                            <button className="page-link nav-item" onClick={() => handlePageUp()}>
                                {">"}
                            </button>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    );
}
