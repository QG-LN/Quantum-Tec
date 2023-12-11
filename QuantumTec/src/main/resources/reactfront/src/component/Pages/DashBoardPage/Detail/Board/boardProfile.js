import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ActivityGraph from "./activityGraph";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../../../Utils/networkUtils";
import AccountManagement from "./accountManagement";
import BoardItems from "./boardItems";
import { Viewer } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

function BoardProfile({ loadState }) {
  const states = useSelector(
    (state) => state.dashboardBoardProfile.dashboardBoardList
  );
  const { id } = useParams();
  const [state, setState] = useState(
    states.filter((e) => e.postIndex === parseInt(id))[0]
  );

  const [postInfo, setPostInfo] = useState({
    boardTitle: "",
    postAuthor: "",
    boardIndex: 0,
    postName: "",
    postDate: null,
    postContent: "",
    postUpvotes: 0,
    postView: 0,
    postDownvotes: 0,
  });

  useEffect(() => {
    if (!state?.postIndex) {
      setState(loadState);
      return;
    }
    const path = "dashboard/postinfo";
    const body = {
      postIndex: state.postIndex,
      userID: localStorage.getItem("userID"),
    };
    axiosRequest(path, body, "POST", "json")
      .then((response) => {
        setState((prevState) => ({ ...prevState, ...response }));
        console.log(response);
        setPostInfo((prevState) => ({ ...prevState, ...response }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.postIndex]);

  return (
    <div className="bg-white ml-[279px] mt-20">
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold">게시판 관리</h1>
          <div className="flex items-center space-x-4"></div>
        </div>
        <div className="flex p-6 gap-10">
          <div className="flex flex-col">
            <div className="w-4/12">
              <IconClipboardlist className="w-24 h-24 text-gray-300" />
              <div className="mt-4">
                <h2 className="text-lg font-semibold">번호</h2>
                <p className="text-gray-600">{id}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold">게시판</h2>
                <p className="text-gray-600">{postInfo.boardTitle}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold">작성자</h2>
                <p className="text-gray-600">{postInfo.postAuthor}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold">작성일자</h2>
                <p className="text-gray-600">{postInfo.postDate}</p>
              </div>
            </div>
          </div>
          <div className="flex-grow">
            <div className="mb-6">
              <h2 className="text-x1 text-start mb-2 ml-4 mr-4">{postInfo.postTitle}</h2>
              <div className="border-2 p-4 ml-4 mr-4 mt-4 mb-8">
                {postInfo.postContent && (
                  <Viewer
                    initialValue={postInfo.postContent}
                    plugins={[codeSyntaxHighlight]}
                  />
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 ml-4 mr-4">
                <div className="bg-gray-100 p-4">
                  <p className="fs-3 text-gray-600">추천 수</p>
                  <p className="text-lg font-semibold">
                    {postInfo.postUpvotes}
                  </p>
                </div>
                <div className="bg-gray-100 p-4">
                  <p className="fs-3 text-gray-600">비추천 수</p>
                  <p className="text-lg font-semibold">
                    {postInfo.postDownvotes}
                  </p>
                </div>
                <div className="bg-gray-100 p-4">
                  <p className="fs-3 text-gray-600">조회 수</p>
                  <p className="text-lg font-semibold">{postInfo.postView}</p>
                </div>
              </div>
              <BoardItems state={state} setState={setState} />
            </div>
            <div className="mb-6">
              <h2 className="text-x1 text-start mb-2 ml-4 mr-4">그래프 정보</h2>
              <div className="p-4">
                <div className="m-5"></div>
                <ActivityGraph state={state} />
              </div>
            </div>
            <AccountManagement state={state} />
          </div>
        </div>
      </div>
    </div>
  );
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
  );
}

export default BoardProfile;
