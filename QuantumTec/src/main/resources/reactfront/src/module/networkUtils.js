import axios from 'axios';

const BASE_URL = 'http://localhost:9090';

/**
 * json 데이터를 전달 받아  요청처리
 * @param path  데이터 전송 경로
 * @param body  전송 데이터
 * @param methodType post/get
 * @param returnType 반환 형식
 * @return {Promise<*|null>}
 */
export async function axiosRequest(path, body, methodType, returnType) {
    returnType = returnType === undefined ? 'json' : returnType;
    let data = '';  

    try {
        const config = {
            method: methodType,
            url: `${BASE_URL}/${path}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: body,
        };
        // response 객체가 반환될때까지 기다린후 데이터가 전달되면 json 데이터를 반환
        const response = await axios(config);

        switch (returnType){
            case "boolean":
            case "list":
            case "json":
                data = response.data;
                break;
            case "string" :
                data = response.data.toString();
                break;
            case "array":
                data = Array.isArray(response.data) ? response.data : [];
                break;
            default:
                data = response.data;
                break;
        }
        
        return data !== null && data !== undefined ? data : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}