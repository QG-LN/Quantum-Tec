/**
 * 날짜 데이터 포맷 변경 함수
 * 만약 데이터가 날짜 형식이 아니라면 그대로 반환
 * @param data 날짜데이터
 * @returns {*|string} 포맷 변경된 날짜 데이터
 * @example 2021-06-01 -> 2021년 06월 01일
 */
export function extractData(data, format) {
  const datePattern = /^(\d{4})-(\d{2})-(\d{2})/; // 날짜 데이터 추출 패턴 설정
  const match = datePattern.exec(data); // 정규식과 매칭을 통해 날짜 데이터 추출

  // 날짜 데이터를 올바르게 추출 했을 경우 포맷 변경
  if (match) {
    if(format === null && format === undefined){
      return match[1] + "년 " + match[2] + "월 " + match[3] + "일";
    }else{
      return match[1] + format + match[2] + format + match[3];
    }
  } else {
    return data;
  }
}
