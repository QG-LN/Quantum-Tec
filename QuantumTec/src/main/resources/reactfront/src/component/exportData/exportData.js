import React, { useRef } from "react";
import { CSVLink } from "react-csv";

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
   * 현재 날짜를 반환하는 함수
   * @returns 
   */
  function getNowData(){
    const date = new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');
    return date;
  };

  return (
    <div>
      <button onClick={handleDownload}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
      >
        {title}
      </button>
      <CSVLink
        data={data}
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
