import React, {useState} from 'react';
import {useEffect} from 'react';
import Gamelist from './gamelist.js';
import axios from 'axios';
import Gamepage from '../GamePage/gamepage.js';
import {useInView} from 'react-intersection-observer';
import {axiosRequest} from '../../../module/networkUtils';

export default function Section() {
    const [gamelist, setGamelist] = useState([]);           // 서버에서 받아온 게임 리스트
    const [inputCate, setInputCate] = useState("전체");        // 선택한 카테고리
    const [items, setItems] = useState([])                  // 보여줄 게임 리스트
    const [page, setPage] = useState(1)                     // 현재 페이지

    const [ref, inView] = useInView()                                 // 스크롤이 끝에 도달했는지 여부
    const [loading, setLoading] = useState(false)           // 로딩중인지 여부

    const [search, setSearch] = useState("");               // 검색어

    const defaultImage = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"; // 이미지가 없을 경우 기본 이미지

    const handleInputCate = (e) => {
        setInputCate(e.target.value)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }


    // 게임 목록을 받아오는 함수
    function getGameList(){
        const path = 'http://localhost:9090/search';
        let category = inputCate === "전체" ? "" : inputCate;
        let searchWord = search;
        const body = {
            pageNum         : page,
            gameName        : searchWord,
            gameCategoryName: category,
            gamePrice       : 0
        };
        axiosRequest(path, body, 'post', 'list')
            .then(res => {
                setGamelist(res);            // 서버에서 받아온 게임 목록 저장
                if (res.length !== 0) {      // 받아온 게임 목록이 있을 경우
                    const temp = [];        // 새로 받아온 게임 목록을 임시로 저장할 배열
                    /*
                    * 새로 받아온 게임 목록을 모두 temp에 저장한 뒤 items에 추가
                    * */
                    for (let i = 0; i < res.length; i++) {
                        if (res[i] !== null) {
                            if (res[i].gameImage == null) res[i].gameImage = defaultImage;
                            const newItem = {
                                id         : res[i].gameIndex,
                                cate       : res[i].gameCategoryName,
                                name       : res[i].gameName,
                                img        : res[i].gameImage,
                                description: "수학게임입니다.",
                                link       : "/game/"+ res[i].gameIndex                // 임시로 동일하게 게임 페이지를 설정
                            };
                            temp.push(newItem);
                        }

                    }
                    // 기존 게임 목록에 새로 받아온 게임 목록 추가
                    setItems(prevItems => prevItems.concat(temp));

                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    // 페이지가 바뀌었을 때마다 게임 목록을 새로 받아옴
    useEffect(() => {
        setLoading(true);

        getGameList();

        setLoading(false);
    }, [page]);

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            if(gamelist.length !==0)  setPage(page + 1);
            console.log('0');
        }
    }, [inView, loading])

    // 카테고리가 바뀌었을 때마다 게임 목록을 새로 받아옴
    useEffect(() => {
        setItems([]);
        if(page !== 1) {            // 페이지가 1이 아닐 경우 페이지를 1로 초기화하여 page useEffect를 실행
            setPage(1);
        }else{                      // 페이지가 1일 경우 기존 게임 목록을 삭제하고 새로 받아옴
            getGameList();
        }
    },[inputCate]);



    const Clickcate = (e) => {
        let index = e.target;
    }
    const onClickSearch = () => {
        setItems([]);
        if(page !== 1) {            // 페이지가 1이 아닐 경우 페이지를 1로 초기화하여 page useEffect를 실행
            setPage(1);
        }else{                      // 페이지가 1일 경우 기존 게임 목록을 삭제하고 새로 받아옴
            getGameList();
        }
    }

    return (

        <div class='w-[1320px] relative pl-24px m-auto'>
            <h2 class='h-[28px] text-[#17191d] text-[24px] text-left mb-4 font-bold'>전체 게임</h2>
            <div class='absolute top-[-10px] right-[0px]'>
                <fieldset>
                    <input class='w-[302px] h-[44px] pr-[3px] pl-[3px] mr-0 border-b-2' type='text'
                           placeholder='게임명 검색'onChange={handleSearch} value={search}></input>
                    <button type='button' class='absolute right-0 w-[44px] h-[44px]' onClick={onClickSearch}>
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
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='전체' checked={inputCate === '전체'}/>
                            <span onClick={Clickcate}>#전체</span>
                        </label>
                        <label className='radioStyle hover:cursor-pointer'>
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='수학' checked={inputCate === '수학'}/>
                            <span onClick={Clickcate}>#수학</span>
                        </label>
                        <label className='radioStyle hover:cursor-pointer'>
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='국어' checked={inputCate === '국어'}/>
                            <span onClick={Clickcate}>#국어</span>
                        </label>
                        <label className='radioStyle hover:cursor-pointer'>
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='과학' checked={inputCate === '과학'}/>
                            <span onClick={Clickcate}>#과학</span>
                        </label>
                        <label className='radioStyle hover:cursor-pointer'>
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='영어' checked={inputCate === '영어'}/>
                            <span onClick={Clickcate}>#영어</span>
                        </label>
                        <label className='radioStyle hover:cursor-pointer'>
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='사회' checked={inputCate === '사회'}/>
                            <span onClick={Clickcate}>#사회</span>
                        </label>
                        <label className='radioStyle hover:cursor-pointer'>
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='일본어' checked={inputCate === '일본어'}/>
                            <span onClick={Clickcate}>#일본어</span>
                        </label>
                    </fieldset>
                </div>
            </section>

            {loading ? <div>로딩중</div> :
                <section class="py-5">
                    <div class="container grid grid-cols-4 gap-[20px] px-4 px-lg-5 mt-5">
                        {items.map((game, idx) => (
                            <div key={idx} id={game.id}
                                 className='row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4'
                                 ref={idx === items.length - 1 ? ref : null}>
                                <Gamelist
                                    name={game.name}
                                    cate={game.cate}
                                    img={game.img}
                                    link={game.link}
                                    key={game.id}
                                />
                            </div>
                        ))}

                    </div>
                </section>
            }
        </div>
    );
}