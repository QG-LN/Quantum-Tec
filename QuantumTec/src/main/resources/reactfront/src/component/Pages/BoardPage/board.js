import React, { useEffect, useState } from "react";
import axios from 'axios';
import {axiosRequest} from '../../../module/networkUtils';

const ITEMS_PER_PAGE = 10; // 페이지 당 아이템 수

function Board() {
    /////////////////////////// 수정 부탁
    const [startPage, setStartPage] = useState(1);
    const [Posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        axios.get(`/api/boards?page=${currentPage}&size=${ITEMS_PER_PAGE}`)
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));
    }, [currentPage]);
    
    const handlePageChange = (pageNumber) => {
        setPosts([]);
        setCurrentPage(pageNumber);
    };
    const handlePageUp = () => {
        setPosts([]);
        console.log(currentPage);
        let page = ((Math.floor((currentPage-1)/10))+1)*10+1;
        console.log(page);
        setStartPage(page);
        setCurrentPage(page);
    };
    const handlePageDown = () => {
        setPosts([]);
        let page = (Math.floor((currentPage-1)/10))*10;
        console.log(page)
        setStartPage(page-9);
        setCurrentPage(page);
    };
    ////////////////////////////
    const handleDropdown = (e) => {
        const ul = e.target.nextSibling;
        if(ul.style.display === "block")
            ul.style.display = "none";
        else
            ul.style.display = "block";
    }
    if (Posts.length === 0){
        for (let i = 0 + (10 * (currentPage -1)); i < 10 * currentPage; i++) {
            const newPost = {
                id: i + 1,
                board: "게시판 제목",
                title: "게시물 제목",
                writer: "글쓴이",
                createdDate: "2023-05-30",
                view: 10,
                upvote: 5
            };
            Posts.push(newPost);
        }
    }
    Posts.totalItems = 110;
      return (
        <div className="container">
            <h1>게시판</h1>

            <div class="row justify-content-around g-2 mt-1">
                <div class="row justify-content-start g-3 mt-1 col-6 p-0">
                    <div class="dropdown col-auto">
                        <button onClick={handleDropdown} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            전체
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item active" href="#">자유게시판</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    <div class="dropdown col-auto">
                        <button onClick={handleDropdown} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            최신순
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
                <div class="row justify-content-end g-3 mt-1 col-6">
                    <div class="dropdown col-auto">
                        <button onClick={handleDropdown} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            제목
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">제목</a></li>
                            <li><a class="dropdown-item" href="#">작성자</a></li>
                        </ul>
                    </div>
                    <div class="col-auto">
                        <label for="inputSearch" class="visually-hidden">검색어</label>
                        <input type="text" class="form-control" id="inputSearch" placeholder="검색어"></input>
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary mb-3">검색</button>
                    </div>
                </div>
            </div>
            <hr />
            <table className="table table-striped mt-0 pt-0">
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
                    {Posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.board}</td>
                            <td>{post.title}</td>
                            <td>{post.writer}</td>
                            <td>{post.createdDate}</td>
                            <td>{post.view}</td>
                            <td>{post.upvote}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination nav justify-content-center mb-5">

                    
                    {startPage !== 1 && 
                        <li key="<" className="page-item nav-item">
                            <button className="page-link nav-item" onClick={() => handlePageDown()}>
                                {"<"}
                            </button>
                        </li>
                    }
                    {/* 페이징 처리를 위한 컴포넌트 추가 */}
                    {Array.from({ length: Math.min(10, Math.ceil(Posts.totalItems / ITEMS_PER_PAGE) - startPage + 1) }, (_, i) => startPage + i).map(pageNumber => (
                        <li key={pageNumber} className={`page-item nav-item ${pageNumber === currentPage ? 'active' : ''}`}>
                            <button className="page-link nav-item" onClick={() => handlePageChange(pageNumber)}>
                                {pageNumber}
                            </button>
                        </li>
                    ))}

                    {Math.ceil(Posts.totalItems / ITEMS_PER_PAGE) > Math.floor((currentPage-1) / ITEMS_PER_PAGE + 1) * 10 && 
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

export default Board;