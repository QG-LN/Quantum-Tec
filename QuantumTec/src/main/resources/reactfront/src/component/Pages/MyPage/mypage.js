import {useState} from 'react';
import Chart from './chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProgressBar from './myprogress.js';

export default function MyMain({select, setSelect}){
  //유저 닉네임 가져오기
  let usernickname = localStorage.getItem("usernickname");
  //유저 무료캐시 가져오기
  let userFreeCash = localStorage.getItem("userFreeCash");
  //유저 유료캐시 가져오기
  let userCash = localStorage.getItem("userCash");
  //유저 가진 게임 수 가져오기
  let userGameNum = localStorage.getItem("userGameNum");
  //유저 플레이한 게임 수 가져오기
  let userPlayNum = localStorage.getItem("userPlayNum");
  //유저 아바타 개수 가져오기
  let userAvatarNum = localStorage.getItem("userAvatarNum");

  //최대 게임 시간을 가진 4개의 게임 가져오기
  let gametime = ["6","5","3","4","2"];
    // Step 1: 게임 시간 값 받아오기
  let gametimeNumbers = gametime.map(Number);
  // Step 2: 가져온 값 다 합치기
  let sum = gametimeNumbers.reduce((total, num) => total + num, 0);
  // Step 3: 게임 시간 백분율 계산하기
  let percentages = gametimeNumbers.map(num => (num / sum) * 100);


  const [typeButton, setTypeButton] = useState('월별');
  const [timeButton, setTimeButton] = useState('오전/오후');
  
  //임시 게임 이미지
  const images = [
    {
      url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      alt: "Image 1",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3yuRUfWCK4tYmm8Q4pD1VW51-9Tisqhix9Q&usqp=CAU",
      alt: "Image 2",
    },
    {
      url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      alt: "Image 3",
    },
    {
        url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        alt: "Image 4",
      },
      {
        url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        alt: "Image 5",
      }
  ];
  //date time dateplaytimes timeplaytimes 값 초기화
  let date = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  let time = ['오전','오후'];
  let dateplaytimes = [5,3,1,2,4,2];
  let timeplaytimes = [5,3];

  //드롭다운 안 메뉴 버튼 클릭시
  const handleType = (e) =>
  {
    setTypeButton(e.target.text);
    console.log(e.target.text)
    //부모의 부모요소 가져오기
    e.target.parentElement.parentElement.style.display='none';
  }
  //값 넘기는 부분
  if (typeButton === '월별'){
    date = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    dateplaytimes = [5,3,1,2,4,2];
  }
  else if (typeButton === '주별'){
    date = ['1','2','3','4','5'];
    dateplaytimes = [5,3,1,2,4];
  }
  else if (typeButton === '일별'){
    date = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
    '16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
    dateplaytimes = [5,3,1,2,4,2];
  }


  if (timeButton === '1시간'){
    time = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
    timeplaytimes = [5,3,1,2,4,2,2,3,1,1,2,2,3,3,4,2];
  }
  else if (timeButton === '3시간'){
    time = ['3','6','9','12','15','18','21','24'];
    timeplaytimes = [5,3,1,2,4,2,5,7,8];
  }
  else if (timeButton === '오전/오후'){
    time = ['오전','오후'];
    timeplaytimes = [5,3];
  }
  const handleTime = (e) =>
  {
    setTimeButton(e.target.text);
    
    //부모의 부모요소 가져오기
    e.target.parentElement.parentElement.style.display='none';
  }

      // 드롭다운 메뉴 버튼 함수
      const handleDropdown = (e) => {
        const ul = e.target.nextSibling;
        if(ul.style.display === "block")
            ul.style.display = "none";
        else
            ul.style.display = "block";
    }
  //유저 닉네임 더미데이터
  usernickname = "Example";
  //유저 만들어진 무료재화 더미데이터
  userFreeCash = "10000";
  //유저 만들어진 유료재화 더미데이터
  userCash = "2000";
  //유저 가진 게임 수 더미데이터
  userGameNum = "10";
  //유저 플레이한 게임 수 더미데이터
  userPlayNum = "5";
  //유저 아바타 개수 더미데이터
  userAvatarNum = "3";
      
      
      // 아바타 이미지 클릭시 아바타 설정 페이지로 이동
      const ClickAvatar = () => {
        setSelect('사용자설정');
        console.log('사용자설정');
      }



    return (
      <div class="mypagestyle float-right w-mypagesection max-w-[880px] relative min-w-[700px]">
        <h2 class="account_main_page_title ">마이페이지</h2>
        <div class=" mt-[20px]">
          <div className="flex">
            {/* <div className="flex flex-col relative justify-center h-[158px] w-[40%] rounded-2xl bg-gray-600 box-border  pt-[22px] pr-[30px] pb-[22px] pl-[30px]">
              <span className=" absolute left-[5px] top-[50%] w-[100px] h-[100px] translate-y-[-50%]"></span>
              <div className="flex">
                <div className="block text-white text-left">
                  <div className=" text-xl">{usernickname}</div>
                  <div className="mt-2">무료 {userFreeCash}</div>
                  <div className="mt-2">유료 {userCash}</div>
                </div>
                <div className="block text-white text-left ml-10">
                  <div className="mt-1"> 가진 게임 수 : {userGameNum}</div>
                  <div className="mt-2">플레이한 게임 수 : {userPlayNum}</div>
                  <div className="mt-2">아바타 개수 {userAvatarNum}</div>
                </div>
              </div>
            </div> */}
            <div className="flex flex-col relative justify-center h-[220px] w-[100%] rounded-2xl bg-gray-600 box-border pt-[22px] pr-[30px] pb-[22px] pl-[30px]">
              <span className=" absolute left-[5px] top-[50%] w-[100px] h-[100px] translate-y-[-50%]"></span>
              <div className="flex">
                <div className="block text-white text-left mt-4">
                  <div className=" text-6xl font-bold mb-3">{userPlayNum}</div>
                  <div className="mt-2 text-2xl font-bold">플레이한 게임</div>
                  <div className="mt-2 text-lg">총 게임 : {userGameNum}</div>
                </div>
                <div className="block text-white text-left ml-6 mt-2">
                  <div class=" w-[200px]">
                    <div className="image-slider flex">
                      <fieldset class="imgButtonStyle flex">
                        <legend class="absolute overflow-hidden h-1 w-1 m-[-1px] "></legend>
                        {images.map((image, index) => (
                          <label className="hover:cursor-pointer w-[120px] h-[180px] ml-2">
                            <input
                              type="radio"
                              class="hidden"
                              name="subimg"
                              id="subimg"
                              value={index}
                            />
                            <img
                              class="max-w-none w-[120px] h-[180px] rounded-xl"
                              src={image.url}
                            ></img>
                            <div class='ml-10 p-0.5 mt-[-4%] pd-1 text-lg bg-white/60 text-black text-center absolute rounded-md '>{parseInt(percentages[index])+"%"}</div>
                          </label>
                        ))}
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div name="dashboard" class="flex justify-start flex-wrap mt-3">
            <div
              name="dashboard_left"
              class=" w-[50%] box-border pr-[10px] block float-left"
            >
              <h3 className="text-left ml-5">최근 플레이 게임</h3>
              <div class="chartstyle pt-[25px] pl-[29px] pb-[25px] pr-[29px] border relative rounded-[10px] border-box shadow-md">
                <div class="dropdown col-auto text-end">
                  <button
                    onClick={handleDropdown}
                    class="btn btn-secondary dropdown-toggle pt-0 pb-0"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {typeButton}
                  </button>
                  <ul
                    class="dropdown-menu left-[185px]"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a
                        class="dropdown-item active"
                        onClick={handleType}
                        href="#"
                      >
                        월별
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" onClick={handleType} href="#">
                        주별
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" onClick={handleType} href="#">
                        일별
                      </a>
                    </li>
                  </ul>
                </div>
                {console.log(date)}
                <Chart x={date} y={dateplaytimes} />
              </div>
            </div>
            <div
              name="dashboard_right"
              class="w-[50%] box-border pl-[10px] float-left block"
            >
              <h3 className="text-left ml-5">플레이 시간</h3>
              <div class="chartstyle pt-[25px] pl-[29px] pb-[25px] pr-[29px] border relative rounded-[10px] border-box shadow-md">
                <div class="dropdown col-auto text-end">
                  <button
                    onClick={handleDropdown}
                    class="btn btn-secondary dropdown-toggle pt-0 pb-0"
                    type="button"
                    id="dropdownMenuButton2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {timeButton}
                  </button>
                  <ul
                    class="dropdown-menu left-[185px]"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    <li>
                      <a
                        class="dropdown-item active"
                        onClick={handleTime}
                        href="#"
                      >
                        1시간
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" onClick={handleTime} href="#">
                        3시간
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" onClick={handleTime} href="#">
                        오전/오후
                      </a>
                    </li>
                  </ul>
                </div>
                <Chart x={time} y={timeplaytimes} />
              </div>
            </div>
          </div>
          <h3 className="text-left ml-5">플레이 장르</h3>
          <MyProgressBar />
        </div>
      </div>
    );
}