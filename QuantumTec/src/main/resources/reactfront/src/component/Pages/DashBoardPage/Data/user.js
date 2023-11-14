// usersData.js
import {axiosRequest} from "../../../Utils/networkUtils";

let usersData = null;
let loadingPromise = null;

const loadUsersData = async () => {
  const path = "dashboard/userlist";
  try {
    const res = await axiosRequest(path, null, "POST", "json");
    usersData = res;
  } catch (error) {
    console.error("데이터 로딩 중 오류 발생", error);
    usersData = null; // 에러가 발생한 경우 null로 설정
  }
};

// 모듈이 로드될 때 자동으로 데이터 로딩 시작
loadingPromise = loadUsersData();

export const getUsersData = () => {
  if (!loadingPromise) {
    // 데이터 로딩이 아직 시작되지 않았거나 완료되었을 경우
    return Promise.resolve(usersData);
  } else {
    // 데이터 로딩 중인 경우, 로딩 완료 후 결과 반환
    return loadingPromise.then(() => usersData);
  }
};
