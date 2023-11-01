import { useEffect, useState } from "react";
import newIcon from "./newIcon.png";
import { extractData } from "../../Utils/dataFormat";
import { set } from "react-hook-form";

export default function Tutoringlist(props) {
  const [info, setInfo] = useState(props.info);                           // 게시글 정보
  const [index , setIndex] = useState(info.postIndex);                    // 게시글 인덱스
  const [title , setTitle] = useState(info.postTitle);                    // 게시글 제목
  const [date , setDate] = useState(info.postDate);                       // 게시글 등록일
  const [category , setCategory] = useState(info.category);               // 게시글 카테고리
  const [tag , setTag] = useState(info.tags);                             // 게시글 태그
  const [userNickname , setUserNickname] = useState(info.userNickname);   // 게시글 작성자 닉네임
  const [userIcon , setUserIcon] = useState(info.userIcon);               // 게시글 작성자 아이콘
  const [tutorCount , setTutorCount] = useState(info.userCount);          // 튜터링 인원 수
  const [tutorMaxCount , setTutorMaxCount] = useState(info.maxUserCount); // 튜터링 최대 인원 수
  const [postState , setPostState] = useState(info.postState);            // 게시글 상태


  // const id = info.postIndex;                      // 게시글 번호
  // const title = info.postTitle;                   // 게시글 제목
  // const date = info.postDate;                     // 게시글 등록일
  // const category = info.category;                 // 게시글 카테고리
  // const tag = info.tags;                          // 게시글 태그
  // const userNickname = info.userNickname;         // 게시글 작성자 닉네임
  // const userIcon = info.userIcon;                 // 게시글 작성자 아이콘
  // const tutorCount = info.userCount;              // 튜터링 인원 수
  // const tutorMaxCount = info.maxUserCount;        // 튜터링 최대 인원 수

  // 모집 인원과 현재 인원이 같을 경우 게시글 상태를 false[비활성화]로 변경
  // const postState = info.userCount === info.maxUserCount ? false : info.postState;               // 게시글 상태

  useEffect(() => {
    setInfo(props.info);
  }, []);

  useEffect(() => {
    setIndex(info.postIndex);
    setTitle(info.postTitle);
    setDate(info.postDate);
    setCategory(info.category);
    setTag(info.tags);
    setUserNickname(info.userNickname);
    setUserIcon(info.userIcon);
    setTutorCount(info.userCount);
    setTutorMaxCount(info.maxUserCount);
    // console.log(info.userCount, info.maxUserCount);
    // console.log(info.userCount === info.maxUserCount, info.postState);
    setPostState(info.userCount === info.maxUserCount ? false : info.postState);
    console.log(postState);
  }, [info]);

  //글자 제한
  const setTitleSize = (title) => {
    if (title.length > 28) {
      return title.slice(0, 28) + "...";
    } else {
      return title;
    }
  };

  // new 아이콘 활성화 체크
  /**
   * 게시글 등록일로부터 days일 이내에 등록된 게시글인지 체크
   * @param {int} days 몇일 이내에 등록된 게시글인지 체크 
   * @returns true/false
   */
  const checkNewTagEnable = (days) => {
    const today = new Date();
    const date = new Date(info.date);
    const timeValue = today.getTime() - date.getTime(); // 현재 날짜 - 게시글 등록일

    const day = 1000 * 60 * 60 * 24 * days; // 24시간

    if(timeValue < day) { // 24시간 이내에 등록된 게시글일 경우
      return true;
    }else{
      return false;
    }

  }

  const checkTagColor = (tagList) => {
    switch(tagList){
      case '실습위주':
        return `${postState ? 'bg-green-200' : 'bg-gray-200' } text-gray-500`;
      case '학습위주':
        return `${postState ? 'bg-yellow-200' : 'bg-gray-200'} text-gray-500`;
      default:
        return 'bg-green-200 text-gray-500';
    } 
  }

  // 튜터링 인원 수 랜더링
  const renderTutorCount = () => {
    return (
      <span class="my-3 text-center text-gray-400 font-bold text-base">
        {tutorCount}/{tutorMaxCount}
      </span>
    );
  };

  // new 아이콘 랜더링
  const renderNewTag = () => {
    return (
      <img
        src={newIcon}
        class="w-[40px] h-[40px]"
        alt="New"
        style={{ position: "absolute", top: "-20px", left: "-20px" }}
      />
    );
  }

  // 상단 태그 랜더링
  const renderTopTag = () => {
    return (
      <>
        {tag.slice(0, 3).map((cate, idx) => (
          <div key={idx}>
            <div
              className={`text-xs rounded-full font-bold p-1 ml-2 
              ${checkTagColor(cate)}`}
            >
              #{cate}
            </div>
          </div>
        ))}
      </>
    )
  }
  
  // 게시글별 상단 랜더링
  const renderPostTop = () => {
    return (
      <>
        {renderTopTag()}
        <div class=" absolute right-5">
          <div
            class={`h-12 bg-gray-100 border-2 ${postState ? 'border-green-400' : 'bg-gray-200'} rounded-xl justify-center items-center flex`}
            style={{ width: "3rem" }}
          >
            <span class="">N</span>
          </div>
        </div>
      </>
    )
  }


return (
    <>
      <div class={`col mb-5 hover:cursor-pointer ${postState ? '' : 'bg-gray-200'}`}>
        <div class="card shadow-sm w-[18rem]" id={props.id}>
          {checkNewTagEnable(1) && renderNewTag()}
          <div class="flex mt-3">
            {renderPostTop()}
          </div>
          <div
            class="flex ml-5 mt-2 text-gray-400"
            style={{ fontSize: "12px" }}
          >
            <p>등록일</p>
            <span class="ml-2">{extractData(date,"-")}</span>
          </div>
          <span class={`text-left font-bold h-[5rem] ml-4 mr-4 p-1 ${postState ? '' : 'text-gray-500'}`}>
            {setTitleSize(title)}
          </span>
          {renderTutorCount()}
          <div class="flex ml-5">
          {category.map((cate, idx) => (
            <div key={idx} 
                className={`text-xs rounded-full font-bold ${postState ? 'bg-green-200' : 'bg-gray-200'} text-gray-500 p-1 mr-2`}>
              #{cate}
            </div>
          ))}
          </div>
          <hr class="mx-4 text-gray-400 mb-auto" />
          <div class="card-body p-3 ml-4">
            <div class="flex row">
              <div class='col-4'>
                <img class="w-8 h-8 rounded-full" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"/>
              </div>
              <div class='col-auto'>
                <span class="id text-center">{userNickname}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
