import React, {useState, useParams, useEffect} from "react";
import {faX, faWrench} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import AvatarCanvas from "../avatarInventory/avatarCanvas";

export default function Gamecomment(props) {
    // commnet 배열 가져오기
    const comments = props.commentList;

    const [post, setPost] = useState({});
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)


    // 선택한 문장 값 저장
    const [select, setSelect] = useState('');


    // comment 클릭시 추가 댓글 보여주기
    const handleClick = (e) => {
        const target = e.currentTarget;
        //DT 속성 클릭시 서브 페이지 오픈
        if (target.tagName === "DT") {
            setSelect(e.currentTarget.getAttribute("value"));
        }
        // 이미 열려있으면 닫기
        if (select == e.currentTarget.getAttribute("value")) {
            setSelect(undefined)
        }
        // console.log(select)
        // console.log(target.tagName)
    }

//추천 증가 버튼 클릭 이벤트
    const clickCommentUpvote = (e) => {
        // 유저 중복 안되게 하는 코드 필요
        axios.get(`/api/comment/upvote`, {
            params: {
                commentIndex: e.target.parentNode.parentNode.parentNode.id,
            }
        })
            .then(response => (response.data) ? alert("추천하였습니다.") : alert("추천하지 못했습니다."))
            .catch(error => console.error(error));
    }

//추천 감소 버튼 클릭 이벤트
    const clickCommentDownvote = (e) => {
        // 유저 중복 안되게 하는 코드 필요
        axios.get(`/api/comment/downvote`, {
            params: {
                commentIndex: e.target.parentNode.parentNode.parentNode.id,
            }
        })
            .then(response => (response.data) ? alert("비추천하였습니다.") : alert("비추천하지 못했습니다."))
            .catch(error => console.error(error));
    }

    return (
        <div>
            <dl className="mt-[13px] border-t border-slate-800">
                <dt className="text-left h-[70px] border-b border-black mb-2">
                    <div>
                        <a href="javascript:void(0)" className=" pl-5 flex h-full no-underline text-black">
                            <div class='w-[12%]'>
                                <img
                                    src='https://developer.android.com/static/images/cluster-illustrations/controllers.svg?hl=ko'
                                    class='mt-[10px] w-[50px] h-[50px]'></img>
                            </div>
                            <div class='w-[22%] mt-[20px] no-underline'>사용자명</div>
                            <div class='col-5 mt-[20px] no-underline'>댓글 내용</div>
                            <div class='w-[40%] mt-[20px] no-underline flex'>
                                <div class='w-[21%] text-center'>평점</div>
                                <div class='col-4 ml-12 text-center'>추천수</div>
                                <div class='col-2 ml-[-3%] text-center'>비추수</div>
                            </div>
                        </a>
                    </div>
                </dt>
                {comments.map((comment, idx) => (
                    <div key={idx} className='position-relative pt-2 pb-2'>
                        {/* 마지막 댓글에 사용자가 보고있는지 판단하는 코드를 추가 한 것임 */}
                        <FontAwesomeIcon icon={faWrench} style={{color: "#aaa",}}
                                         className='position-absolute top-1 end-7'/>
                        <FontAwesomeIcon icon={faX} style={{color: "#aaa",}} className='position-absolute top-1 end-2'/>
                        <div className='row align-items-center p-0 m-0 ms-3'>
                            <div className='col-1 m-0 p-0 me-3 user-select-none'>
                                {/* <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                                     className="rounded w-[70px]" alt="..."></img> */}
                                <div className="w-[70px]">
                                    <AvatarCanvas size={[200,200]} position={[128,128]} avatarItemList={comment.avatarItemList || []}/>
                                </div>
                            </div>
                            <div className='col-2 text-start ps-0 user-select-none'>
                                <div className='text-start ps-0'>{comment.userName}</div>
                                <div className='text-start pe-0 text-sm fw-light'>{comment.commentCreatedData}</div>
                            </div>
                            <div className='col-5 text-start'>{comment.commentContent}</div>
                            <div className='ml-5 mr-8 col-1 text-start'>{comment.commentRating}</div>
                            <div className=' row justify-content-around col-2 text-end p-0 ps-4 user-select-none'>
                                <div
                                    className='row text-sm fw-light col-5 bg-gray-100 border rounded-pill p-2 ps-0 me-2'
                                    onClick={clickCommentUpvote} style={{cursor: "pointer"}}>
                                    <div className='col-auto text-start p-0 ps-2 pe-1'>👍</div>
                                    <div className='col text-center p-0'>{comment.commentUpvote}</div>
                                </div>
                                <div
                                    className='row text-end text-sm fw-light col-5 bg-gray-100 border rounded-pill p-2 ps-0 me-3'
                                    onClick={clickCommentDownvote} style={{cursor: "pointer"}}>
                                    <div className='col-auto text-start p-0 ps-2 pe-1'>👎</div>
                                    <div className='col text-center p-0'>{comment.commentDownvote}</div>
                                </div>
                            </div>
                        </div>
                        <hr className='mb-0'/>
                    </div>
                ))}
            </dl>
        </div>
    )
}