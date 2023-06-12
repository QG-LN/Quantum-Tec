import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {axiosRequest} from '../../../module/networkUtils';
import { useParams } from 'react-router-dom';
import { faX, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInView } from "react-intersection-observer"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Post() {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const { id } = useParams();  // react-router-dom을 사용하여 URL 파라미터에서 게시글 ID를 얻습니다.
    const [page, setPage] = useState(1)
    const [ref, inView] = useInView()
    const [loading, setLoading] = useState(false)
    
    //modal
    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = (e) => {
        setShow(true);
    }
    // 더미
    // 백엔드 통신 추가해야함.
    const maxContentLength = 15;

    useEffect(() => {
        const path = 'http://localhost:9090/board/viewCountUp';
        const body ={
            postIndex: id,
        }
        axiosRequest(path,body,'POST','json')
    }, []);

    useEffect(() => {
        setLoading(true)
        const path = 'http://localhost:9090/board/view';
        const body ={
            postIndex: id,
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                setPost(res);
            })
        const path2 = 'http://localhost:9090/board/commentList';
        const body2 ={
            pageNum: page,
            postIndex: parseInt(id),
            sortType: "date"
        }
        axiosRequest(path2,body2,'POST','json')
            .then(res => {
                setComments([...comments, ...res]);
            })
        setLoading(false)
    }, [page]);
    
    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage(page + 1)
        }
    }, [inView, loading])

    const clickUpvote = () => {
        // 유저 중복 안되게 하는 코드 필요
        axios.get(`/api/post/upvote`,{
            params: {
                postIndex: id,
            }
        })
        .then(response => (response.data)?alert("추천하였습니다."):alert("추천하지 못했습니다."))
        .catch(error => console.error(error));
    }
    const clickDownvote = () => {
        // 유저 중복 안되게 하는 코드 필요
        axios.get(`/api/post/downvote`,{
            params: {
                postIndex: id,
            }
        })
        .then(response => (response.data)?alert("비추천하였습니다."):alert("비추천하지 못했습니다."))
        .catch(error => console.error(error));
    }
    const clickCommentUpvote = (e) => {
        // 유저 중복 안되게 하는 코드 필요
        axios.get(`/api/comment/upvote`,{
            params: {
                postIndex: id,
                commentIndex: e.target.parentNode.parentNode.parentNode.id,
            }
        })
        .then(response => (response.data)?alert("추천하였습니다."):alert("추천하지 못했습니다."))
        .catch(error => console.error(error));
    }
    const clickCommentDownvote = (e) => {
        // 유저 중복 안되게 하는 코드 필요
        axios.get(`/api/comment/downvote`,{
            params: {
                postIndex: id,
                commentIndex: e.target.parentNode.parentNode.parentNode.id,
            }
        })
        .then(response => (response.data)?alert("비추천하였습니다."):alert("비추천하지 못했습니다."))
        .catch(error => console.error(error));
    }

    // 드롭다운 메뉴 버튼 함수
    const handleDropdown = (e) => {
        const ul = e.target.nextSibling;
        if(ul.style.display === "block")
            ul.style.display = "none";
        else
            ul.style.display = "block";
    }

    // 목록보기로 돌아가는 함수
    const clickPostListPage = () => {
        document.location.href = "/board";
    }

    // 이전 글로 이동하는 함수
    const clickPrevPost = () => {
        // 구현 필요
    }

    // 다음 글로 이동하는 함수
    const clickNextPost = () => {
        // 구현 필요
    }

    // 댓글 작성하는 함수
    const enterComment = (e) => {
        if(e.key === "Enter"){
            // 줄바꿈 방지
            e.preventDefault();
            // 구현 필요
            axios.get(`/api/comment/add`,{
                params: {
                    postIndex: id,
                    comment_author: "댓글 작성자",  // 수정 필요
                    comment_content: e.target.value,
                }
            })
            .then(response => setPost(response.data))
            .catch(error => console.error(error));
            alert("댓글 작성");
        }
    }

    // if (!post) {
    //     return <div>Loading...</div>;  // 데이터를 불러오는 동안에는 Loading 메시지를 보여줍니다.
    // }
    return (
        <div className="container">
            {/* 수정 또는 삭제를 위한 팝업창 */}
            <Modal show={show} onHide={handleClose} centered={true}>
                <Modal.Header>
                    <Modal.Title className='w-[100%]'>
                        게시글 삭제
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mx-3'>
                        <h6 class="card-text placeholder-glow">
                            정말로 <div class="placeholder col-5"></div> 게시글을 삭제하시겠습니까?
                        </h6>
                        게시글 삭제시 복구가 불가능합니다.
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn_close" variant="danger" onClick={handleClose}>
                        삭제
                    </Button>
                    <Button className="btn_close" variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* 게시글 */}
            <h1 className='text-start mt-[10vh] ms-3 user-select-none'>{post.board}</h1>
            <hr className='' />
            <div className='p-0 m-0 ms-3 user-select-none position-relative'>
                {/* 게시글 정보 */}
                <h4 className='text-start'>{post.title}</h4>
                <div className='row justify-content-around g-2 ms-0'>
                    <div className='row justify-content-start col'>
                        <div className='col-auto  m-0 p-0'>{post.writer}</div>
                        <div className="vr m-0 p-0 ms-2 mt-1 h-1"></div>
                        <div className='col-auto'>{post.createdDate}</div>
                    </div>
                    <div className='row justify-content-end col'>
                        <div className='col-auto'>조회 {post.view}</div>
                        <div className='col-auto'>추천 {post.upvote}</div>
                        <div className='col-auto'>추천 {post.downvote}</div>
                    </div>
                </div>

                <FontAwesomeIcon icon={faWrench} style={{color: "#aaa", cursor:"pointer"}} className='position-absolute top-0 end-7' id='modify' onClick={console.log("수정 버튼 클릭")} />
                <FontAwesomeIcon icon={faX} style={{color: "#aaa", cursor:"pointer"}} className='position-absolute top-0 end-2' id='delete' onClick={handleShow} />
            </div>
            <hr />
            {/* 게시글 내용 */}
            <p className='text-start ms-3 mb-[50px] me-3'>{post.content}</p>
            {/* 버튼 박스 */}
            <div className='position-relative w-[100%] h-[200px]'>
                <div className='position-absolute top-50 start-50 translate-middle rounded-top'>
                    {/* 추천, 비추천 버튼 */}
                    <div className='border border-success opacity-100 w-[350px] h-[120px] row justify-content-around text-end p-3 user-select-none m-0'>
                        <div className='row col-6'>
                            <div className='col text-center fs-3 text-green-700 p-3'>{post.upvote}</div>
                            <div className='col-auto bg-gray-100 border border-2 rounded-4 p-2 m-0' onClick={clickUpvote} style={{cursor:"pointer"}}>
                                <div className='text-center fs-1'>👍</div>
                            </div>
                        </div>
                        <div className='row col-6'>
                            <div className='col-auto bg-gray-100 border border-2 rounded-4 p-2 m-0' onClick={clickDownvote} style={{cursor:"pointer"}}>
                                <div className='text-center fs-1'>👎</div>
                            </div>
                            <div className='col text-center fs-3 p-3'>{post.downvote}</div>
                        </div>
                    </div>
                    {/* 이전글, 목록보기, 다음글 버튼 */}
                    <div className='w-[350px] h-[40px] border border-success rounded-bottom bg-success user-select-none'>
                        <div className='row justify-content-between text-white ps-3 pe-3 pt-[5px]'>
                            <div className='col-auto' style={{cursor:"pointer"}} onClick={clickPrevPost}>
                                이전글
                            </div>
                            <div className='col-auto' style={{cursor:"pointer"}} onClick={clickPostListPage}>
                                목록보기
                            </div>
                            <div className='col-auto' style={{cursor:"pointer"}} onClick={clickNextPost}>
                                다음글
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 댓글 입력 */}
            <hr className='text-green-700 border-4 opacity-50 m-0' />
            <div className='m-0 row justify-content-between bg-gray-100 pt-4 pb-4 '>
                <div className='col-auto w-[100px]'>
                    <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' className="rounded w-[100px]" alt="..."></img>
                </div>
                <div className="form-floating col">
                    <textarea className="form-control" placeholder="댓글 입력하여주세요." id="floatingTextarea2" style={{height: '100px'}} onKeyDown={enterComment}></textarea>
                    <label className='ms-[10px]' for="floatingTextarea2">댓글</label>
                </div>
            </div>
            <hr className='text-green-700 border-4 opacity-50 m-0 mb-4' />
            {/* 댓글 수 */}
            <div className='row justify-content-start'>
                <div className='text-start col-auto align-middle pe-0'>
                    전체 댓글 <span className='text-red-500 fw-bold'>{maxContentLength}</span>개
                </div>
                {/* 댓글 정렬 메뉴 */}
                <div class="dropdown col-auto">
                    <button onClick={handleDropdown} class="btn btn-secondary dropdown-toggle pt-0 pb-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        등록순
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item active" href="#">등록순</a></li>
                        <li><a class="dropdown-item" href="#">최신순</a></li>
                        <li><a class="dropdown-item" href="#">추천순</a></li>
                    </ul>
                </div>
            </div>
            <hr className='text-green-700 border-4 opacity-50 mt-2' />
            {/* 댓글 */}
            <div>
                {comments.map((comment, idx) => (
                    <div key={idx} id={comment.id} className='position-relative pt-2 pb-2' ref={idx === comments.length - 1 ? ref : null}>
                        {/* ref={idx === comments.length - 1 ? ref : null} */}
                        {/* 마지막 댓글에 사용자가 보고있는지 판단하는 코드를 추가 한 것임 */}
                        <FontAwesomeIcon icon={faWrench} style={{color: "#aaa",}} className='position-absolute top-0 end-7' />
                        <FontAwesomeIcon icon={faX} style={{color: "#aaa",}} className='position-absolute top-0 end-2' />
                        <div className='row align-items-center p-0 m-0 ms-3'>
                            <div className='col-1 m-0 p-0 me-3 user-select-none'>
                                <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' className="rounded w-[70px]" alt="..."></img>
                            </div>
                            <div className='col-2 text-start ps-0 user-select-none'>
                                <div className='text-start ps-0'>{comment.writer}</div>
                                <div className='text-start pe-0 text-sm fw-light'>{comment.createdDate}</div>
                            </div>
                            <div className='col-7 text-start'>{comment.content}</div>
                            <div className='row justify-content-around col-2 text-end p-0 ps-4 user-select-none'>
                                <div className='row text-sm fw-light col-5 bg-gray-100 border rounded-pill p-2 ps-0 me-2' onClick={clickCommentUpvote} style={{cursor:"pointer"}}>
                                    <div className='col-auto text-start p-0 ps-2 pe-1'>👍</div>
                                    <div className='col text-center p-0'>{comment.upvote}</div>
                                </div>
                                <div className='row text-end text-sm fw-light col-5 bg-gray-100 border rounded-pill p-2 ps-0 me-3' onClick={clickCommentDownvote} style={{cursor:"pointer"}}>
                                    <div className='col-auto text-start p-0 ps-2 pe-1'>👎</div>
                                    <div className='col text-center p-0'>{comment.downvote}</div>
                                </div>
                            </div>
                        </div>
                        <hr className='mb-0' />
                    </div>  
                ))}
            </div>
        </div>
    );
}