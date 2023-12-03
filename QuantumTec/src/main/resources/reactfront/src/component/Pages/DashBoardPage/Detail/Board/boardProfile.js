
import React from 'react';
import { Button } from 'react-bootstrap';
import ActivityGraph from './activityGraph';

function boardProfile(props) {
  const boardNum = 1;
  const allBoardNum = 10;
  const boardType = "자유게시판";
  const postName = "게시글1";
  const postWriter = "홍길동";
  const postDate = "2021-10-10";
  const postContent = "안녕하세요";
  const postUpvote = 10;
  const postDownvote = 1;


  return (
    <div className="bg-white ml-[279px] mt-20">
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold">게시판 관리</h1>
          <div className="flex items-center space-x-4">
          </div>
        </div>
        <div className="flex p-6 gap-10">
          <div className="flex flex-col w-1/4">
            <IconClipboardlist className="w-24 h-24 text-gray-300" />
            <div className="mt-4">
              <h2 className="text-lg font-semibold">게시글 번호</h2>
              <p className="text-gray-600">{boardNum}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">총 게시글 수</h2>
              <p className="text-gray-600">{allBoardNum}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">게시판 명칭</h2>
              <p className="text-gray-600">{boardType}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">게시글 명칭</h2>
              <p className="text-gray-600">{postName}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">작성자</h2>
              <p className="text-gray-600">{postWriter}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">작성일자</h2>
              <p className="text-gray-600">{postDate}</p>
            </div>
          </div>
          <div className="flex-grow">
            <div className="mb-6">
              <h2>게시글 내용</h2>
              <div className="bg-gray-100 p-4 mt-4">
              <p className="text-sm">{postContent}</p>
              </div>
              
              <h2 className="text-xl font-semibold mb-2">게시글 추가 정보</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4">
                  <p className="text-sm text-gray-600">추천 수</p>
                  <p className="text-lg font-semibold">{postUpvote}</p>
                </div>
                <div className="bg-gray-100 p-4">
                  <p className="text-sm text-gray-600">비추천 수</p>
                  <p className="text-lg font-semibold">{postDownvote}</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 mt-4">
                <h3 className="text-lg font-semibold mb-2">댓글 리스트</h3>
                <p className="text-sm text-gray-600">댓글1</p>
                <p className="text-sm text-gray-600">댓글2</p>
                <p className="text-sm text-gray-600">댓글3</p>
                <p className="text-sm text-gray-600">댓글4</p>
                <p className="text-sm text-gray-600">댓글5</p>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">추천수 변화 그래프</h2>
              <div className="bg-gray-100 p-4">
                <div className='m-5'></div>
                <ActivityGraph />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button className="bg-[#f3f4f6] text-black" variant="outline">
                게시글 추가
              </Button>
              <Button className="bg-[#f3f4f6] text-black" variant="outline">
                게시글 수정
              </Button>
              <Button className="bg-[#f3f4f6] text-black" variant="outline">
                게시글 삭제
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IconBell(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function IconClipboardlist(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  )
}

function CustomButton({ className, variant, children }) {
  return (
    <Button className={className} variant={variant}>
      {children}
    </Button>
  );
}
function IconCog(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>
  )
}


function IconUsercircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  )
}
export default boardProfile;