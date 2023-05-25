import React, { useState } from 'react';
import GPImage from './gpimage.js';
import GPInfo from './gpinfo.js';
import Buyplaybanner from './buyplaybanner.js';
import GPcomment from './gpcomment.js'

//상위 이미지 리스트
const images = [
  {
    url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    alt: "Image 1",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3yuRUfWCK4tYmm8Q4pD1VW51-9Tisqhix9Q&usqp=CAU",
    alt: "Image 2",
  },
  {
    url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    alt: "Image 3",
  },
  {
      url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      alt: "Image 4",
    },
    {
      url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      alt: "Image 5",
    },
    {
      url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      alt: "Image 6",
    },
];

// 댓글 리스트
const commentlist = [
{
  commentimg: "http://help.nexon.com/image/gameicon/cs_maple2.png",
  commentNo: "1",
  commentName: "user1",
  commentDate: "2021/02/14",
  commentUp: "17",
  commentDown: "16",
  commentSub: <div>내용추가<br/>아 드럽네요</div>,
},
{
  commentimg: "http://help.nexon.com/image/gameicon/cs_maple1.png",
  commentNo: "2",
  commentName: "아 너무 안좋아요",
  commentDate: "2021/05/36",
  commentUp: "17",
  commentDown: "16",
  commentSub: '아ㅣsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddㅇddddddddddddddddddddddddㅇddddddddddddddddㅇdddddddddddddddddddddddddddddddddd',
},
]

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
    const [buystate] = useState(true);

    const [comment, setComment] = useState('');
    const [activeImage, setActiveImage] = useState(0);
    const [usergrade,setUserGrade] = useState('0');
    const categray_0 = '카테고리1';
    const categray_1 = '카테고리2';
    const categray_2 = '카테고리3';


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
    console.log(e.target.value);
  }
  //평가를 눌럿을떄 반영
  const Clicksetgrade = (e) => {
    console.log(comment);
    console.log(usergrade);
    alert('평가가 등록되었습니다.')
    setComment('');
    setUserGrade('0');
  }



    return (
        <div class='container'>
            <div>
                <h2 class='text-left'>게임이름</h2>
                <div class='text-left'>{categray_0}&gt;{categray_1}&gt;{categray_2}</div>
                <div class='flex'>
                <section class='basis-3/5 h-[535px] mr-5' >
                  <GPImage img={images}/>
                </section>
                <aside class='basis-2/5 ml-5'>
                  <GPInfo gameinfo={gameinfo} gamegrade={gamegrade} gamedate={gamedate} developer={developer} categorylist={Categorylist} img={images[0].url} />
                </aside>
                </div>
            </div>
            <div class='mt-10'>
              <Buyplaybanner gamename={gamename} gameprice={gameprice} buystate={buystate}/>
            </div>
            {buystate && 
            <div>
              <h3 class='text-left ml-16 mb-5'>게임 이름에 대한 평가</h3>
              <div class='ml-16 flex'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9aAVl5QQCGWBdIwuGs2ybjGoAuiwAWflMh5imVUnvk3SbYbDXelzOpCCJEHlJ67IIU5k&usqp=CAU' class='w-[140px] h-[140px]'></img>
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
              <h2 class='text-left ml-9'>내용</h2>
              <hr></hr>
              <p class='text-left ml-4'>
                <div>
                  {/*내용 작성하는부분 */}
                  <div>업데이트 내역</div>
                  <div>1.1 테스트</div>
                  <p>- 화면전환<br/>- 게임의 자잘자잘한 느낌</p>
                </div>
              </p>
              <hr></hr>
            </div>
            <div>
              <h2 class='text-left ml-9'>관련 게임</h2>
              <div>
                  <div class='overflow-x-scroll w-[1320px] mt-4'>
                    <div className="image-slider flex">
                    <fieldset class='imgButtonStyle flex'>
                                <legend class='absolute overflow-hidden h-1 w-1 m-[-1px] '></legend>
                                        {Relatedgame.map((image, index) => (
                                        <label className='hover:cursor-pointer w-[320px] h-[240px] m-2'>
                                            <input type="radio" class='hidden' name='subimg' id='subimg' onChange={handleInputImg} value={index}/><img class='max-w-none w-[320px] h-[180px]'src={image.Rgameimg} value={image.Rgameurl} ></img>
                                            <div class='mt-2 font-bold'>{image.Rgamename}</div>
                                            <div>{image.Rgameprice}</div>
                                        </label>

                        ))}
                    </fieldset>
                    </div>
                  </div>
              </div>
            </div>
            <div>
              <h2 class='text-left ml-9 mt-4'>댓글</h2>
                  <GPcomment Comment={commentlist} />
            </div>

        </div>
    )
}