import React, { useState } from "react";

export default function Gamecomment(props) {
  // commnet 배열 가져오기
  const comment = props.Comment;

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
  const ClickCommentUp = () => {
    alert('추천증가')
  }
  //비추천 증가 버튼 클릭 이벤트
  const ClickCommentDown = () => {
    alert('비추증가')
  }
      return (
        <div>
          <dl className="mt-[13px] border-t border-slate-800">
            <dt className="text-left h-[70px] border-b border-black" >
              <div>
                <a href="javascript:void(0)" className=" pl-5 flex h-full">
                  <div class='w-[20%]'>
                    <img src='https://developer.android.com/static/images/cluster-illustrations/controllers.svg?hl=ko' class='mt-[10px] w-[50px] h-[50px]'></img>
                  </div>
                  <div class='w-[40%] mt-[20px] no-underline'>댓글 제목</div>
                  <div class='w-[40%] mt-[20px] no-underline flex'>
                    <div class='w-[40%] text-center' >댓글 게시일</div>
                    <div class='w-[30%] text-center'>추천 갯수</div>
                    <div class='w-[30%] text-center'>비추 개수</div>
                  </div>
                  </a>
              </div>
            </dt>
            {comment.map((cmt, index) => (
              <>
                {/*index+1 주지않으면 처음 로딩때 펴진상태로 시작*/}
                <dt value={index+1} className="text-left  h-[70px] border-b border-black" onClick={handleClick} >
                <a href="javascript:void(0)" className=" pl-5 flex h-full">
                  <div class='w-[20%]'>
                    <img src={cmt.commentimg} class='mt-[10px] w-[50px] h-[50px]'></img>
                  </div>
                  <div class='w-[40%] mt-[20px] no-underline'>{cmt.commentName}</div>
                  <div class='w-[40%] mt-[20px] no-underline flex'>
                    <div class='w-[40%] text-center'>{cmt.commentDate}</div>
                    <div class='w-[30%] text-center' onClick={ClickCommentUp}>{cmt.commentUp}</div>
                    <div class='w-[30%] text-center' onClick={ClickCommentDown}>{cmt.commentDown}</div>
                  </div>
                  </a>
                </dt>
                {select == index+1 &&
                <dd className="text-left text-xl border-b bg-slate-100 border-black"><p class='ml-[20%] w-[570px] break-all bg-slate-100'>{cmt.commentSub}</p>
                </dd>
                }
                </>
            ))}
            
            {/* <dt className="text-left  h-[70px] border-b border-black" onClick={handleClick} value={2}>
            <a href="javascript:void(0)" className=" pl-5 flex h-full">
              <div class='w-[20%]'>
                <img src='http://help.nexon.com/image/gameicon/cs_maple2.png' class='mt-[10px] w-[50px] h-[50px]'></img>
              </div>
              <div class='w-[40%] mt-[20px] no-underline'>2번째 입니다.</div>
              <div class='w-[40%] mt-[20px] no-underline flex'>
                <div class='w-[40%] text-center'>2021/05/20</div>
                <div class='w-[30%] text-center'>50</div>
                <div class='w-[30%] text-center'>1</div>
              </div>
              </a>
            </dt>
            {select == '2' &&
            <dd className="text-left text-xl border-b border-black"><div class='pl-5'>2번째 서브 글입니다</div>
            </dd>
            } */}
          </dl>
        </div>
      )
}