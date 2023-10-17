import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
// import { isDisabled } from '@testing-library/user-event/dist/utils';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS 로드
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JavaScript 로드
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // DatePicker CSS 로드

const subjectsList = ["수학", "과학", "영어", "국어", "한국사"];
const tutorsList = ["스터디", "학습위주"];

export default function TutorInsertPage() {
  const [inputboardName, setInputboardName] = useState("");                 //게시물 제목
  const [inputusername, setInputusername] = useState("");                   //작성자 이름
  const [inputtutortype, setInputtutortype] = useState("");                 //모집 구분
  const [inputtutorplaying, setInputtutorplaying] = useState("");           //진행 방식
  const [inputtutorrecruit, setInputtutorrecruit] = useState("");           //모집 인원
  const [inputtutorstart, setInputtutorstart] = useState(new Date());       //모집 시작일
  const [inputtutorcontact, setInputtutorcontact] = useState("");           //연락처
  const [inputduration, setInputduration] = useState("");                   //예상 기간
  const [inputfield, setInputfield] = useState("");                         //모집 분야
  const [inputtutorsubject, setInputtutorsubject] = useState("");           //과목
  const [inputtutorintro, setInputtutorintro] = useState("");               //튜터링 소개
  const [inputtutorcontent, setInputtutorcontent] = useState("");           //튜터링 내용


  // 모집 구분 모달 관련 state
  const [selectedTutorType, setSelectedTutorType] = useState("");
  const [addTutorType, setAddTutorType] = useState(new Set());

  // 과목 선택 모달 관련 state
  const [selectedSubject, setSelectedSubject] = useState("");
  const [addsubject, setAddsubject] = useState(new Set());


  const navigate = useNavigate();       // 페이지 이동을 위한 navigate 객체

  const initInput = () => {
    setInputboardName("");
    setInputusername("");
    setInputtutortype("");
    setInputtutorplaying("");
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
  const handleInputtutorplaying = (e) => {
    setInputtutorplaying(e.currentTarget.value);
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

  const handleSubmit = () => {
    // 입력된 데이터를 서버로 전송하거나 다른 처리를 수행할 수 있습니다.
    // 예: axios.post('/api/createTutorPost', { data });
    // 성공적으로 게시물을 작성한 후에 사용자를 다른 페이지로 이동시킬 수도 있습니다.
  };

  //라디오 버튼 부분
  const [inputtutoronline, setInputTutorOnline] = useState(true);

  const handleOnlineChange = () => {
    setInputTutorOnline(true);
    setInputtutorplaying("오프라인");
    console.log(inputtutorplaying);
  };

  const handleOfflineChange = () => {
    setInputTutorOnline(false);
    setInputtutorplaying("온라인");
    console.log(inputtutorplaying);
  };

  const OnClickCancel = () => {
    // 취소 버튼 클릭시 튜터링 메인 페이지로 이동
    navigate("/tutoring")
  };

  const handleAddTutorType = (tutortype) => {
    // Set에 subject 추가
    const newSet = new Set(addTutorType);
    newSet.add(tutortype);
    setAddTutorType(newSet);

    // Set을 문자열로 변환하여 selectedSubject에 할당
    const selectedTutorTypeString = [...newSet].join(", ");
    setSelectedTutorType(selectedTutorTypeString);
  };


  const handleAddSubject = (subject) => {
    // Set에 subject 추가
    const newSet = new Set(addsubject);
    newSet.add(subject);
    setAddsubject(newSet);

    // Set을 문자열로 변환하여 selectedSubject에 할당
    const selectedSubjectString = [...newSet].join(", ");
    setSelectedSubject(selectedSubjectString);
  };

  /**
   * Set에 value 추가 후 문자열로 변환하여 반환
   * @param {*} currentSet  현재 Set
   * @param {*} value       추가할 값
   * @param {*} setFunction Set을 변경할 함수
   * @returns 문자열로 변환된 Set 값을 , 로 구분하여 반환
   */
  const updateListSet = (currentSet, value, setFunction ) => {
    const newSet = new Set(currentSet);
    newSet.add(value);
    setFunction(newSet);
    return [...newSet].join(", ");
  }

  const handelAddCategory = (category) => {
    setSelectedTutorType(updateListSet(addTutorType, category, setAddTutorType));
  }

  const handleAddTag = (tag) => {
    setSelectedSubject(updateListSet(addsubject, tag, setAddsubject));
  }


  /**
   * 모달 렌더링 함수 (모달의 title, list, handler를 인자로 받아 모달을 렌더링)
   * @param {string} title 모달의 제목
   * @param {Array<string>} list 모달에 표시할 목록
   * @param {function} handler 목록 클릭시 실행할 함수
   * @param {string} showId 모달의 id
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
                value={inputtutortype}
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
                value={inputtutortype}
                onChange={handleInputduration}
              />
              </div>
            </div>
          </div>
          <div className="mb-3 flex">
            <label className=" form-label col-2">모집 분야</label>
            <div class='col'>
            <input
              type="text"
              className="form-control"
              value={inputtutortype}
              onChange={handleInputfield}
            />
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
      {renderModal("모집 구분", tutorsList, handelAddCategory, "tutorTypeModal")}
      {/* 모달 종료 */}
    </>
  );
}
