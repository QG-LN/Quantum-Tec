import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {axiosRequest} from '../../../module/networkUtils';
import {useParams} from "react-router-dom";

const ITEMS_PER_PAGE = 10; // 페이지 당 아이템 수
export default function Board() {
    // 페에지네이션 첫 시작 페이지 넘버
    const [startPage, setStartPage] = useState(1);
    // 게시글 리스트
    const [Posts, setPosts] = useState([]);
    // 현재 페이지 넘버
    const [currentPage, setCurrentPage] = useState(1);
    const [boardName, setBoardName] = useState("게시판");
    const [sortName, setSortName] = useState("최신순");
    const [searchName, setSearchName] = useState("제목");
    const [sortType, setSortType] = useState("latest");            // 현재 정렬 방식
    const [searchType, setSearchType] = useState("title");         // 현재 검색 방식
    const [searchKeyword, setSearchKeyword] = useState("");        // 현재 검색 키워드

    const [postCount, setPostCount] = useState(0);                 // 게시글 수

    const {id} = useParams();

    useEffect(() => {
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
            default:
                setSortName('최신순');
                break;
        }
    }, [sortType]);

    useEffect(() => {
        switch (searchType) {
            case 'title':
                setSearchName('제목');
                break;
            case 'author':
                setSearchName('작성자');
                break;
            case 'title_author':
                setSearchName('제목 + 작성자');
                break;
            default:
                setSearchName('제목');
                break;
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
            default:
                return '전체';
        }
    };

    /**
     * 날짜 데이터 포맷 변경 함수
     * 만약 데이터가 날짜 형식이 아니라면 그대로 반환
     * @param data 날짜데이터
     * @returns {*|string} 포맷 변경된 날짜 데이터
     * @example 2021-06-01 -> 2021년 06월 01일
     */
    const extractData = (data) => {
        const datePattern = /^(\d{4})-(\d{2})-(\d{2})/;     // 날짜 데이터 추출 패턴 설정
        const match = datePattern.exec(data);       // 정규식과 매칭을 통해 날짜 데이터 추출

        // 날짜 데이터를 올바르게 추출 했을 경우 포맷 변경
        if(match){
            return match[1] + '년 ' + match[2] + '월 ' + match[3] + '일';
        }else{
            return data;
        }
    }

    useEffect(() => {
        loadBoardList();
        setBoardName(boardTypeToName(id));
    }, [currentPage, searchKeyword, sortType, id]);

    // 게시글 리스트 불러오기
    const loadBoardList = () => {
        const path = 'board/list';
        const body ={
            pageNum : currentPage,
            boardIndex : parseInt(id),
            sortType: sortType,
            searchType : searchType,
            searchKeyword : searchKeyword
        }
        axiosRequest(path, body, 'POST', 'json')
        .then((res) => {
            setPosts(res);
        })
        .catch((error) => {
            console.error(error);
        });
        loadPostCount();
    }

    // 게시글 랜더링 함수
    const renderPosts = () => {
        return Posts.map((post) => (
            <tr key={post.postIndex} style={{ cursor: 'pointer' }}>
              <td>{post.postIndex}</td>
              <td>{post.boardTitle}</td>
              <td>
                <Link to={`/board/${id}/post/${post.postIndex}`} title={post.postTitle} class="text-decoration-none text-body">
                  {post.postTitle && post.postTitle.length > 20 ? post.postTitle.substring(0, 20) + "..." : post.postTitle}
                </Link>
              </td>
              <td>
                <span title={post.postAuthor}>
                  {post.postAuthor && post.postAuthor.length > 6 ? post.postAuthor.substring(0, 6) + "..." : post.postAuthor}
                </span>
              </td>
              <td>{extractData(post.postDate)}</td>
              <td>{post.postView}</td>
              <td>{post.postUpvotes}</td>
            </tr>
          ));
    }

    ////////////////////////////

    // 페이지네이션 함수
    const handlePageChange = (pageNumber) => {
        setPosts([]);
        loadPostCount();
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
        const ul = e.target.nextSibling;
        if(ul.style.display === "block")
            ul.style.display = "none";
        else
            ul.style.display = "block";
    }


    // 게시글 수 불러오기
    const loadPostCount = () =>{
        const path = 'board/listCount';
        const body ={
            pageNum : currentPage,
            boardIndex : id,
            sortType: sortType,
            searchType : searchType,
            searchKeyword : ''
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                setPostCount(res);
            })
            
    }

    const handleSort = (e) => {
        e.target.parentNode.parentNode.style.display = "none";
        console.log( e.target.parentNode.parentNode.style.display);
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
            default:
                setSortType('latest');
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
            default:
                setSearchType('title');
                break;
        }
    }

    const handleSearchButton = (e) => {
        setSearchKeyword(e.target.parentNode.previousSibling.childNodes[1].value);
    }

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
                            <li><span class="dropdown-item hover:cursor-pointer" onClick={handleSort}>최신순</span></li>
                            <li><span class="dropdown-item hover:cursor-pointer " onClick={handleSort}>오래된순</span></li>
                            <li><span className="dropdown-item hover:cursor-pointer" onClick={handleSort}>별점순</span></li>
                        </ul>
                    </div>
                </div>
                <div class="row justify-content-end g-3 mt-1 col-6">
                    <div class="col-auto">
                        {id !== '3' && 
                            <>
                                <Link to={`/board/${id}/write`} className="btn btn-success mb-3">글쓰기</Link>   
                            </>
                        }
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
                <tbody>
                    {renderPosts()}
                </tbody>
            </table>
            <nav aria-label="Page navigation example mb-5">
                <div className="row justify-content-center">
                    <div class="dropdown col-auto">
                        <button onClick={handleDropdown} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {searchName}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><span onClick={handleSearch} class="dropdown-item hover:cursor-pointer">제목</span></li>
                            <li><span onClick={handleSearch} class="dropdown-item hover:cursor-pointer">작성자</span></li>
                            <li><span onClick={handleSearch} class="dropdown-item hover:cursor-pointer">제목 + 작성자</span></li>
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
