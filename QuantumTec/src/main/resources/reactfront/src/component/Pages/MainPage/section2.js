import React, { useState, useEffect, useRef } from 'react';
import Gamelist from './gamelist.js';
import Gamepage from '../GamePage/gamepage.js';

export default function Section() {
  const [gamelist, setGameList] = useState(["게임이름", "수학게임"]);
  const [inputCate, setInputCate] = useState("#전체");
  const [loadedCate, setLoadedCate] = useState([1]); // 로드된 카테고리 저장
  const observerRef = useRef(null); // Intersection Observer의 Ref

  const handleInputCate = (e) => {
    setInputCate(e.target.value);
  }

  useEffect(() => {
    // Intersection Observer 초기화
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });
    observerRef.current = observer;
  }, []);

  useEffect(() => {
    // 카테고리 변경 시 로드된 카테고리 초기화
    setLoadedCate([1]);
  }, [inputCate]);

  useEffect(() => {
    // 로드된 카테고리 감지하여 추가 게임 로드
    if (observerRef.current) {
      const lastCate = loadedCate[loadedCate.length - 1];
      const loadCate = Number(lastCate) + 1;
      const target = document.getElementById(`cate${loadCate}`);
      if (target) {
        observerRef.current.observe(target);
      }
    }
  }, [loadedCate]);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cateId = entry.target.getAttribute('data-cate');
        setLoadedCate((prevCate) => [...prevCate, cateId]);
        observerRef.current.unobserve(entry.target);
      }
    });
  }

  const Clickcate = (e) => {
    let index = e.target;
    console.log(index);
    let index2 = index.text;
    console.log(index2);
    console.log(inputCate);
  }

  const Clicksearch = () => {
    // document.querySelectorAll("국어").forEach(element => {
    //     element.style.display = "none";
    //   });
  }


    const games =[
        {
            "id": 1,
            "cate": 1, 
            "name": "수학게임",
            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            "description": "수학게임입니다.",
            "link": "/gamepage"
            },
        {
            "id": 2,
            "cate": 2,
            "name": "국어게임",
            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            "description": "국어게임입니다.",
            "link": "https://www.naver.com/"
            },
        {
            "id": 3,
            "cate": 1,
            "name": "수학게임2",
            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            "description": "수학게임입니다.",
            "link": "https://www.naver.com/"
            },
        {
            "id": 4,
            "cate": 2,
            "name": "국어게임2",
            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            "description": "국어게임입니다.",
            "link": "https://www.naver.com/"
            },
        {
            "id": 5,
            "cate": 4,
            "name": "사회게임",
            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            "description": "사회게임입니다.",
            "link": "https://www.naver.com/"
            },
            {
                "id": 5,
                "cate": 4,
                "name": "사회게임",
                "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                "description": "사회게임입니다.",
                "link": "https://www.naver.com/"
                },
                {
                    "id": 5,
                    "cate": 4,
                    "name": "사회게임",
                    "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                    "description": "사회게임입니다.",
                    "link": "https://www.naver.com/"
                    },
                    {
                        "id": 5,
                        "cate": 4,
                        "name": "사회게임",
                        "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                        "description": "사회게임입니다.",
                        "link": "https://www.naver.com/"
                        },
                        {
                            "id": 5,
                            "cate": 4,
                            "name": "사회게임",
                            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                            "description": "사회게임입니다.",
                            "link": "https://www.naver.com/"
                            },
                            {
                                "id": 5,
                                "cate": 4,
                                "name": "사회게임",
                                "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                "description": "사회게임입니다.",
                                "link": "https://www.naver.com/"
                                },
                                {
                                    "id": 5,
                                    "cate": 4,
                                    "name": "사회게임",
                                    "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                    "description": "사회게임입니다.",
                                    "link": "https://www.naver.com/"
                                    },
                                    {
                                        "id": 5,
                                        "cate": 4,
                                        "name": "사회게임",
                                        "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                        "description": "사회게임입니다.",
                                        "link": "https://www.naver.com/"
                                        },                            {
                                            "id": 5,
                                            "cate": 4,
                                            "name": "사회게임",
                                            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                            "description": "사회게임입니다.",
                                            "link": "https://www.naver.com/"
                                            },
                                            {
                                                "id": 5,
                                                "cate": 4,
                                                "name": "사회게임",
                                                "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                "description": "사회게임입니다.",
                                                "link": "https://www.naver.com/"
                                                },
                                                {
                                                    "id": 5,
                                                    "cate": 4,
                                                    "name": "사회게임",
                                                    "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                    "description": "사회게임입니다.",
                                                    "link": "https://www.naver.com/"
                                                    },                            {
                                                        "id": 5,
                                                        "cate": 4,
                                                        "name": "사회게임",
                                                        "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                        "description": "사회게임입니다.",
                                                        "link": "https://www.naver.com/"
                                                        },
                                                        {
                                                            "id": 5,
                                                            "cate": 4,
                                                            "name": "사회게임",
                                                            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                            "description": "사회게임입니다.",
                                                            "link": "https://www.naver.com/"
                                                            },
                                                            {
                                                                "id": 5,
                                                                "cate": 4,
                                                                "name": "사회게임",
                                                                "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                                "description": "사회게임입니다.",
                                                                "link": "https://www.naver.com/"
                                                                },
                                                                {
                                                                    "id": 5,
                                                                    "cate": 4,
                                                                    "name": "사회게임",
                                                                    "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                                    "description": "사회게임입니다.",
                                                                    "link": "https://www.naver.com/"
                                                                    },
                                                                    {
                                                                        "id": 5,
                                                                        "cate": 4,
                                                                        "name": "사회게임",
                                                                        "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                                        "description": "사회게임입니다.",
                                                                        "link": "https://www.naver.com/"
                                                                        },
                                                                        {
                                                                            "id": 5,
                                                                            "cate": 4,
                                                                            "name": "사회게임",
                                                                            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                                            "description": "사회게임입니다.",
                                                                            "link": "https://www.naver.com/"
                                                                            },
                                                                            {
                                                                                "id": 5,
                                                                                "cate": 4,
                                                                                "name": "사회게임",
                                                                                "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                                                "description": "사회게임입니다.",
                                                                                "link": "https://www.naver.com/"
                                                                                },
                                                                                {
                                                                                    "id": 5,
                                                                                    "cate": 4,
                                                                                    "name": "사회게임",
                                                                                    "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                                                    "description": "사회게임입니다.",
                                                                                    "link": "https://www.naver.com/"
                                                                                    },
                                                                                    {
                                                                                        "id": 5,
                                                                                        "cate": 4,
                                                                                        "name": "사회게임",
                                                                                        "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                                                        "description": "사회게임입니다.",
                                                                                        "link": "https://www.naver.com/"
                                                                                        },                            {
                                                                                            "id": 5,
                                                                                            "cate": 4,
                                                                                            "name": "사회게임",
                                                                                            "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                                                            "description": "사회게임입니다.",
                                                                                            "link": "https://www.naver.com/"
                                                                                            },                            {
                                                                                                "id": 5,
                                                                                                "cate": 4,
                                                                                                "name": "사회게임",
                                                                                                "img": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                                                                                                "description": "사회게임입니다.",
                                                                                                "link": "https://www.naver.com/"
                                                                                                },
    
    ]
    const chunkSize = 8;
    const chunkedGames = games.reduce((acc, curr, index) => {
      const chunkIndex = Math.floor(index / chunkSize);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [curr];
      }
      acc[chunkIndex].push();
      return acc;
    }, []);

    
    return (

        <div class='w-[1320px] relative pl-24px m-auto'>
        <h2 class='h-[28px] text-[#17191d] text-[24px] text-left mb-4 font-bold'>전체 게임</h2>
        <div class='absolute top-[-10px] right-[0px]'>
            <fieldset>
                <input class='w-[302px] h-[44px] pr-[3px] pl-[3px] mr-0 border-b-2' type='text' placeholder='게임명 검색'></input>
                <button type='button' class='absolute right-0 w-[44px] h-[44px]' onClick={Clicksearch}>
                    <span class='inline-block w-[40px] h-[40px] rounded-full bg-green-400'></span></button>
            </fieldset>
        </div>
        <div>
    </div>
        <section>
            <div class=' bg-white relative pt-[20px] pr-[30px] pb-[30px] pl-[3px]  text-center'>
                
                <fieldset class='radioButtonStyle'>
                    <legend class='absolute overflow-hidden h-1 w-1 m-[-1px]'></legend>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='0'/><span onClick={ Clickcate}>#전체</span>
                            </label>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate'id='cate' onChange={handleInputCate} value='1' /><span onClick={Clickcate}>#수학</span>
                            </label>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate'id='cate' onChange={handleInputCate} value='2'/><span onClick={Clickcate}>#국어</span>
                            </label>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate'id='cate' onChange={handleInputCate} value='3'/><span onClick={Clickcate}>#과학</span>
                            </label>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate'id='cate' onChange={handleInputCate} value='4'/><span onClick={Clickcate}>#영어</span>
                            </label>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate'id='cate' onChange={handleInputCate} value='5' /><span onClick={Clickcate}>#사회</span>
                            </label>
                            <label className='radioStyle hover:cursor-pointer'>
                                <input type="radio" name='cate'id='cate' onChange={handleInputCate} value='6'/><span onClick={Clickcate}>#일본어</span>
                            </label>
                </fieldset>
            </div>        
        </section>
      
        <section class="py-5">
        <div class="container grid grid-cols-4 gap-[20px] mt-5">
          {chunkedGames.map((chunk, chunkIndex) => (
            <div
              class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4"
              key={chunkIndex}
            >
              {chunk.map((game) => (
                <Gamelist
                  name={game.name}
                  cate={game.cate}
                  img={game.img}
                  link={game.link}
                  key={game.id}
                  id={`cate${chunkIndex}`}
                  data-cate={chunkIndex}
                />
              ))}
              {chunkIndex === loadedCate[loadedCate.length - 1] && (
                <div id={`cate${chunkIndex + 1}`} data-cate={chunkIndex + 1} ref={observerRef} />
              )}
            </div>
          ))}
        </div>
      </section>
        </div>
    );
}