import React, { useState } from "react";
import { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import {axiosRequest} from '../../../module/networkUtils';

export default function MyPaymentDetails() {
  const [data, setData] = useState([]);
  const [isState, setState] = useState("isMonthly");

  const [paymentPosts, setpaymentPosts] = useState([]);   // 결제 내역들
  const [currentPage, setCurrentPage] = useState(1);      // 현재 페이지
  const [startPageNum, setStartPageNum] = useState(1);    // 시작 페이지
  const [postCount, setPostCount] = useState(0);          // 게시글 수

  const ITEMS_PER_PAGE = 10;                              // 페이지당 보여줄 게시글 수

  
  useEffect(() => {
    getPaymentPosts();
  }, []);

  const getPaymentPosts = async () => {
    const path = 'user/payment/history';
    const body = {
      userID: localStorage.getItem('userID'),
    };
    const data = await axiosRequest(path,body,'POST','json');
    setpaymentPosts(data);
  };

  //월일을 클릭 시
  useEffect(() => {
    if (isState === "isMonthly") {
      setData([
        { year: 2022, month: 1, value: 100 },
        { year: 2022, month: 2, value: 200 },
        { year: 2022, month: 3, value: 300 },
        { year: 2023, month: 1, value: 400 },
        { year: 2023, month: 2, value: 500 },
        { year: 2023, month: 3, value: 600 },
      ]);
      //년일을 클릭 시
    } else if (isState === "isYearly") {
      setData([
        { year: 2022, value: 100 },
        { year: 2023, value: 400 },
      ]);
    }
  }, [isState]);

  // 월별 데이터
  const chart = () => {
    return (
      <div class="mt-[20px]">
        <LineChart
          data={data}
          width={500}
          height={400}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line dataKey="value" />
        </LineChart>
        <button onClick={() => setState("isYearly")}>연도별로 보기</button>
      </div>
    );
  };

    /**
     * 날짜 데이터 포맷 변경 함수
     * 만약 데이터가 날짜 형식이 아니라면 그대로 반환
     * @param data 날짜데이터
     * @returns {*|string} 포맷 변경된 날짜 데이터
     * @example 2021-06-01 -> 2021년 06월 01일
     */
    const extractData = (data) => {
      const datePattern = /^(\d{4})-(\d{2})-(\d{2})/;     // 날짜 데이터 추출 패턴 설정
      const match = datePattern.exec(data);       // 정규식과 매칭을 통해 날짜 데이터 추출

      // 날짜 데이터를 올바르게 추출 했을 경우 포맷 변경
      if(match){
          return match[1] + '년 ' + match[2] + '월 ' + match[3] + '일';
      }else{
          return data;
      }
  }

  /**
   * @todo 결제 일자 포맷변경 및 페이징 처리 추가 필요
   */
  const renderPaymentPosts = () => {
    return paymentPosts.map((paymentHistory, index) => (
      <tr key={index} style={{cursor:'pointer'}}>
              <td>{paymentHistory.paymentIndex}</td>
              <td>{paymentHistory.paymentDesc}</td>
              <td>{extractData(paymentHistory.paymentDate)}</td>
              <td>{paymentHistory.paymentType}</td>
              <td class='text-primary'>{paymentHistory.paymentStatus}</td>
      </tr>
    ));
  };

  return (
    <div class="mypagestyle float-right w-mypagesection max-w-[880px] relative min-w-[700px]">
      <h2 class="account_main_page_title ">결제 내역</h2>
      <div>
        <div class='h-[50px] border bg-gray-200 m-3'>
          정렬 / 검색 영역
        </div>
      </div>
      <table className="table table-striped mt-0 pt-0 table-hover user-select-none">
          <thead>
            <tr>
              <th className="w-[10%]">번호</th>
              <th className="w-[50%]">결제내역</th>
              <th className="w-[20%]">결제일자</th>
              <th className="w-[10%]">결제유형</th>
              <th className="w-[15%]">결제상태</th>
            </tr>
          </thead>
          <tbody>{renderPaymentPosts()}</tbody>
        </table>
        <nav aria-label="Page navigation example mb-5">
                <div className="row justify-content-center">
                    <div class="dropdown col-auto">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            검색
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><span class="dropdown-item hover:cursor-pointer">제목</span></li>
                            <li><span class="dropdown-item hover:cursor-pointer">작성자</span></li>
                            <li><span class="dropdown-item hover:cursor-pointer">제목 + 작성자</span></li>
                        </ul>
                    </div>
                    <div class="col-auto">
                        <label for="inputSearch" class="visually-hidden">검색어</label>
                        <input type="text" class="form-control" id="inputSearch" placeholder="검색어"></input>
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-success mb-3">검색</button>
                    </div>
                </div>
                <ul className="pagination nav justify-content-center mb-10">
                    {startPageNum !== 1 && 
                        <li key="<" className="page-item nav-item">
                            <button className="page-link nav-item">
                                {"<"}
                            </button>
                        </li>
                    }
                    {/* 페이징 처리를 위한 컴포넌트 추가 */}
                    {Array.from({ length: Math.min(10, Math.ceil(postCount/ ITEMS_PER_PAGE) - startPageNum + 1) }, (_, i) => startPageNum + i).map(pageNumber => (
                        <li key={pageNumber} className={`page-item nav-item ${pageNumber === currentPage ? 'active' : ''}`}>
                            <button className="page-link nav-item">
                                {pageNumber}
                            </button>
                        </li>
                    ))}

                    {Math.ceil(postCount / ITEMS_PER_PAGE) > Math.floor((currentPage-1) / ITEMS_PER_PAGE + 1) * 10 &&
                        <li key=">" className="page-item nav-item">
                            <button className="page-link nav-item">
                                {">"}
                            </button>
                        </li>
                    }
                </ul>
            </nav>
    </div>
  );
}