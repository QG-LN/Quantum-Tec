import {axiosRequest} from "../../../Utils/networkUtils";

let data = null;
let loadingPromise = null;

const lodaData = async(pathParam) => {
  const path = pathParam ? pathParam : "";
  try {
	const res = await axiosRequest(path, null, "POST", "json");
	data = res;
  } catch (error) {
	console.error("데이터 로딩 중 오류 발생", error);
	data = null;
  }
};

export const getData = (pathParam) => {
	// 데이터 로딩 시작
	loadingPromise = lodaData(pathParam);
	if (!loadingPromise) {
		// 데이터 로딩이 아직 시작되지 않았거나 완료되었을 경우
		return Promise.resolve(data);
	  } else {
		// 데이터 로딩 중인 경우, 로딩 완료 후 결과 반환
		return loadingPromise.then(() => data);
	  }
};