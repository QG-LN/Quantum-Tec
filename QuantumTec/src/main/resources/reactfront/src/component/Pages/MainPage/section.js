import React, {useState} from 'react';
import {useEffect} from 'react';
import Gamelist from './gamelist.js';
import axios from 'axios';
import Gamepage from '../GamePage/gamepage.js';
import {useInView} from 'react-intersection-observer';


export default function Section() {
    const [gamelist, setgameList] = useState(["게임이름", "수학게임"]);
    const [inputCate, setInputCate] = useState("#전체");
    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const [ref, inView] = useInView()

    const maxContentLength = 8;

    const handleInputCate = (e) => {
        setInputCate(e.target.value)
    }


    useEffect(() => {
        console.log("useEffect")
        setLoading(true)
        axios.get("api/games", {
            params: {
                id         : '0',
                cate       : '',
                name       : '',
                img        : '',
                description: '',
                link       : ''
            }
        })
            .then(response => setItems(prevItems => {
                prevItems.concat(response.data);
            }))
            .catch(error => {
                console.error(error);
            })
        const temp = [];
        for (let i = 0 + (maxContentLength * (page - 1)); i < maxContentLength * page; i++) {
            const newItem = {
                id         : 0,
                cate       : 1,
                name       : "수학게임" + i,
                img        : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                description: "수학게임입니다.",
                link       : "/gamepage"
            };
            temp.push(newItem);
        }
        setItems(items.concat(temp))
        setLoading(false)
    }, [page]);

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage(page + 1)
        }
    }, [inView, loading])


    // 더블클릭 문제 해결을 위한 id값으로 checked 설정
    useEffect(() => {
        // let checkresult = document.getElementById("cate");
        // checkresult.checked = true;
    }, []);

    const Clickcate = (e) => {
        let index = e.target;
        let index2 = index.text;
    }
    const Clicksearch = () => {
    }

    return (

        <div class='w-[1320px] relative pl-24px m-auto'>
            <h2 class='h-[28px] text-[#17191d] text-[24px] text-left mb-4 font-bold'>전체 게임</h2>
            <div class='absolute top-[-10px] right-[0px]'>
                <fieldset>
                    <input class='w-[302px] h-[44px] pr-[3px] pl-[3px] mr-0 border-b-2' type='text'
                           placeholder='게임명 검색'></input>
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
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='0'/><span
                            onClick={Clickcate}>#전체</span>
                        </label>
                        <label className='radioStyle hover:cursor-pointer'>
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='1'/><span
                            onClick={Clickcate}>#수학</span>
                        </label>
                        <label className='radioStyle hover:cursor-pointer'>
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='2'/><span
                            onClick={Clickcate}>#국어</span>
                        </label>
                        <label className='radioStyle hover:cursor-pointer'>
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='3'/><span
                            onClick={Clickcate}>#과학</span>
                        </label>
                        <label className='radioStyle hover:cursor-pointer'>
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='4'/><span
                            onClick={Clickcate}>#영어</span>
                        </label>
                        <label className='radioStyle hover:cursor-pointer'>
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='5'/><span
                            onClick={Clickcate}>#사회</span>
                        </label>
                        <label className='radioStyle hover:cursor-pointer'>
                            <input type="radio" name='cate' id='cate' onChange={handleInputCate} value='6'/><span
                            onClick={Clickcate}>#일본어</span>
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