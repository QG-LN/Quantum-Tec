
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import React, { useState, useEffect} from 'react';

import axios from 'axios';
import {axiosRequest} from '../../Utils/networkUtils';
import { useParams } from 'react-router-dom';
import { faX, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInView } from "react-intersection-observer"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router';

export default function Post() {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const { no ,id } = useParams();                                 // react-router-dom을 사용하여 URL 파라미터에서 게시글 ID를 얻습니다.
    const [page, setPage] = useState(1)
    const [ref, inView] = useInView()
    const [loading, setLoading] = useState(false)
    const [reflash, setReflash] = useState(false)
    // const [commentEnterCheck, setCommentEnterCheck] = useState(false);       // 엔터로 댓글 입력을 진행하였을 때 입력 버튼이 두 번 눌리는 것을 방지하기 위한 변수
    const [contentLength, setContentLength] = useState(0);
    const [sortType, setSortType] = useState("date");               // 현재 정렬 방식
    const [sortName, setSortName] = useState("등록순");

    
    const [isCommentModify, setIsCommentModify] = useState(false);  // 댓글 수정 모드인지 여부
    const [modifyCommentInfo, setModifyCommentInfo] = useState({    // 댓글 정보
        index : 0,
        content : ""
    });
    
    //modal
    const [modalState, setModalState] = useState({
        show:false,                 // 팝업창을 띄울지 여부
        type:"",                    // 팝업창의 종류 (post: 게시글 삭제, comment: 댓글 삭제)
        commentIndex : 0            // 팝업창을 띄울 댓글의 인덱스
    });

    const [commentText, setCommentText] = useState("");                 // 댓글 작성창에 입력된 텍스트
    const [isFocusTextarea, setIsFocusTestarea] = useState(false);      // 댓글 작성창에 포커싱이 되었는지 여부

    // 페이지 이동을 위한 navigate 객체
    const navigate = useNavigate();

    ////////////////////////////////////////////////////////////////////////////////////
    // 게시글/댓글  수정/삭제 관련 
    ////////////////////////////////////////////////////////////////////////////////////
    // 게시글/댓글 삭제버튼 클릭 시 나오는 팝업창을 닫는 함수
    const handleClose = () => {
        setModalState({
            show:false,
            type:"",
            commentIndex : 0
        });
        
    }
    // 게시글 삭제버튼 클릭 시 사용되는 이벤트
    const handleDelete = (content) => {
        handleClose();

        content.type === 'post' ? deletePost() : deleteComment(content.index);
    }

    // 게시글 삭제 함수
    const deletePost = () => {
        const path = 'board/delete';
        const body ={
            postIndex: id,
            userID: localStorage.getItem("userID")
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                if(res){
                    alert("게시글을 성공적으로 삭제하였습니다.");
                    navigate(`/board/${no}`);
                }else{
                    alert("게시글을 삭제하지 못했습니다.");
                    setReflash(!reflash);
                }
            })

    }    

    // 댓글 삭제 함수
    const deleteComment = (commentIdx) => {
        
        const path = 'board/commentDelete';
        const body = {
            commentIndex: commentIdx,
            postIndex: id,
            userID: localStorage.getItem("userID")
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                if(res){
                    alert("댓글을 성공적으로 삭제하였습니다.");
                    setReflash(!reflash);
                }else{
                    alert("댓글을 삭제하지 못했습니다.");
                }
            })
    }

    // 게시글 / 댓글 삭제버튼 클릭 시 팝업창을 띄우는 함수
    const handleShow = (data) => {
        
        setModalState({
            show:true,
            type:data.type,
            commentIndex : data.index
        });
    }

    // 게시글 / 댓글 수정버튼 클릭 시 수정 선택 종류에 따라 수정 형식을 다르게 해주는 함수
    const handleModify = (data) => {
        data.type === 'post' ? handleModifyPost() : handleModifyComment(data.index, data.content);
    }    

    // 게시글 수정일 때의 핸들링 함수
    const handleModifyPost = () => {
        const data = {
            title: post.postTitle,
            content: post.postContent,
            beforePath: `/board/${no}/post/${id}`
        }
        navigate(`/board/${no}/post/${id}/edit`, {state: data});
    }

    // 댓글 수정일 때의 핸들링 함수
    const handleModifyComment = (commentIndex, commentContent) => {
        setIsCommentModify(true);
        setModifyCommentInfo({
            index : commentIndex,
            content : commentContent
        });
    }

    // 수정된 댓글을 서버에 전달하는 함수
    const sendModifyComment = () => {
        const checkComment = modifyCommentInfo.content === "";
        if(checkComment){
            alert("댓글을 작성해주세요.");
        }else{
            const path ='board/commentModify';
            const body = {
                postIndex: id,
                commentIndex: modifyCommentInfo.index,
                userID: localStorage.getItem("userID"),
                commentContent : modifyCommentInfo.content
            }
            console.log(body);

            axiosRequest(path,body,'POST','json')
                .then(res => {
                    if(res){
                        alert("댓글을 성공적으로 수정하였습니다.");
                        setIsCommentModify(false);
                        setReflash(!reflash);
                    }else{
                        alert("댓글을 수정하지 못했습니다.");
                    }
                })
        }
    }

    // 댓글 수정 취소 함수
    const cancelModifyComment = () => {
        setIsCommentModify(false);
        setReflash(!reflash);
    }
    
    ////////////////////////////////////////////////////////////////////////////////////
    // 게시글 이동 관련 함수
    ////////////////////////////////////////////////////////////////////////////////////
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
        navigate(`/board/${no}`);
    }
    // 이전 글로 이동하는 함수
    const clickPrevPost = () => {
        const path = 'board/prev';
        const body ={
            postIndex: id
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                if(res!==0){
                    navigate(`/board/${no}/post/${res}`);
                }else{
                    alert("이전 글이 없습니다.");
                }
            })
    }
    // 다음 글로 이동하는 함수
    const clickNextPost = () => {
        
        const path = 'board/next';
        const body ={
            postIndex: id
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                if(res!==0){
                    navigate(`/board/${no}/post/${res}`);
                }else{
                    alert("다음 글이 없습니다.");
                }
            })
    }
    
    ////////////////////////////////////////////////////////////////////////////////////
    // 추천 / 비추천 관련 함수
    ///////////////////////////////////////////////////////////////////////////////////
    // 추천, 비추천 버튼 함수
    const clickUpvote = () => {
        const path = 'board/upvote';
        const body ={
            postIndex: id,
            userID: localStorage.getItem("userID")
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                if(res){
                    alert("추천하였습니다.");
                    setReflash(!reflash);
                }else{
                    alert("추천하지 못했습니다.");
                }
            })
    }
    const clickDownvote = () => {
        const path = 'board/downvote';
        const body ={
            postIndex: id,
            userID: localStorage.getItem("userID")
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                if(res){
                    alert("비추천하였습니다.");
                    setReflash(!reflash);
                }else{
                    alert("비추천하지 못했습니다.");
                }
            })
    }

    // 댓글 추천, 비추천 버튼 함수
    const clickCommentUpvote = (e) => {
        const path = 'board/commentUpvote';
        const body ={
            postIndex: id,
            userID: localStorage.getItem("userID"),
            commentIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                if(res){
                    alert("추천하였습니다.");
                    setReflash(!reflash);
                }else{
                    alert("추천하지 못했습니다.");
                }
            })
    }
    const clickCommentDownvote = (e) => {
        const path = 'board/commentDownvote';
        const body ={
            postIndex: id,
            userID: localStorage.getItem("userID"),
            commentIndex: e.target.parentNode.parentNode.parentNode.parentNode.id
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                if(res){
                    alert("비추천하였습니다.");
                    setReflash(!reflash);
                }else{
                    alert("비추천하지 못했습니다.");
                }
            })
    }

    ////////////////////////////////////////////////////////////////////////////////////
    //댓글 관련 함수
    ////////////////////////////////////////////////////////////////////////////////////
    // 댓글 작성란에 입력된 텍스트에 변화가 있을 때마다 실행되는 함수
    const onCommentTextChange = (e) => {
        setCommentText(e.target.value);
    }

    // 댓글 작성창에 포커싱이 되었을 때 실행되는 함수
    const handleTextareaFocus = () => {
        setIsFocusTestarea(true);
    }

    // 댓글 작성창에 포커싱이 해제되었을 때 실행되는 함수
    const handleTextareaBlur = () => {
        setTimeout(() => {
            setIsFocusTestarea(false);
          }, 150); // 100ms 딜레이

    }

    // 댓글 작성 버튼을 눌렀을 때 실행되는 함수
    const clickWriteComment = (e) => {
        // 줄바꿈 방지
        e.preventDefault();
        const checkComment = commentText === "";
        if(checkComment){
            alert("댓글을 작성해주세요.");
        }else{
            const path = 'board/commentWrite';
            const body ={
                postIndex : id,
                userID : localStorage.getItem("userID"),
                commentContent : commentText
            }
            axiosRequest(path,body,'POST','json')
                .then(res => {
                    if(res){
                        alert("댓글을 성공적으로 올렸습니다.");
                        setCommentText("");
                        setReflash(!reflash);
                    }else{
                        alert("댓글을 올리지 못했습니다.");
                    }
                })
        }

    }
    
    // 댓글 작성 취소 버튼을 눌렀을 때 실행되는 함수
    const clickCancelComment = (e) => {
        console.log("취소");
        // 댓글 작성란 초기화
        setCommentText("");
    }    

    // 댓글 정렬 함수
    const handleSort = (e) => {
        e.target.parentNode.parentNode.style.display = "none";
        switch (e.target.innerText) {
            case '등록순':
                setSortType('date');
                break;
            case '추천순':
                setSortType('upvote');
                break;
            case '비추천순':
                setSortType('downvote');
                break;
            default:
                setSortType('date');
                break;
        }
    }

    // 댓글 수정 시 textarea에 입력된 값을 저장하는 함수
    const onTextChange = (e) => {
        setModifyCommentInfo({
            ...modifyCommentInfo,
            content : e.target.value
        });
        console.log(modifyCommentInfo.content);
    }


    ////////////////////////////////////////////////////////////////////////////////////
    // useEffect
    ////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const path = 'board/viewCountUp';
        const body ={
            postIndex: id,
        }
        axiosRequest(path,body,'POST','json')
    }, []);

    // 정렬 방식이 바뀔 때마다 정렬 방식에 따라 정렬 이름을 바꿔주는 함수
    useEffect(() => {
        console.log(sortType);

        switch (sortType) {
            case 'date':
                setSortName('등록순');
                break;
            case 'upvote':
                setSortName('추천순');
                break;
            case 'downvote':
                setSortName('비추천순');
                break;
            default:
                setSortName('등록순');
                break;
        }
    }, [sortType]);

    // reflash와 sortType이 바뀔 때마다 게시글 정보와 댓글 정보를 가져오는 함수
    useEffect(() => {
        setPage(1);
        const path = 'board/view';
        const body ={
            postIndex: id,
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                setPost(res);
            })
        const path2 = 'board/commentList';
        const body2 ={
            pageNum: page,
            postIndex: parseInt(id),
            sortType: sortType
        }
        axiosRequest(path2,body2,'POST','json')
            .then(res => {
                setComments([...res]);
            })
    }, [reflash,sortType]);

    // page가 바뀔 때마다 댓글 정보를 가져오는 함수
    useEffect(() => {
        setLoading(true)
        const path = 'board/view';
        const body ={
            postIndex: id,
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                setPost(res);
            })
        
        const path2 = 'board/commentList';
        const body2 ={
            pageNum: page,
            postIndex: parseInt(id),
            sortType: sortType
        }
        axiosRequest(path2,body2,'POST','json')
            .then(res => {
                if(page ===1){
                    setComments([...res]);
                }else{
                    setComments([...comments, ...res]);
                }
            })
        
        const path3 = 'board/commentCount';
        const body3 ={
            postIndex: id,
        }
        axiosRequest(path3,body3,'POST','json')
            .then(res => {
                setContentLength(res);
            })
        setLoading(false)
    }, [page]);
    
    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage(page + 1)
        }
    }, [inView, loading])

    return (
        <div className="container">
            {/* 수정 또는 삭제를 위한 팝업창 */}
            <Modal show={modalState.show} onHide={handleClose} centered={true}>
                <Modal.Header>
                    <Modal.Title className='w-[100%]'>
                        {modalState.type === 'post' ? '게시글 삭제' : '댓글 삭제'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mx-3'>
                        <h6 class="card-text placeholder-glow">
                            {
                                modalState.type === 'post' ? <strong>"{post.postTitle}" 게시글을 삭제하시겠습니까?</strong> : <strong>댓글을 삭제하시겠습니까?</strong>
                            }
                        </h6>
                        <div class="ml-3 text-sm">삭제시 복구가 불가능합니다.</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn_close" variant="danger" onClick={() => handleDelete({type:modalState.type , index:modalState.commentIndex})}>
                        삭제
                    </Button>
                    <Button className="btn_close" variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* 게시글 */}
            <h1 className='text-start mt-[10vh] ms-3 user-select-none'>{post.boardTitle}</h1>
            <hr className='' />
            <div className='p-0 m-0 ms-3 user-select-none position-relative'>
                {/* 게시글 정보 */}
                <h4 className='text-start'>{post.postTitle}</h4>
                <div className='row justify-content-around g-2 ms-0'>
                    <div className='row justify-content-start col'>
                        <div className='col-auto  m-0 p-0'>{post.postAuthor}</div>
                        <div className="vr m-0 p-0 ms-2 mt-1 h-1"></div>
                        <div className='col-auto'>{post.postDate}</div>
                    </div>
                    <div className='row justify-content-end col'>
                        <div className='col-auto'>조회 {post.postView}</div>
                        <div className='col-auto'>추천 {post.postUpvotes}</div>
                        <div className='col-auto'>비추천 {post.postDownvotes}</div>
                    </div>
                </div>
                {post.postAuthor === localStorage.getItem("userNickname") && 
                    <>
                        <FontAwesomeIcon icon={faWrench} style={{color: "#aaa", cursor:"pointer"}} className='position-absolute top-0 end-7' id='modify' onClick={() => handleModify({type:'post'})} />
                        <FontAwesomeIcon icon={faX} style={{color: "#aaa", cursor:"pointer"}} className='position-absolute top-0 end-2' id='delete' onClick={ () => handleShow({type:'post'})}/>
                    </>
                }
            </div>
            <hr />
            {/* 게시글 내용 */}
            {/* <p className='text-start ms-3 mb-[50px] me-3'>{post.postContent}</p> */}
            <div className='text-start ms-3 mb-[50px] me-3'>
                {post.postContent && (<Viewer
                    
                    initialValue={post.postContent}
                    plugins={[codeSyntaxHighlight]}
                />
                )}
            </div>
            {/* 버튼 박스 */}
            <div className='position-relative w-[100%] h-[200px]'>
                <div className='position-absolute top-50 start-50 translate-middle rounded-top'>
                    {/* 추천, 비추천 버튼 */}
                    <div className='border border-success opacity-100 w-[350px] h-[120px] row justify-content-around text-end p-3 user-select-none m-0'>
                        <div className='row col-6'>
                            <div className='col text-center fs-3 text-green-700 p-3'>{post.postUpvotes}</div>
                            <div className='col-auto bg-gray-100 border border-2 rounded-4 p-2 m-0' onClick={clickUpvote} style={{cursor:"pointer"}}>
                                <div className='text-center fs-1'>👍</div>
                            </div>
                        </div>
                        <div className='row col-6'>
                            <div className='col-auto bg-gray-100 border border-2 rounded-4 p-2 m-0' onClick={clickDownvote} style={{cursor:"pointer"}}>
                                <div className='text-center fs-1'>👎</div>
                            </div>
                            <div className='col text-center fs-3 p-3'>{post.postDownvotes}</div>
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
            <div className='m-0 row justify-content-between bg-gray-100 pt-4 pb-4'>
                <div className='col-auto w-[100px]'>
                    <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' className="rounded w-[100px]" alt="..."></img>
                </div>
                <div className="form-floating col" >
                    <textarea className="form-control" id="floatingTextarea2" style={{height: '100px'}} 
                                onChange={onCommentTextChange} value={commentText} 
                                onFocus={handleTextareaFocus} onBlur={handleTextareaBlur}/>
                    <label className='ms-[10px]' for="floatingTextarea2">댓글 추가...</label>
                    {
                        isFocusTextarea &&
                        <div>
                            <button className='btn btn-success mt-2 ml-1' style={{float:'right'}} onClick={clickWriteComment}>댓글</button>
                            <button className='btn btn-success mt-2 ml-1' style={{float:'right'}} onClick={clickCancelComment}>취소</button>   
                        </div>
                    }
                </div>
            </div>
            <hr className='text-green-700 border-4 opacity-50 m-0 mb-4' />
            {/* 댓글 수 */}
            <div className='row justify-content-start'>
                <div className='text-start col-auto align-middle pe-0'>
                    전체 댓글 <span className='text-red-500 fw-bold'>{contentLength}</span>개
                </div>
                {/* 댓글 정렬 메뉴 */}
                <div class="dropdown col-auto">
                    <button onClick={handleDropdown} class="btn btn-secondary dropdown-toggle pt-0 pb-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {sortName}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a onClick={handleSort} class="dropdown-item" href="#">등록순</a></li>
                        <li><a onClick={handleSort} class="dropdown-item" href="#">추천순</a></li>
                        <li><a onClick={handleSort} class="dropdown-item" href="#">비추천순</a></li>
                    </ul>
                </div>
            </div>
            <hr className='text-green-700 border-4 opacity-50 mt-2' />
            {/* 댓글 */}
            <div>
                {comments.map((comment, idx) => (
                    <div key={idx} id={comment.commentIndex} className='position-relative pt-2 pb-2' ref={idx === comments.length - 1 ? ref : null}>
                        {/* ref={idx === comments.length - 1 ? ref : null} */}
                        {/* 마지막 댓글에 사용자가 보고있는지 판단하는 코드를 추가 한 것임 */}
                        {comment.commentWriter === localStorage.getItem("userNickname") && 
                            <>
                                <FontAwesomeIcon icon={faWrench} style={{color: "#aaa", cursor:"pointer"}} 
                                                className='position-absolute top-0 end-7' 
                                                id='modify'
                                                onClick={()=> handleModify({type:'comment', index:comment.commentIndex, content:comment.commentContent})}/>
                                <FontAwesomeIcon icon={faX} style={{color: "#aaa", cursor:"pointer"}} 
                                                className='position-absolute top-0 end-2' 
                                                id='delete'
                                                onClick={() => handleShow({type:'comment' , index:comment.commentIndex})}/>
                            </>
                        }
                        <div className='row align-items-center p-0 m-0 ms-3'>
                            <div className='col-1 m-0 p-0 me-3 user-select-none'>
                                <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' className="rounded w-[70px]" alt="..."></img>
                            </div>
                            <div className='col-2 text-start ps-0 user-select-none'>
                                <div className='text-start ps-0'>{comment.commentWriter}</div>
                                <div className='text-start pe-0 text-sm fw-light'>{comment.commentDate}</div>
                            </div>
                            <div className='col-7 text-start'>
                                {!isCommentModify && comment.commentContent}
                                {isCommentModify &&
                                    (
                                        modifyCommentInfo.index === comment.commentIndex &&
                                        <>
                                            <textarea className="form-control" placeholder="댓글 입력하여주세요." id="floatingTextarea2" style={{height: '100px'}} onChange={onTextChange}>
                                                {modifyCommentInfo.content}
                                            </textarea>
                                            <button class='m-1 btn btn-success' style={{float:'right'}} onClick={cancelModifyComment}>
                                                취소
                                            </button>
                                            <button class='m-1 btn btn-success' style={{float:'right'}} onClick={sendModifyComment}>
                                                수정
                                            </button>

                                        </>
                                    )
                                }
                                {
                                    isCommentModify && modifyCommentInfo.index !== comment.commentIndex && comment.commentContent
                                }
                            </div>
                            <div className='row justify-content-around col-2 text-end p-0 ps-4 user-select-none'>
                                <div className='row text-sm fw-light col-5 bg-gray-100 border rounded-pill p-2 ps-0 me-2' onClick={clickCommentUpvote} style={{cursor:"pointer"}}>
                                    <div className='col-auto text-start p-0 ps-2 pe-1'>👍</div>
                                    <div className='col text-center p-0'>{comment.commentUpvote}</div>
                                </div>
                                <div className='row text-end text-sm fw-light col-5 bg-gray-100 border rounded-pill p-2 ps-0 me-3' onClick={clickCommentDownvote} style={{cursor:"pointer"}}>
                                    <div className='col-auto text-start p-0 ps-2 pe-1'>👎</div>
                                    <div className='col text-center p-0'>{comment.commentDownvote}</div>
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