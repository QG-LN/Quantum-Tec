import { PureComponent, useState} from 'react';
import { BarChart, LineChart, Bar, XAxis, YAxis, Line } from "recharts";
export default function MyMain({select, setSelect}){
  //유저 닉네임 가져오기
  let usernickname = localStorage.getItem("usernickname");
  //유저 만들어진 날짜 가져오기
  let userdate = localStorage.getItem("userdate");
  

  //유저 닉네임 더미데이터
  usernickname = "Example";
  //유저 만들어진 날짜 더미이터
  userdate = "0000/00/00";

  //차트 데이터 셋
    const data = [
        {name: "부서 1",
          num: 5},
        {name: "부서 2",
          num: 3},
        {name: "부서 3",
          num: 1},
        {name: "부서 4",
          num: 2},
        {name: "부서 5",
            num: 4},
        {name: "부서 6",
          num: 2}
      ];
      
      
      
      // 아바타 이미지 클릭시 아바타 설정 페이지로 이동
      const ClickAvatar = () => {
        setSelect('사용자설정');
        console.log('사용자설정');
      }


    return(
        <div class='mypagestyle float-right w-mypagesection max-w-[880px] relative min-w-[700px]'>
                    <h2 class='account_main_page_title '>마이페이지</h2>
                    <div class=' mt-[20px]'>
                        <div className='flex flex-col relative justify-center h-[158px] rounded-2xl bg-gray-800 box-border  pt-[22px] pr-[30px] pb-[22px] pl-[160px]'>
                          <span className=' absolute left-[28px] top-[50%] w-[100px] h-[100px] translate-y-[-50%]'>
                            <a onClick={ClickAvatar} className='bg-white block w-full h-full'><img src='#' alt='아바타 이미지'/></a>
                          </span>
                          <div className='block text-white text-left mt-3'><div className=' text-xl'>{usernickname}</div><div className='mt-2'>Since . {userdate}</div></div>
                          <div>나의 캐쉬</div>


                        </div>
                        <div name='dashboard' class='flex justify-start flex-wrap mt-3'>
                          <div name='dashboard_left' class=' w-[50%] box-border pr-[10px] block float-left'>
                            <div class='chartstyle pt-[25px] pl-[29px] pb-[25px] pr-[29px] border relative rounded-[10px] border-box shadow-md'>
                                <h3>최근 플레이 게임</h3>
                                <BarChart width={350} height={200} data={data}>
                                    <Bar dataKey="num" fill="#8884d8" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                </BarChart>
                            </div>
                          </div>
                          <div name='dashboard_right' class='w-[50%] box-border pl-[10px] float-left block'>
                              <div class='chartstyle pt-[25px] pl-[29px] pb-[25px] pr-[29px] border relative rounded-[10px] border-box shadow-md'>
                                  <h3>플레이 시간</h3>
                                  <LineChart width={350} height={200} data={data}>
                                      <Bar dataKey="num" fill="#8884d8" />
                                      <XAxis dataKey="name" />
                                      <YAxis />
                                      <Line type="monotone" dataKey="num" stroke="#8884d8" />
                                      <Line type="monotone" dataKey="name" stroke="#8884d8" />
                                  </LineChart>
                              </div>
                          </div>
                        </div>
                    </div>
        </div>
    )
}