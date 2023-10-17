import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS 로드
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JavaScript 로드
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // DatePicker CSS 로드

export default function TutorInsertPage() {
  const [inputboardName, setInputboardName] = useState("");                 //게시물 제목
  const [inputusername, setInputusername] = useState("");                   //작성자 이름
  const [inputtutortype, setInputtutortype] = useState("");                 //모집 구분
  const [inputtutorrecruit, setInputtutorrecruit] = useState("");           //모집 인원
  const [inputtutorstart, setInputtutorstart] = useState(new Date());       //모집 시작일
  const [inputtutorcontact, setInputtutorcontact] = useState("");           //연락처
  const [inputduration, setInputduration] = useState("");                   //예상 기간
  const [inputfield, setInputfield] = useState("");                         //모집 분야
  const [inputtutorsubject, setInputtutorsubject] = useState("");           //과목
  const [inputtutorintro, setInputtutorintro] = useState("");               //튜터링 소개
  const [inputtutorcontent, setInputtutorcontent] = useState("");           //튜터링 내용

  // 튜터링 게시글 정보를 Link를 통해 전달 받음
  const location = useLocation();
  const subjectsList = location.state ? location.state.subject : [];    // Link로 접근한 것이 아닐 경우 null값 부여
  const tagsList = location.state ? location.state.tag : [];    // Link로 접근한 것이 아닐 경우 null값 부여


  // 모집 구분 모달 관련 state
  const [selectedTutorType, setSelectedTutorType] = useState("");
  const [addTutorType, setAddTutorType] = useState(new Set());

  // 과목 선택 모달 관련 state
  const [selectedSubject, setSelectedSubject] = useState("");
  const [addsubject, setAddsubject] = useState(new Set());

    //라디오 버튼 부분 [진행 방식 (온라인/오프라인))]
    const [inputtutoronline, setInputTutorOnline] = useState(true);

  const navigate = useNavigate();       // 페이지 이동을 위한 navigate 객체

  // input data 초기화 함수
  const initInput = () => {
    setInputboardName("");
    setInputusername("");
    setInputtutortype("");
    setInputtutorrecruit("");
    setInputtutorstart("");
    setInputtutorcontact("");
    setInputduration("");
    setInputfield("");
    setInputtutorsubject("");
    setInputtutorintro("");
    setInputtutorcontent("");
  };

  // 처음 로드 시에만 실행
  useEffect(() => {
    initInput();
  }, []);

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputboardName = (e) => {
    setInputboardName(e.currentTarget.value);
  };
  const handleInputusername = (e) => {
    setInputusername(e.currentTarget.value);
  };
  const handleInputtutortype = (e) => {
    setInputtutortype(e.currentTarget.value);
  };
  const handleInputtutorrecruit = (e) => {
    setInputtutorrecruit(e.currentTarget.value);
  };
  const handleInputtutorstart = (date) => {
    setInputtutorstart(date);
  };
  const handleInputtutorcontact = (e) => {
    setInputtutorcontact(e.currentTarget.value);
  };
  const handleInputduration = (e) => {
    setInputduration(e.currentTarget.value);
  };
  const handleInputfield = (e) => {
    setInputfield(e.currentTarget.value);
  };
  const handleInputtutorsubject = (e) => {
    setInputtutorsubject(e.currentTarget.value);
  };
  const handleInputtutorintro = (e) => {
    setInputtutorintro(e.currentTarget.value);
  };
  const handleInputtutorcontent = (e) => {
    setInputtutorcontent(e.currentTarget.value);
  };

  // 게시글 작성 버튼 클릭시 실행할 함수
  const handleSubmit = () => {

  };

  const handleOnlineChange = () => {
    setInputTutorOnline(true);
  };

  const handleOfflineChange = () => {
    setInputTutorOnline(false);
  };

  const OnClickCancel = () => {
    // 취소 버튼 클릭시 튜터링 메인 페이지로 이동
    navigate("/tutoring")
  };

/**
 * Set에 value 추가 또는 제거 후 문자열로 변환하여 반환
 * @param {Set} currentSet  현재 Set
 * @param {*} value       추가 또는 제거할 값
 * @param {function} setFunction Set을 변경할 함수
 * @returns 문자열로 변환된 Set 값을 , 로 구분하여 반환
 */
const updateListSet = (currentSet, value, setFunction) => {
  const newSet = new Set(currentSet);

  if (newSet.has(value)) {
    newSet.delete(value); // 이미 존재하면 제거
  } else {
    newSet.add(value); // 존재하지 않으면 추가
  }

  setFunction(newSet);
  return [...newSet].join(", ");
};

  // 모집 분야 선택 모달에서 항목 클릭시 실행할 함수
  const handelAddCategory = (category) => {
    setSelectedTutorType(updateListSet(addTutorType, category, setAddTutorType));
  }

  // 모집 구분 선택 모달에서 항목 클릭시 실행할 함수
  const handleAddTag = (tag) => {
    setSelectedSubject(updateListSet(addsubject, tag, setAddsubject));
  }


  /**
   * 모달 렌더링 함수 (모달의 title, list, handler를 인자로 받아 모달을 렌더링)
   * @param {string} title 모달의 제목
   * @param {Array<string>} list 모달에 표시할 목록
   * @param {function} handler 목록 클릭시 실행할 함수
   * @param {string} showId 모달의 id
   * @todo 이미 선택된 항목은 구별할 수 있도록 스타일링
   */
  const renderModal = (title, list, handler, showId) =>{
    return (
      <div
        className="modal fade"
        id={showId}
        tabIndex="-1"
        aria-labelledby={showId + "Label"}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={showId + "Label"}>
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="닫기"
              ></button>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                {list.map((value) => (
                  <li
                    key={value}
                    className="list-group-item"
                    onClick={() => handler(value)}
                    data-bs-dismiss="modal"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="mb-12 text-4xl font-bold ">튜터링 게시물 작성</h1>
        <div class="form-group row max-w-4xl mx-auto">
          <div className="mb-3 flex ">
            <label className="form-label w-[200px] col-2">
              게시물 제목
            </label>
            <div class='col-10'>
            <input
              type="text"
              className="form-control"
              value={inputboardName}
              onChange={handleInputboardName}
              maxLength={30}
            />
            </div>
          </div>
          <div className=" flex">
            <div className="mb-3 col-8 flex">
              <label className="form-label col-3">모집 구분</label>
              <div class='col-6'>
                <input
                type="text"
                className="form-control"
                value={selectedTutorType}
                onChange={(e) => setSelectedTutorType(e.target.value)}
                readOnly
              />
              </div>
              <div class='col-2'>
              <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#tutorTypeModal">
                선택
              </button>
              </div>
            </div>
            <div class='col-4 flex'>
            <label className="form-label col ml-[-45px] mr-6">진행 방식</label>
            <div className="form-check form-check-inline col">
              <input
                className="form-check-input "
                type="radio"
                name="onlineOffline"
                id="online"
                value="online"
                checked={inputtutoronline}
                onChange={handleOnlineChange}
              />
              <label className="form-check-label text-sm" htmlFor="online">
                온라인
              </label>
            </div>
            <div className="form-check form-check-inline col">
              <input
                className="form-check-input"
                type="radio"
                name="onlineOffline"
                id="offline"
                value="offline"
                checked={!inputtutoronline}
                onChange={handleOfflineChange}
              />
              <label className="form-check-label text-sm" htmlFor="offline">
                오프라인
              </label>
            </div>
            </div>
          </div>
          <div className="flex">
            <div className="mb-3 flex col-8">
              <label className="form-label col-3">연락처</label>
              <div class='col-8 pr-5 '>
              <input
                type="text"
                className="form-control"
                value={inputtutorcontact}
                onChange={handleInputtutorcontact}
                placeholder="카카오톡 오픈채팅방 링크"
                style={{ fontSize: "0.8rem" }}
              />
              </div>
            </div>
            <div className="mb-3 flex col-5 ml-[-75px]">
              <label className="form-label col-4">시작일</label>
              <div class='col-8'>
              <DatePicker
                selected={inputtutorstart}
                onChange={handleInputtutorstart}
                className="form-control"
                dateFormat="yyyy년 MM월 dd일" // 년 월 일 형식으로 지정
              />
            </div>
            </div>
          </div>
          <div className=" text-sm text-gray-500 mr-auto relative left-[-174px] mb-[7px]" style={{marginTop:"-15px"}}> 예시 : https://open.kakao.com/o/</div>
          <div className="flex">
            <div className="mb-3 ml-4 flex col-6">
              <label className="form-label col-3">모집 인원</label>
              <div class='col pl-5'>
              <input
                type="text"
                className="form-control"
                placeholder="3"
                value={inputtutorrecruit}
                onChange={handleInputtutorrecruit}
              />
              </div>
            </div>
            <div className="mb-3 flex col-6">
              <label className="form-label col-3">예상 기간</label>
              <div class='col pr-4'>
              <input
                type="text"
                className="form-control"
                placeholder="3"
                value={inputduration}
                onChange={handleInputduration}
              />
              </div>
            </div>
          </div>
          <div className="mb-3 flex">
            <label className="form-label col-2">과목</label>
            <div class='col-8'>
            <input
              type="text"
              className="form-control"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              readOnly
            />
            </div>
            <div class='col-2 ml-4'>
            <button
              type="button"
              className="btn btn-primary ms-2 w-[100px]"
              data-bs-toggle="modal"
              data-bs-target="#subjectModal"
            >
              선택
            </button>
            </div>
          </div>
          <div className="mb-3 flex">
            <label className="col-2 form-label">
              튜터링 소개글
            </label>
            <div class='col-10'>
            <textarea
              className="form-control h-9"
              id="inputTutorIntro"
              style={{ resize: "none" }}
              value={inputtutorintro}
              onChange={handleInputtutorintro}
              maxLength={50}
            />
            </div>
          </div>
          <div className="mb-3 text-left">
            <label className="form-label ml-[30px] w-[200px]">
              튜터링 내용
            </label>
            <textarea
              className="form-control h-[300px]"
              id="inputTutorContent"
              style={{ resize: "none" }}
              value={inputtutorcontent}
              onChange={handleInputtutorcontent}
            ></textarea>
          </div>
          <div className="text-center mt-4 mb-10">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary me-12"
            >
              작성하기
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={OnClickCancel}
            >
              취소
            </button>
          </div>
        </div>
      </div>

      {/* 과목 선택 모달 */}
      {renderModal("과목", subjectsList, handleAddTag, "subjectModal")}
      {/* 모달 종료 */}

      {/* 모집 구분 선택 모달 */}
      {renderModal("모집 구분", tagsList, handelAddCategory, "tutorTypeModal")}
      {/* 모달 종료 */}
    </>
  );
}
