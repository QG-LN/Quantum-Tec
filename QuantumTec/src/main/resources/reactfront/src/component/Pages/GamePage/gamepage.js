import React, {useEffect, useRef, useState} from 'react';
import GPImage from './gpimage.js';
import GPInfo from './gpinfo.js';
import Buyplaybanner from './buyplaybanner.js';
import GPcomment from './gpcomment.js'
import {useParams} from "react-router-dom";
import axios from "axios";
import {axiosRequest} from "../../../module/networkUtils";



//추천 게임 리스트
const Relatedgame=[
  {
    Rgameimg: "https://th.bing.com/th/id/OIP.PtoZt74pQgbIgegGFJoEoQHaEK?w=299&h=180&c=7&r=0&o=5&pid=1.7",
    Rgameurl: "www.naver.com",
    Rgamename: "battlefield 1",
    Rgameprice: "59,000",
  }
]



  //초기값들
  const gameinfo = 'Season 4: Eleventh Hour에서 더 높은 곳을 향하세요. Battlefield™ 2042는 프랜차이즈의 상징인 전면전으로의 복귀를 알리는 1인칭 슈팅 게임입니다.'
  const gamegrade ='9.0 긍정적'
  const gamedate = '2021/02/14'
  const developer = 'DICE'
  const Categorylist = '액션, 슈팅, FP'

  const gamename='Battlefield™ 2042'
  const gameprice = '59,000'


export default function GamePage() {
    //구매상태 초기값
    const [buyStatus, setBuyStatus] = useState(true);                       // 구매상태를 저장할 state

    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);                // 댓글 리스트를 저장할 state
    const [categoryGameList, setCategoryGameList] = useState([]);      // 카테고리 게임 리스트를 저장할 state

    const [activeImage, setActiveImage] = useState(0);
    const [usergrade,setUserGrade] = useState('0');
    const categray_0 = '카테고리1';
    const categray_1 = '카테고리2';
    const categray_2 = '카테고리3';

    const {id, gameName} = useParams();                                                // url에서 게임번호와 이름을 가져옴

    const [userGamePlayRecentPlayDateTime, setUserGamePlayRecentPlayDateTime] = useState('');    // 유저의 최근 플레이 시간을 저장할 state
    const [userGamePlayTotalPlayTime, setUserGamePlayTotalPlayTime] = useState('');                 // 유저의 총 플레이 시간을 저장할 state

    const [developerName, setDeveloperName] = useState('');                 // 게임의 개발자를 저장할 state
    const [gameReleaseDate, setGameReleaseDate] = useState('');             // 게임의 출시일을 저장할 state
    const [gamePrice, setGamePrice] = useState(0);                          // 게임의 가격을 저장할 state
    const [gameDescription, setGameDescription] = useState('');             // 게임의 설명을 저장할 state
    const [gameImageLocation, setGameImageLocation] = useState('');         // 게임의 이미지 경로를 저장할 state
    const [gameShortDescription, setGameShortDescription] = useState('');   // 게임의 짧은 설명을 저장할 state
    const [gamePlatForm, setGamePlatForm] = useState('');                   // 게임의 플랫폼을 저장할 state
    const [gameVersionUpdateDate, setGameVersionUpdateDate] = useState(''); // 게임의 업데이트일을 저장할 state
    const [gameVersion, setGameVersion] = useState('');                     // 게임의 버전을 저장할 state
    const [gameCategoryName, setGameCategoryName] = useState('');           // 게임의 카테고리를 저장할 state
    const [gameRating, setGameRating] = useState(0);                         // 게임의 평점을 저장할 state



    const [gameMainImage, setGameMainImage] = useState('');                 // 게임의 메인 이미지를 저장할 state
    const [gameImageList, setGameImageList] = useState([]);                 // 게임의 이미지를 저장할 state
    const [gameGenre, setGameGenre] = useState([]);                         // 게임의 장르를 저장할 state


    const imagePath = 'http://localhost:9090/image/game';                      // 이미지 경로
    const imageListPath = 'http://localhost:9090/image/game/list';              // 이미지 리스트 경로
    const defaultImage = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"; // 이미지가 없을 경우 기본 이미지

    /**
     * 최초 렌더링을 제외한 렌더링에서만 실행되는 useEffect
     * 기존 useEffect와 동일하게 작동
     * */
    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);

        useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    };


    useEffect(() => {
        // 로그인이 안되어있으면 구매버튼만 출력
        let checkLogin = localStorage.getItem("truelogin");
        let userId = localStorage.getItem("userID") || "";          // 로그인이 되어있으면 userId를 가져옴
        if (checkLogin !== "true") {
            setBuyStatus(false);
        }

        const path = `http://localhost:9090/game/info?id=${id}&name=${gameName}&userId=${userId}`;
        axios.get(path)
            .then(response => {
                if (response !== null) {
                    console.log(response.data.userGamePlayTotalPlayTime);
                    // 게임 정보 저장
                    setDeveloperName(response.data.developerName);
                    setGameReleaseDate(response.data.gameReleaseDate);
                    setGamePrice(response.data.gamePrice);
                    setGameDescription(response.data.gameDescription);
                    setGameShortDescription(response.data.gameShortDescription);
                    setGameImageLocation(response.data.gameImageLocation);
                    setGamePlatForm(response.data.gamePlatForm);
                    setGameVersionUpdateDate(response.data.gameVersionUpdateDate);
                    setGameVersion(response.data.gameVersion);
                    setGameCategoryName(response.data.gameCategoryName);
                    setGameRating(response.data.gameRating.toFixed(1));

                    // 유저의 플레이 정보 저장
                    setUserGamePlayRecentPlayDateTime(response.data.userGamePlayRecentPlayDateTime);
                    setUserGamePlayTotalPlayTime(response.data.userGamePlayTotalPlayTime);
                }

            }).catch(error => {
            // 오류발생시 실행
        })

        const commentPath = 'http://localhost:9090/game/info/comment';
        const body = {
            pageNum   : 1,
            gameIndex : id,
            sortType  : "date",
            startIndex: 0,
            endIndex  : 10,
        }
        axiosRequest(commentPath, body, 'POST', 'list')
            .then(res => {
                console.log(res);
                setCommentList(res);
            })

    }, [])


    useDidMountEffect(() => {
        axios.get(imageListPath + "/games_" + gameImageLocation)
            .then(response =>  {
                setGameImageList(response.data);
            }).catch(error => {

        })
    },[gameImageLocation])

    useDidMountEffect(() => {
        const mainImagePath = `games/${gameImageLocation}/${gameImageList[0]}`.replaceAll('/','_');
        setGameMainImage(`${imagePath}/${mainImagePath}`);
    },[gameImageList])


    useDidMountEffect(() => {
        const categoryGamePath = 'http://localhost:9090/game/info/sameCategory';
        const categoryBody = {
            gameCategoryName : gameCategoryName,
            startIndex: 0,
            endIndex  : 12,
        }
        axiosRequest(categoryGamePath, categoryBody, 'POST', 'list')
            .then(res => {
                // 현재 게임을 제외한 게임들만 저장
                const data = res.filter(item => item.gameName !== gameName.replaceAll("_", " "));
                console.log(data);
                setCategoryGameList(data);                                          // 카테고리 게임 리스트 저장
            })

    },[gameCategoryName])

