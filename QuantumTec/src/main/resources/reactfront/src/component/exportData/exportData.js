import React, { useRef } from "react";
import { CSVLink } from "react-csv";
import Papa from "papaparse";

/**
 * 버튼명, 파일명, 데이터, 헤더를 받아서 엑셀 파일을 다운로드한다.
 * @param {} param0 title:버튼명 fileName : 파일명, data : 데이터, header : 헤더
 * @returns  엑셀 파일 다운로드 컴포넌트
 */
function ExportDataToExcelButton({ title,fileName , data , header}) {
  const csvLink = useRef();

  const handleDownload = () => {
    csvLink.current.link.click();
  };

  /**
   * 현재 날짜 데이터를 반환하는 함수
   * @returns 2021-08-31-오후-01-00-00 형식의 날짜
   * @example getNowData() -> 2021-08-31-오후-01-00-00
   */
  function getNowData(){
    const now = new Date();
    const ampm = now.getHours() < 12 ? '오전' : '오후';
    const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const date = new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');

    return `${date}-${ampm}-${hours}-${minutes}-${seconds}`;
  };

  // JSON 데이터를 CSV로 변환
  const csvData = Papa.unparse(data);

  return (
    <div>
      <button onClick={handleDownload}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
      >
        {title}
      </button>
      <CSVLink
        data={csvData}
        headers={header}
        filename={fileName + "[" + getNowData() + "].csv"}
        className="hidden"
        ref={csvLink}
        target="_blank"
      />
    </div>
  );
}

export default ExportDataToExcelButton;
