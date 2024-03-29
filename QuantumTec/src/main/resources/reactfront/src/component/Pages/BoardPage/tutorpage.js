import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../App.css";
import { extractData } from "../../Utils/dataFormat";
//이미지
import OpenKakao from "../../../image/kakaoOpenChat.png";
import {
  faCheck,
  faBan,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosRequest } from "../../Utils/networkUtils";
import useQuickButtonState, { NONE_BUTTON, BACK_BUTTON, EDIT_BUTTON, DELETE_BUTTON, CHECK_BUTTON, APPLICANT_LIST_BUTTON, BAN_BUTTON } from './TutorQuickButtonState';
import AvatarCanvas from "../avatarInventory/avatarCanvas";
import CustomModal from "./CustomModal";
import useApplyListState from "./TutorApplyList";
import usePostState from "./TutorPostState";

export default function TutorPage() {
  const { state, setState } = usePostState();

  // state 정보를 분리
  const { postTitle, 
    postIndex, 
    userNickname, 
    tags, 
    postDate, 
    runningType, 
    maxUserCount, 
    userCount, 
    startDate, 
    studyLink, 
    expectedTime, 
    category, 
    postIntro, 
    postContent,
    postState,
    avatarItemList
  } = state;

  const {
    applyList,
    setApplyList,
    isShowApplyList,
    setIsShowApplyList,
    loadApplyList,
  } = useApplyListState();  // 튜터링 신청자 목록 상태

  const [enroll, setEnroll] = useState("");                                     // 튜터링 등록 상태 [신청 / 취소 / 수락 / 거절]
  const [isEnrollButtonDisabled, setIsEnrollButtonDisabled] = useState(Array(applyList.length).fill(false));   // 튜터링 신청 버튼 활성화 여부

  const naviagte = useNavigate();

  // 튜터링 게시글 정보를 Link를 통해 전달 받음
  const location = useLocation();
  // info[튜터링 게시글 정보], orderCategory[정렬 기준]를 전달 받음
  const info = location.state ? location.state.info.info : null;                    
  const orderCategory = location.state ? location.state.info.orderCategory : null;  // Link로 접근한 것이 아닐 경우 null값 부여

  const {
    buttons,
    setButtons,
    initializeButtons,
    setNoneButtonEvent,
  } = useQuickButtonState();  // 퀵 버튼 상태

  useEffect(() => {
    // 튜터링 게시글 정보가 존재할 경우 상태를 업데이트
    if (info === null) {
      return null;
    } else {

      // 버튼 이벤트에 따라 초기화
      initializeButtons();

      // 튜터링 게시글 정보를 state에 저장
      setState({
        ...state,
        postTitle: info.postTitle,
        userNickname: info.userNickname,
        postDate: extractData(info.postDate),
        maxUserCount: info.maxUserCount,
        userCount: info.userCount,
        category: info.category,
        tags: info.tags,
        expectedTime: info.expectedTime,
        postIntro: info.postIntro,
        postContent: info.postContent,
        runningType: info.runningType ? "온라인" : "오프라인",
        studyLink: info.link,
        startDate: extractData(info.startDate),
        postState: info.postState,
        avatarItemList: info.avatarItemList,
      });

      buttons[BACK_BUTTON].to = `/tutoringPost/${info.postIndex}/edit`;

      // 튜터링 신청자 목록 불러오기
      if (checkPostWriter(info.userNickname)) {
        loadEnrollList();
      } else {
        // 튜터링 신청 여부 확인
        loadCheckEnroll();
      }
    }
  }, []);

  //튜터링 신청 여부에 따른 버튼 변경
  useEffect(() => {
    if (enroll === "수락" || enroll === "거절") {                                // 튜터가 수락 또는 거절을 했을 경우
      setNoneButtonEvent(4, enroll === "수락" ? "신청수락" : "신청거절", faCheck);   // 버튼 텍스트 변경
    } else {                                                                    // 튜터가 수락 또는 거절을 하지 않았을 경우
      if (info.userCount !== info.maxUserCount && info.postState) {             // 현재 인원이 최대 인원보다 작은지를 확인
        setButtons(                                                             // enroll 상태에 따라 버튼 텍스트 변경
          buttons.map((button) => {
            if (button.id === CHECK_BUTTON) {
              return {
                ...button,
                text: enroll === "신청" ? "신청취소" : "신청하기",
                comment:
                  enroll === "신청"
                    ? "정말로 신청을 취소하시겠습니까?"
                    : "정말로 신청하시겠습니까?",
                buttonOK: {
                  title: enroll === "신청" ? "신청 취소하기" : "신청하기",
                  event: () => {
                    confirmModal("update");
                  },
                },
              };
            } else {
              return button;
            }
          })
        );
      }else {                        
        setNoneButtonEvent(4, "모집 완료", faBan);
      }
    }
  }, [enroll]);

  //튜터링 게시글 상태 변동에 따른 버튼 변경
  useEffect(() => {
    if (info.userCount !== info.maxUserCount) {
      setButtons(
        buttons.map((button) => {
          if (button.id === BAN_BUTTON) {
            return {
              ...button,
              text: postState ? "모집 중지" : "모집 진행",
              comment: postState
                ? "정말로 모집을 중지하시겠습니까?"
                : "모집을 진행상태로 변경하시겠습니까?",
              icon: postState ? faBan : faUserPlus,
              buttonOK: {
                title: postState ? "모집 중지" : "모집 진행",
                event: () => {
                  confirmModal("postUpdate");
                },
              },
            };
          } else {
            return button;
          }
        })
      );
    }else{
      setNoneButtonEvent(6, "모집 완료", faBan);
    }
  }, [postState]);

  // 게시글 작성자와 로그인한 유저가 같은지 확인
  const checkPostWriter = useCallback(
    (nickName) => {
      if (nickName === localStorage.getItem("userNickname")) {
        return true;
      } else {
        return false;
      }
    },
    [userNickname]
  );

  // 신청 리스트 불러오기
  const loadEnrollList = async () => {
    const path = "board/tutoringEnrollList";
    const body = {
      postTutoringIndex: info.postIndex,
      userID: localStorage.getItem("userID"),
    };
    const data = await axiosRequest(path, body, "POST", "json");

    if (data === null || data === false || data === undefined) {
      alert("불러오기 실패");
    } else if (data) {
      setApplyList(data);

      // 신청자 목록에서 신청 버튼 활성화 여부 확인
      setIsEnrollButtonDisabled(
        Array.from(
          { length: data.length },
          (_, index) => data[index].enrollState !== "신청"
        )
      );
    }
  };

  /**
   * 신청 여부를 확인하기 위해 서버에 요청하는 함수
   * enroll -> 현재 해당 게시글에 대한 신청 상태에 대한 정보를 담고 있음
   * 신청 -> 신청상태 , 취소 -> 신청 취소 상태, 수락 -> 수락 상태, 거절 -> 거절 상태, 없음 -> 한번도 신청하지 않은 상태
   */

  const loadCheckEnroll = async () => {
    const path = "board/checkTutoringEnroll";
    const body = {
      postTutoringIndex: info.postIndex,
      userID: localStorage.getItem("userID"),
    };

    const data = await axiosRequest(path, body, "POST", "json");
    console.log(data);
    if (data !== null && data !== undefined) {
      setEnroll(data);
    }
  };

    /**
   * 신청 정보를 변경하기 위해 서버에 요청하는 함수
   * @param {String} type 서버에 요청할 신청 정보[내가 원하는 상태를 전달]
   */
  const updateTutoringEnroll = async (type) => {
    const path = "board/updateTutoringEnroll";
    const body = {
      postTutoringIndex: info.postIndex,
      userNickname: localStorage.getItem("userNickname"),
      userID: localStorage.getItem("userID"),
      enrollState: type,      
    };
  
    // 성공 여부를 반환
    const data = await axiosRequest(path, body, "POST", "boolean");
    if (data === null || data === false || data === undefined) {
      alert("수정 실패");      
    } else {
      alert("수정 성공");
      setEnroll(enroll === "신청" ? "취소" : "신청");
    }
  };

  //버튼위에 마우스 올렸을때
  const handleMouseEnter = useCallback((id) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id ? { ...button, isHovered: true } : button
      )
    );
  }, []);
  //버튼위에 마우스 떠날때
  const handleMouseLeave = useCallback((id) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id ? { ...button, isHovered: false } : button
      )
    );
  }, []);

  const handleButtonClick = (id) => {
    // 신청자 목록 버튼 클릭시 신청자 목록을 활성화
    if (id === APPLICANT_LIST_BUTTON) {
      setIsShowApplyList(!isShowApplyList); // 신청자 목록 활성화 여부
      buttons[CHECK_BUTTON].text = isShowApplyList ? "신청자 목록" : "튜터링 소개"; // 버튼 텍스트 변경
      return;
    }

    // 삭제버튼 클릭시 모달창에 텍스트 변경
    if(id === DELETE_BUTTON) {
      setButtons(
        buttons.map((button) => {
          if (button.id === DELETE_BUTTON) {
            return {
              ...button,
              text: "삭제하기",
              comment: "해당 게시물을 정말로 삭제하시겠습니까?",
              buttonOK: {
                title: "삭제하기",
                event: () => {
                  confirmModal("postUpdate");
                },
              },
            };
          } else {
            return button;
          }
        })
      );
    }

    // 버튼 클릭하면 모달을 열도록 설정
    showModal(id);
  };
  // 삭제하기 이벤트
  const deletePostEvent = async () => {
    const path = "board/tutoringDelete";
    const body = {
      postIndex: info.postIndex,
      userID: localStorage.getItem("userID"),
    };
    const data = await axiosRequest(path, body, "POST", "json");

    if (data === null || data === false || data === undefined) {
      alert("삭제 실패");
    } else if (data) {
      alert("삭제 성공");
      naviagte("/tutoring");
    }
  };
  // 게시글 상태 변경 이벤트
  const postStateUpdateEvent = async () => {
    const path = "board/tutoringPostStateUpdate";
    const body = {
      postIndex: info.postIndex,
      userID: localStorage.getItem("userID"),
      postStatus: !postState,
    };
    const data = await axiosRequest(path, body, "POST", "json");
    if (data === null || data === false || data === undefined) {
      alert("모집 상태 변경 실패");
    } else if (data) {
      alert("모집 상태 변경 성공");
      // naviagte("/tutoring");
      setState({
        ...state,
        postState: !postState,
      })
    }
  };

  // 모달창 - 확인버튼
  const confirmModal = (type) => {
    switch (type) {
      case "update":
        updateTutoringEnroll(enroll === "신청" ? "취소" : "신청");  // 신청 정보 변경을 위한 요청
        break;
      case "delete":
        deletePostEvent();
        break;
      case "postUpdate":
        postStateUpdateEvent();
        break;
      default:
        break;
    }

    // 모달 닫기
    closeModal();
  };

  //모달창-닫기버튼
  const closeModal = () => {
    // 모달 닫기
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id !== NONE_BUTTON ? { ...button, showModal: false } : button
      )
    );
  };

  // 모달창 - 열기버튼
  const showModal = (id) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id ? { ...button, showModal: true } : button
      )
    );
  }

  // 모달창 렌더링
  const renderModal = (button) => {
    if (button.buttonOK === undefined) {
      return null;
    }
    return (
      <CustomModal close={closeModal} button={button} />
    );
  };

  const top = 250;

  // 튜터링 소개 렌더링
  const rednerTutoringIntro = () => {
    return (
      <div className=" mt-32 text-lg break-words tracking-[-0.004em]">
        <h2 className=" font-bold text-2xl pb-6 border-b-4 text-left">
          튜터링 소개
        </h2>
        <div className=" w-[100%] mt-10 mx-auto mb-0">
          <div class="pl-[2rem] pr-[2rem]">
            <div class="mb-5">
              <p class="m-0 text-left fs-3">Intro</p>
              <hr />
              <p className="m-3 text-left">{postIntro}</p>
            </div>
            <div>
              <p class="m-0 text-left fs-3">Content</p>
              <hr />
              <p className="m-3 text-left">{postContent}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 튜터링 신청자 목록 렌더링
  const rednerTutoringApplyList = () => {
    return (
      <div className=" mt-32 text-lg break-words tracking-[-0.004em]">
        <h2 className=" font-bold text-2xl pb-6 border-b-4 text-left">
          튜터링 신청자 목록
        </h2>
        <div className=" w-[100%] mt-10 mx-auto mb-0">
          <table className="table table-striped mt-0 pt-0 table-hover user-select-none">
            <thead>
              <tr class="border-top">
                <th className="w-[20%]">신청번호</th>
                <th className="w-[20%]">닉네임</th>
                <th className="w-[20%]">신청일자</th>
                <th className="w-[20%]">신청상태</th>
                <th className="w-[20%]">신청여부</th>
              </tr>
            </thead>
            <tbody>
              {renderApplyList()}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 튜터링 신청자 목록 렌더링
  const renderApplyList = () => {
    return applyList.map((apply, index) => (
      <tr key={index} style={{ cursor: "pointer" }}>
        <td className="text-center" style={{ lineHeight: "2" }}>
          {index + 1}
        </td>
        <td className="text-center" style={{ lineHeight: "2" }}>
          {apply.userNickname}
        </td>
        <td className="text-center" style={{ lineHeight: "2" }}>
          {extractData(apply.enrollCreatedAt)}
        </td>
        <td className="text-center" style={{ lineHeight: "2" }}>
          {apply.enrollState}
        </td>
        <td className="text-center">
          <button
            className="btn btn-primary mr-2"
            disabled={isEnrollButtonDisabled[index]}
            onClick={() => handleButtonApply("수락", apply)}
          >
            수락
          </button>
          <button
            className="btn btn-danger"
            disabled={isEnrollButtonDisabled[index]}
            onClick={() => handleButtonApply("거절", apply)}
          >
            거절
          </button>
        </td>
      </tr>
    ));
  };

  // 퀵 버튼 렌더링
  const renderQuickButton = () => {
    return buttons.filter((button) =>
        checkPostWriter(userNickname)
          ? [BACK_BUTTON, EDIT_BUTTON, DELETE_BUTTON, APPLICANT_LIST_BUTTON, BAN_BUTTON].includes(button.id)
          : [BACK_BUTTON, CHECK_BUTTON].includes(button.id)
      )
      .map((button) => (
        <div
          key={button.id}
          className={`image-button ${button.isHovered ? "expanded" : ""}`}
          onMouseEnter={() => handleMouseEnter(button.id)}
          onMouseLeave={() => handleMouseLeave(button.id)}
        >
          <div className="button-content flex">
            <FontAwesomeIcon
              icon={button.icon}
              className="w-[1.5rem] h-[1.5rem]"
            />
            <Link
              to={button.to}
              state={{
                info: { info: info, orderCategory: orderCategory },
              }}
              className={`text-${
                button.isHovered ? "dark" : "secondary"
              } text-decoration-none ml-3`}
              onClick={() => handleButtonClick(button.id)}
            >
              {button.text}
            </Link>
          </div>
          {button.showModal && renderModal(button)}
        </div>
      ));
  };

  // 신청자 목록에서 수락 또는 거절 버튼 클릭시
  const handleButtonApply = async (type, apply) => {

    const data = await loadApplyList(type, apply, info);
    try {
      if (data === null || data === false || data === undefined) {
        alert("신청자 목록을 업데이트 하는데 실패하였습니다.");
      } else {
        alert("신청자 목록을 업데이트 하였습니다.");

        // 신청자 목록 업데이트
        loadEnrollList();

        // 신청자 수 업데이트 [임시 코드]
        setState({
          ...state,
          userCount: type === "수락" ? userCount + 1 : userCount,
        });
      }
    } catch (error) {
      console.error("Error updating enrollment:", error);
      alert("신청자 목록 업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className=" max-w-6xl flex flex-col mx-auto px-6 pt-6 pb-20">
      <div class="container">
        <div class="row">
          <div class="col-sm-10">
            <div className=" mt-10 font-extrabold text-4xl tracking-[-.005em] text-left">
              {postTitle}
            </div>
            <div className=" mt-8 pb-8 border-b-2 flex gap-4 items-center">
              <div className="flex items-center relative">
                <div className='w-[40px] h-[40px] p-0 mr-2 rounded-full'>
                    <AvatarCanvas size={[220,220]} position={[128,128]} circle={true} avatarItemList={avatarItemList}/>
                </div>
                <div className=" cursor-pointer text-lg font-bold">
                  {userNickname}
                </div>
              </div>
              <div className="w-[2px] h-5 bg-slate-300"></div>
              <div className="text-lg mr-[-11px]">작성일</div>
              <div className=" text-lg text-slate-700">{postDate}</div>
            </div>

            <section
              className=" text-inherit"
              style={{ boxSizing: "inherit", fontFamily: "inherit" }}
            >
              <ul className=" grid gap-y-6 grid-cols-2 mt-[60px]">
                <li className=" flex relative items-center font-bold text-xl">
                  <span className=" mr-8">모집 구분</span>
                  <ul
                    className="flex items-center gap-3 p-0 m-0"
                    style={{ gridGap: "12px" }}
                  >
                    {tags.map((field, index) => (
                      <li
                        key={index}
                        className="px-[10px] py-[6px] bg-slate-300 rounded-2xl font-bold text-sm text-center text-slate-700"
                      >
                        {field}
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="flex relative items-center font-bold text-xl">
                  <span className="mr-8">진행 방식</span>
                  <span className="">{runningType}</span>
                </li>
                <li className="flex relative items-center font-bold text-xl">
                  <span className="mr-8">모집 인원</span>
                  <span className="">
                    {userCount} / {maxUserCount}
                  </span>
                </li>
                <li className="flex relative items-center font-bold text-xl">
                  <span className="mr-8">시작 예정</span>
                  <span className="">{startDate}</span>
                </li>
                <li className="flex relative items-center font-bold text-xl">
                  <span className="mr-8">강사 연락처</span>
                  <div className=" absolute left-32 rounded-xl ">
                    <img
                      className=" cursor-pointer block h-[30px] w-[30px] mr-2 rounded-[50%] object-cover"
                      src={OpenKakao}
                      alt="openkakao"
                    />
                  </div>
                </li>
                <li className="flex relative items-center font-bold text-xl">
                  <span className="mr-8">예상 기간</span>
                  <span className="">{expectedTime} 개월</span>
                </li>
              </ul>
              <div className="flex mt-6 pl-8">
                <li className="flex relative items-center font-bold text-xl flex-1">
                  <span className="mr-8">과목</span>
                  <ul
                    className="flex items-center gap-3 p-0 m-0"
                    style={{ gridGap: "12px" }}
                  >
                    {category.map((field, index) => (
                      <li
                        key={index}
                        className="px-[10px] py-[6px] bg-slate-300 rounded-2xl font-bold text-sm text-center text-slate-700"
                      >
                        {field}
                      </li>
                    ))}
                  </ul>
                </li>
              </div>
            </section>
            {isShowApplyList
              ? rednerTutoringApplyList()
              : rednerTutoringIntro()}
          </div>
          <div class="col-sm-2">
            <div className="sticky-menu" style={{ top: `${top}px` }}>
              <div className="button-container">
                {renderQuickButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
