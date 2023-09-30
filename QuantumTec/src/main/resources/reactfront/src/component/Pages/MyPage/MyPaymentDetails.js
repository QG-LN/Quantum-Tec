import React, { useState } from "react";
import { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import {axiosRequest} from '../../Utils/networkUtils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import { extractData } from "../../Utils/dataFormat";


/**
 * @todo 결제 내역 페이징 처리 및 검색 기능 + 정렬 기능 + 아이콘 튤팁 추가
 */
export default function MyPaymentDetails() {
  const [data, setData] = useState([]);
  const [isState, setState] = useState("isMonthly");

  const [paymentPosts, setpaymentPosts] = useState([]);   // 결제 내역들
  const [currentPage, setCurrentPage] = useState(1);      // 현재 페이지
  const [startPageNum, setStartPageNum] = useState(1);    // 시작 페이지
  const [postCount, setPostCount] = useState(0);          // 게시글 수
  const [itemMaxCount, setItemMaxCount] = useState(0);    // 페이지당 최대 게시글 수

  const [searchKeyword, setSearchKeyword] = useState(''); // 검색어		[타입1]
  const [searchKeyword2, setSearchKeyword2] = useState(''); // 검색어 	[타입2]

  
    useEffect(() => {
      getPaymentPosts();
    }, [currentPage, searchKeyword]);

  const getPaymentPosts = async () => {
    const path = 'user/payment/history';
    const body = {
      userID: localStorage.getItem('userID'),
      currentPage: currentPage,
	  searchKeyword: searchKeyword
    };
    const data = await axiosRequest(path,body,'POST','json');
    setpaymentPosts(data.paymentHistoryList);
    setPostCount(data.paymentHistoryCount);
    setItemMaxCount(data.itemMaxCount);
	console.log(data);
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
   * 결제 상태에 따라서 텍스트 색상을 변경하는 함수
   * @param {string} status 결제 상태를 나타내는 문자열 
   * @returns <span>태그를 반환하는 함수
   */
  const changePaymentStatusText = (status) => {
    switch(status){
      case "결제 완료":
        return <span class='text-primary'>{status}</span>; 
      case "결제 취소":
        return <span class='text-danger'>{status}</span>;
      case "결제 환불":
        return <span class='text-warning'>{status}</span>;
      default:
        return <span class='text-primary'>{status}</span>
    }
  }

  // 검색어 입력 시 호출되는 함수
  const handleSeraechKeyword = (e) => {
	setSearchKeyword(e.target.value);
	// setSearchKeyword2(e.target.value);
  }

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = () => {
	setSearchKeyword2('');
	getPaymentPosts();
  }

  //////////////////////////////////////////// 페이징 처리 ////////////////////////////////////////////
  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    if(pageNumber === currentPage) return;      // 현재 페이지와 같은 페이지를 클릭했을 경우 아무것도 하지 않음
    setpaymentPosts([]);                        // 게시글 목록 초기화
    setCurrentPage(pageNumber);                 // 현재 페이지 변경
  }
  // 페이지 다운 버튼 클릭 시 호출되는 함수
  const handlePageDown = () => {
      setpaymentPosts([]);
      let page = Math.floor((currentPage-1) / itemMaxCount) * 10;
      setStartPageNum(page);
      setCurrentPage(page);
  }
  // 페이지 업 버튼 클릭 시 호출되는 함수
  const handlePageUp = () => {
      setpaymentPosts([]);
      let page = Math.floor((currentPage-1) / itemMaxCount + 1) * 10 + 1;
      setStartPageNum(page);
      setCurrentPage(page);
  }

  //////////////////////////////////////////// 렌더링 ////////////////////////////////////////////
  /**
   * @todo 결제 일자 포맷변경 및 페이징 처리 추가 필요
   */
  const renderPaymentPosts = () => {
    return paymentPosts.map((paymentHistory, index) => (
      <tr key={index} style={{cursor:'pointer'}}>
        <td>{paymentHistory.paymentIndex}</td>
        <td>{paymentHistory.paymentDesc} [{paymentHistory.paymentAmount}]</td>
        <td>{extractData(paymentHistory.paymentDate)}</td>
        <td>{paymentHistory.paymentType}</td>
        <td>{changePaymentStatusText(paymentHistory.paymentStatus)}</td>
      </tr>
    ));
  };

  // 1번 타입
  const renderPaymentSearch = () => {
    return (
		<input type="text" class="form-control" id="inputSearch" 
				placeholder="검색어"
				value={searchKeyword}
				onChange={handleSeraechKeyword}/>
    )
  }
  // 2번 타입
  const renderPaymentSearch2 = () => {
	return (
		<div className="row justify-content-center">
		  <div class="col-auto">
			<input type="text" class="form-control" id="inputSearch" 
					placeholder="검색어"
				  	value={searchKeyword2}
					onChange={handleSeraechKeyword}/>
		  </div>
		  <div class="col-auto">
			<button type="submit" class="btn btn-success mb-3"
						onClick={handleSearch}>
			  검색
			</button>
		  </div>
		</div>
	  )
  }

  return (
    <div class="mypagestyle float-right w-mypagesection max-w-[880px] relative min-w-[700px]">
      <h2 class="account_main_page_title ">결제 내역</h2>
	  <div class="mt-4 mb-4 w-[30%] float-right">
		{renderPaymentSearch()}
      </div>    
      <table className="table table-striped mt-0 pt-0 table-hover user-select-none">
          <thead>
            <tr class='border-top'>
              <th className="w-[10%]">결제번호</th>
              <th className="w-[45%]">결제내역</th>
              <th className="w-[20%]">결제일자</th>
              <th className="w-[15%]">
                결제유형 <FontAwesomeIcon icon={faCircleQuestion} style={{color: "#8f8f8f"}}/>
              </th>
              <th className="w-[10%]">결제상태</th>
            </tr>
          </thead>
          <tbody>{renderPaymentPosts()}</tbody>
        </table>
        <nav aria-label="Page navigation example mb-5"> 
          {/* <div class="mt-4">
              {renderPaymentSearch2()}
          </div>     */}
          <ul className="pagination nav justify-content-center mb-10">
            {startPageNum !== 1 && 
              <li key="<" className="page-item nav-item">
                <button className="page-link nav-item" onClick={() => handlePageDown()}>
                  {"<"}
                </button>
              </li>
            }
            {/* 페이징 처리를 위한 컴포넌트 추가 */}
            {Array.from({ length: Math.min(10, Math.ceil(postCount/ itemMaxCount) - startPageNum + 1) }, (_, i) => startPageNum + i).map(pageNumber => (
              <li key={pageNumber} className={`page-item nav-item ${pageNumber === currentPage ? 'active' : ''}`}>
                <button className="page-link nav-item" onClick={() => handlePageChange(pageNumber)}>
                  {pageNumber}
                </button>
              </li>
            ))}
            {Math.ceil(postCount / itemMaxCount) > Math.floor((currentPage-1) / itemMaxCount + 1) * 10 &&
              <li key=">" className="page-item nav-item">
                <button className="page-link nav-item" onClick={() => handlePageUp()}>
                  {">"}
                </button>
              </li>
            }
          </ul>
        </nav>
    </div>
  );
}
