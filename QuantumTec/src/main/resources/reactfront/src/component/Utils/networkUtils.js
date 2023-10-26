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
        
        ////////////////////////////////////
        //세션변수 등록을 위한 IP주소 등록//
        ////////////////////////////////////
        if (localStorage.getItem("userIP") === null) {
            axios.get('https://geolocation-db.com/json/')
            .then((res) => {
                const userIP = {
                    IPv4 : res.data.IPv4,
                    city : res.data.city,
                    country_code : res.data.country_code,
                    country_name : res.data.country_name, 
                }
                //userIP를 문자열로 변환
                const userIPString = JSON.stringify(userIP);
                localStorage.setItem("userIP", userIPString);
            })
        }
        /////////////////////////////////////////////////
        //로그인이 되어있을 때 로그를 위한 세션변수 등록//
        /////////////////////////////////////////////////
        if (localStorage.getItem("userID") !== null) {
            const metadata = {
                url : `${BASE_URL}/${path}`,
                method : methodType,
                userId : localStorage.getItem("userID"),
                userIp: localStorage.getItem("userIP"),
            };
            const config = {
                method: methodType,
                url: `${BASE_URL}/user/log`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: metadata,
            };
            axios(config);
        }
        

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