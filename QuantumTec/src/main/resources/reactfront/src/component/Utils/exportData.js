import React, { useRef } from "react";
import { CSVLink } from "react-csv";

/**
 * 파일명, 데이터, 헤더를 받아서 엑셀 파일을 다운로드한다.
 * @param {} param0  fileName : 파일명, data : 데이터, header : 헤더
 * @returns  엑셀 파일 다운로드 컴포넌트
 */
function ExportDataToExcel({ fileName , data , header}) {
  const csvLink = useRef();

  const handleDownload = () => {
    console.log("1111111111111");
    csvLink.current.link.click();
  };

  return (
    <div>
      <button onClick={handleDownload}>
        테스트 엑셀 파일 다운로드
      </button>
      <CSVLink
        data={data}
        headers={header}
        filename={fileName + ".csv"}
        className="hidden"
        ref={csvLink}
        target="_blank"
      />
    </div>
  );
}

export default ExportDataToExcel;