//평점
    const handleInputGrade = (e) => {
      setUserGrade(e.target.value);
  }

  //이미지
    const handleInputImg = (e) => {
      console.log(e.target.value);
  }
  //평가글
  const HandleSetComment = (e) => {
    setComment(e.target.value);
  }

  //만족도를 눌럿을떄 반영값
  const Clickgrade = (e) => {
    // console.log(e.target.value);
  }
  //평가를 눌럿을떄 반영
  const Clicksetgrade = (e) => {
    // console.log(comment);
    // console.log(usergrade);
    alert('평가가 등록되었습니다.')
    setComment('');
    setUserGrade('0');
  }

  // 게임 페이지로 이동하기 위한 함수
  const gameLink = (id, name) => {
        console.log(id, name);
      const gameName = name.replaceAll(" ", "_");
      window.open(`/game/${id}/${gameName}/`);
  }



    return (
        <div class='m-auto w-[1200px]'>
            <div>
                <h2 class='text-left mt-20'>{gameName.replaceAll('_',' ')}</h2>
                {/*<div class='text-left mt-2 mb-3'>{categray_0}&gt;{categray_1}&gt;{categray_2}</div>*/}
                {/*현재 카테고리가 한개이므로 한개만 설정*/}
                <div class='text-left mt-2 mb-3'>{gameCategoryName}</div>
                <div class='flex'>
                    <section class='basis-3/4 h-[535px] mr-5' >
                        <GPImage imgPath={imagePath + "/games_" + gameImageLocation}
                                 imgList={gameImageList}/>
                    </section>
                    <aside class='basis-1/4 ml-5'>
                        { gameImageList.length > 0 &&
                            <GPInfo gameinfo={gameShortDescription}
                                    gamegrade={gameRating}
                                    gamedate={gameReleaseDate}
                                    developer={developerName}
                                    categorylist={gameCategoryName}
                                    img={gameMainImage} />
                        }
                    </aside>
                </div>
            </div>
            <div class='mt-10'>
                <Buyplaybanner gamename={gameName.replaceAll('_',' ')}
                               gameprice={gamePrice}
                               buystate={buyStatus}
                               gameId = {id}
                               usertotal= {userGamePlayTotalPlayTime}
                               userend = {userGamePlayRecentPlayDateTime}
                />
            </div>
            {buyStatus &&
                <div>
                    <h3 class='text-left ml-16 mb-5'>{gameName.replaceAll('_',' ')}에 대한 평가</h3>
                    <div class='ml-16 flex'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9aAVl5QQCGWBdIwuGs2ybjGoAuiwAWflMh5imVUnvk3SbYbDXelzOpCCJEHlJ67IIU5k&usqp=CAU' class='w-[140px] h-[140px]'/>
                        <div class='ml-[80px]'>
                            <textarea name='comment' class='border' rows='10' cols='119'placeholder='평가를 작성해 주세요' onChange={HandleSetComment} value={comment}></textarea>
                            <div>
                                <fieldset class='radioButtonStyle'>
                                    <legend class='absolute overflow-hidden h-1 w-1 m-[-1px]'></legend>
                                    <label className='radioStyle hover:cursor-pointer'>
                                        <input type="radio" name='cate' id='cate' onChange={handleInputGrade} value='0'/><span onClick={ Clickgrade}>매우 긍정적</span>
                                    </label>
                                    <label className='radioStyle hover:cursor-pointer'>
                                        <input type="radio" name='cate'id='cate' onChange={handleInputGrade} value='1' /><span onClick={Clickgrade}>긍정적</span>
                                    </label>
                                    <label className='radioStyle hover:cursor-pointer'>
                                        <input type="radio" name='cate'id='cate' onChange={handleInputGrade} value='2'/><span onClick={Clickgrade}>보통</span>
                                    </label>
                                    <label className='radioStyle hover:cursor-pointer'>
                                        <input type="radio" name='cate'id='cate' onChange={handleInputGrade} value='3'/><span onClick={Clickgrade}>부정적</span>
                                    </label>
                                    <label className='radioStyle hover:cursor-pointer'>
                                        <input type="radio" name='cate'id='cate' onChange={handleInputGrade} value='4'/><span onClick={Clickgrade}>매우 부정적</span>
                                    </label>
                                </fieldset>
                                <div>
                                    <input type='submit' value='게시하기' class='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded float-right' onClick={Clicksetgrade}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

            <div>
                <h2 class='text-left ml-9 mt-3'>내용</h2>
                <hr></hr>
                <p class='text-left ml-4'>
                    <div>
                        {/*내용 작성하는부분 */}
                        <div>{gameDescription}</div>
                        <br/>
                        <div className=''>업데이트 내역 ver{gameVersion}</div>
                        <p>- 화면전환<br/>- 게임의 자잘자잘한 느낌</p>
                        <br/>
                        <div>플랫폼  {gamePlatForm}</div>
                        <div>개발자 {developerName}</div>
                    </div>
                </p>
                <hr></hr>
            </div>
            <div>
                <h2 class='text-left ml-9'>{gameCategoryName} 관련 게임</h2>
                <div>
                    <div class='overflow-x-scroll w-[1200px] mt-4'>
                        <div className="image-slider flex">
                            <fieldset class='imgButtonStyle flex '>
                                <legend class='absolute overflow-hidden h-1 w-1 m-[-1px] '></legend>
                                {categoryGameList.map((image, index) => (
                                    <label className='hover:cursor-pointer w-[320px] h-[240px] m-2'>
                                        <input type="radio" class='hidden' name='subimg' id='subimg'
                                               onChange={handleInputImg}
                                               value={index}
                                               onClick={()=>gameLink(image.gameIndex,image.gameName) }/>
                                        <img class='max-w-none w-[320px] h-[180px]'
                                             src={ `http://localhost:9090/image/game/games_${image.gameIndex = image.gameIndex > 4 ? 'test' : image.gameIndex}_0.png` }
                                             value={ `http://localhost:9090/game${image.gameIndex}/${image.gameName}`}/>
                                        <div class='mt-2 font-bold'>{image.gameName}</div>
                                        <div>{image.gamePrice}</div>
                                    </label>

                                ))}
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 class='text-left ml-9 mt-4'>댓글</h2>
                <GPcomment commentList={commentList || []} gameID={id} />
            </div>

        </div>
    )
}