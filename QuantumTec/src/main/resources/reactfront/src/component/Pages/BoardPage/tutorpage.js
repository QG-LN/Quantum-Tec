import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal"; // Bootstrap Modal 추가
import Button from "react-bootstrap/Button"; // Bootstrap Button 추가
import "../../../App.css";
import { extractData } from "../../Utils/dataFormat";
//이미지
import OpenKakao from "../../../image/kakaoOpenChat.png";
import emptyuser from "../../../image/emptyuser.png";
import backpage from "../../../image/backpage.png";
import check from "../../../image/check.png";
import {
  faTrash,
  faArrowLeft,
  faCheck,
  faRepeat,
  faBan,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosRequest } from "../../Utils/networkUtils";

export default function TutorPage() {
  const [postTitle, setPostTitle] = useState("오늘은 무엇을 스터디해볼까요?");    // 튜터링 게시글 제목
  const [postIndex, setPostIndex] = useState(0);                                // 튜터링 게시글 인덱스
  const [userNickname, setUserNickname] = useState("marais");                   // 튜터링 게시글 작성자 닉네임
  const [tags, setTags] = useState([]);                                         // 튜터링 태그
  const [postDate, setPostDate] = useState("2023.09.16");                       // 튜터링 게시글 작성 날짜
  const [runningType, setRunningType] = useState("");                           // 튜터링 진행 방식
  const [maxUserCount, setMaxUserCount] = useState(0);                          // 최대 신청 가능 인원
  const [userCount, setUserCount] = useState(0);                                // 현재 신청한 인원
  const [startDate, setStartDate] = useState("");                               // 튜터링 시작 날짜
  const [studyLink, setStudyLink] = useState("https://open.kakao.com/o/");      // 튜터링 링크
  const [expectedTime, setExpectedTime] = useState(0);                          // 예상 기간
  const [category, setCategory] = useState([]);                                 // 튜터링 카테고리
  const [postIntro, setPostIntro] = useState("");                               // 튜터링 소개
  const [postContent, setPostContent] = useState("");                           // 튜터링 내용

  const [applyList, setApplyList] = useState([]);                               // 튜터링 신청자 목록
  const [isShowApplyList, setIsShowApplyList] = useState(false);                // 튜터링 신청자 목록 보여주기 여부

  const [enroll, setEnroll] = useState("");                                     // 튜터링 신청 상태 [신청 / 취소 / 수락 / 거절]
  const [isEnrollButtonDisabled, setIsEnrollButtonDisabled] = useState(Array(applyList.length).fill(false));   // 튜터링 신청 버튼 활성화 여부

  const [postState, setPostState] = useState(false);                            // 튜터링 게시글 상태 [ false -> 모집완료 / 모집 중단 true -> 모집 중]

  const naviagte = useNavigate();

  let userimg = "";

  // 튜터링 게시글 정보를 Link를 통해 전달 받음
  const location = useLocation();
  const info = location.state ? location.state.info.info : null; // Link로 접근한 것이 아닐 경우 null값 부여
  const orderCategory = location.state
    ? location.state.info.orderCategory
    : null; // Link로 접근한 것이 아닐 경우 null값 부여


  const [buttons, setButtons] = useState([
    {
      id: 1,
      text: "뒤로가기",
      to: "/tutoring",
      image: backpage,
      isHovered: false,
      icon: faArrowLeft,
    },
    {
      id: 2,
      text: "수정하기",
      to: "",
      info: info,
      showModal: false,
      image: check,
      isHovered: false,
      icon: faRepeat,
    },
    {
      id: 3,
      text: "삭제하기",
      showModal: false,
      image: "image3.jpg",
      isHovered: false,
      icon: faTrash,
      comment: "정말로 삭제하시겠습니까??",
      buttonOK: {
        title: "삭제하기",
        event: () => {
          confirmModal("delete");
        },
      },
    },
    {
      id: 4,
      text: "",
      showModal: false,
      image: check,
      isHovered: false,
      icon: faCheck,
      comment: "??",
      buttonOK: {
        title: "",
        event: () => {
          confirmModal("insert");
        },
      },
    },
    {
      id: 5,
      text: "신청자 목록",
      isHovered: false,
      icon: faCheck,
    },
    {
      id: 6,
      text: "모집 중지",
      isHovered: false,
      icon: faBan,
    }
  ]);

  /**
   * 이벤트가 없는 빈 버튼으로 초기화
   * @param {*} id 버튼 인덱스
   * @param {*} title 버튼 텍스트
   * @param {*} newIcon 변경할 버튼의 새 아이콘
   */
  const initButtonEvent = (id, title, newIcon) => {
    setButtons(
      buttons.map((button) => {
        if(button.id === id){
          return {
            ...button,
            text: title,
            icon: newIcon,
            buttonOK: undefined,
          }
        }else{
          return button;
        }
      })
    )
  }

  useEffect(() => {
    // 튜터링 게시글 정보가 존재할 경우 상태를 업데이트
    if (info === null) {
      return null;
    } else {
      setPostTitle(info.postTitle);
      setUserNickname(info.userNickname);
      setPostDate(extractData(info.postDate));
      setMaxUserCount(info.maxUserCount);
      setUserCount(info.userCount);
      setCategory(info.category);
      setTags(info.tags);
      setExpectedTime(info.expectedTime);
      setPostIntro(info.postIntro);
      setPostContent(info.postContent);
      setRunningType(info.runningType ? "온라인" : "오프라인");
      setStudyLink(info.link);
      setExpectedTime(info.expectedTime);
      setStartDate(extractData(info.startDate));
      setPostState(info.postState);

      buttons[1].to = `/tutoringPost/${info.postIndex}/edit`;

      // 튜터링 신청자 목록 불러오기
      if (checkPostWriter(info.userNickname)) {
        loadEnrollList();
      }else{
        // 튜터링 신청 여부 확인
        checkEnroll();
      }
    }
  }, []);

  //튜터링 신청 여부에 따른 버튼 변경
  useEffect(() => {
    console.log(enroll);
    if(userCount === maxUserCount){
      initButtonEvent(4,"모집 완료",faCheck);
    }else if(enroll === "수락" || enroll === "거절"){
      initButtonEvent(4,enroll==="수락"? "신청수락" : "신청거절",faCheck);
    }else{
      setButtons(
        buttons.map((button) =>{
          if(button.id === 4){
            return {
              ...button,
              text: enroll === "신청" ? "신청취소" : "신청하기",
              comment: enroll === "신청"
              ? "정말로 신청을 취소하시겠습니까?"
              : "정말로 신청하시겠습니까?",
              buttonOK: {
                title: enroll === "신청" ? "신청 취소하기" : "신청하기",
                event: () => {
                  confirmModal("update");
                },
              },
            }
          }else{
            return button;
          }
        })
      )
    }
  }, [enroll]);

  //튜터링 게시글 상태 변동에 따른 버튼 변경
  useEffect(() => {
    if(userCount === maxUserCount){
      initButtonEvent(6,"모집 완료",faBan);
    }else{
      setButtons(
        buttons.map((button) =>{
          if(button.id === 6){
            return {
              ...button,
              text: postState ? "모집 중지" : "모집 진행",
              comment: postState ? "정말로 모집을 중지하시겠습니까?" : "모집을 진행상태로 변경하시겠습니까?",
              icon : postState ? faBan : faUserPlus,
              buttonOK: {
                title: postState ? "모집 중지" : "모집 진행",
                event: () => {
                  confirmModal("postUpdate");
                },
              },
            }
          }else{
            return button;
          }
        })
      )
    }

  }, [postState]);

  useEffect(() => {
    console.log(isEnrollButtonDisabled)
  }, [isEnrollButtonDisabled]);

  useEffect(() => {
    if(userCount === maxUserCount){
      initButtonEvent(6,"모집 완료",faBan);
    }
  },[userCount]);
  
  // 게시글 작성자와 로그인한 유저가 같은지 확인
  const checkPostWriter = useCallback((nickName) => {
    if (nickName === localStorage.getItem("userNickname")) {
      return true;
    } else {
      return false;
    }
  }, [userNickname]);  
  

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
      setIsEnrollButtonDisabled(Array.from({ length: data.length }, (_, index) => data[index].enrollState !== '신청'));
    }
  };

  // 신청 여부 확인
  const checkEnroll = async () => {
    const path = "board/checkTutoringEnroll";
    const body = {
      postTutoringIndex: info.postIndex,
      userID: localStorage.getItem("userID"),
    };

    const data = await axiosRequest(path, body, "POST", "json");
    if(data === null || data === undefined){
      setEnroll("신청"); 
    }else{
      setEnroll(data);
    }
  };

  // userimg가 비어있으면 emptyuser를 넣고 아니면 userimg를 넣는다.
  if (userimg === "") {
    userimg = emptyuser;
  }

  const customModalStyles = {
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
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
    if (id === 5) {
      setIsShowApplyList(!isShowApplyList); // 신청자 목록 활성화 여부
      buttons[4].text = isShowApplyList ? "신청자 목록" : "튜터링 소개"; // 버튼 텍스트 변경
      return;
    }

    // 버튼 클릭하면 모달을 열도록 설정
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id ? { ...button, showModal: true } : button
      )
    );
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
    if(data === null || data === false || data === undefined){
      alert("모집 상태 변경 실패");
    }else if(data){
      alert("모집 상태 변경 성공");
      // naviagte("/tutoring");
      setPostState(!postState);
    }
  }

  /**
   * 신청 정보를 변경하기 위해 서버에 요청하는 함수
   * @param {String} type 서버에 요청할 신청 정보[내가 원하는 상태를 전달]
   */
  const updateTutoringEnroll = async (type) => {
    const path = "board/updateTutoringEnroll";
    const body = {
      postTutoringIndex: info.postIndex,
      userNickname : localStorage.getItem("userNickname"),
      userID: localStorage.getItem("userID"),
      enrollState: type,
    };
    const data = await axiosRequest(path, body, "POST", "boolean");
    if (data === null || data === false || data === undefined) {
      alert("수정 실패");
    } else{
      alert("수정 성공");
      setEnroll(enroll === "신청" ? "취소" : "신청");
    }
  };

  // 모달창 - 확인버튼
  const confirmModal = (type) => {
    switch (type) {
      case "update":
        updateTutoringEnroll(enroll === "신청" ? "취소" : "신청");
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
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id !== 0 ? { ...button, showModal: false } : button
      )
    );
  };

  //모달창-닫기버튼
  const closeModal = () => {
    // 모달 닫기
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id !== 0 ? { ...button, showModal: false } : button
      )
    );
  };

  const renderModal = (button) => {
    if (button.buttonOK === undefined) {
      return null;
    }
    return (
      <Modal
        show={true}
        onHide={closeModal}
        style={customModalStyles}
        contentLabel="Example Modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {button.text === undefined ? "Example Modal" : button.text}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{button.comment}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={button.buttonOK.event}>
            {button.text}
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            취소하기
          </Button>
        </Modal.Footer>
      </Modal>
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
            <tbody>{renderApplyList()}</tbody>
          </table>
        </div>
      </div>
    );
  };

  // 튜터링 신청자 목록 렌더링
  const renderApplyList = () => {
    return applyList.map((apply, index) => (
      <tr key={index} style={{ cursor: "pointer" }}>
        <td className="text-center" style={{ lineHeight: "2" }}>{index+1}</td>
        <td className="text-center" style={{ lineHeight: "2" }}>{apply.userNickname}</td>
        <td className="text-center" style={{ lineHeight: "2" }}>{extractData(apply.enrollCreatedAt)}</td>
        <td className="text-center" style={{ lineHeight: "2" }}>{apply.enrollState}</td>
        <td className="text-center" >
          <button className="btn btn-primary mr-2" disabled={isEnrollButtonDisabled[index]}
            onClick={()=>handleButtonApply('수락',apply)}>
            수락
          </button>
          <button className="btn btn-danger" disabled={isEnrollButtonDisabled[index]}
            onClick={()=>handleButtonApply('거절',apply)}>
            거절
          </button>
        </td>
      </tr>
    ));
  };

  // 신청자 목록에서 수락 또는 거절 버튼 클릭시
  const handleButtonApply = async (type,apply) => {
    const path = "board/updateTutoringEnroll";
    const body ={
      postTutoringIndex: info.postIndex,
      userNickname: apply.userNickname,
      enrollState: type,
      tutoringLink: info.link,
      userEmail: apply.userEmail
    }

    const data = await axiosRequest(path, body, "POST", "boolean");
    try {
      if (data === null || data === false || data === undefined) {
        alert("신청자 목록을 업데이트 하는데 실패하였습니다.");
      } else {
        alert("신청자 목록을 업데이트 하였습니다.");
        
        // 신청자 목록 업데이트
        loadEnrollList();

        // 신청자 수 업데이트 [임시 코드]
        setUserCount(type === '수락' ? userCount+1 : userCount);
      }
    } catch (error) {
      console.error("Error updating enrollment:", error);
      alert("신청자 목록 업데이트 중 오류가 발생했습니다.");
    }
  }

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
                <img
                  className=" cursor-pointer block h-12 w-[3rem] mr-2 rounded-[50%] object-cover"
                  src={userimg}
                  alt="userImg"
                />
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
                {buttons
                  .filter((button) =>
                    checkPostWriter(userNickname)
                      ? [1, 2, 3, 5,6].includes(button.id)
                      : [1, 4].includes(button.id)
                  )
                  .map((button) => (
                    <div
                      key={button.id}
                      className={`image-button ${
                        button.isHovered ? "expanded" : ""
                      }`}
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
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
