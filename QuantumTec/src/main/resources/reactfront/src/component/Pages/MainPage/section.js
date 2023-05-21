import React, { useState } from 'react';
export default function Section() {
    const [gamelist, setgameList] = useState(["게임이름","수학게임"]);

    const Clickcate = (e) => {
      let index = e.target;
      console.log(index)
      let index2 = e.target.name;
      console.log(index2)
    }
    const Clicksearch = (e) => {
    
    }
    /* 나중에 옮겨야 할 css */
    const style ={
        top: '0.5rem',
        right: '0.5rem'
    };

    
    return (

        <div class='w-[1320px] relative pl-24px m-auto'>
        <h2 class='h-[28px] text-[#17191d] text-[24px] text-left mb-4 font-bold'>전체 게임</h2>
        <div class='absolute top-[-10px] right-[24px]'>
            <fieldset>
                <input class='w-[302px] h-[44px] pr-[3px] pl-[3px] mr-0 border-b-2' type='text' placeholder='게임명 검색'></input>
                <button type='button' class='absolute w-[44px] h-[44px]' onClick={Clicksearch}>
                    <span class='inline-block w-[20px] h-[20px] bg-black'></span>검색</button>
            </fieldset>
        </div>
        <section>
            <div class='relative pt-[20px] pr-[30px] pb-[30px] pl-[3px] border  text-center'>
                
                <fieldset class=''>
                    <legend class='absolute overflow-hidden h-1 w-1 m-[-1px]'></legend>
                        <span class='inline-block mr-[16px] ml-[17px]'><input type="radio" name='cate'  value='all' checked class='hidden' /><label for='all' onClick={Clickcate}>#전체</label></span>
                        <span class='inline-block mr-[16px] ml-[17px]'><input type="radio" name='cate' value='1' class='hidden'/><label for='cate_1'>#수학</label></span>
                        <span class='inline-block mr-[16px] ml-[17px]'><input type="radio" name='cate' value='2' class='hidden'/><label for='cate_2'>#국어</label></span>
                        <span class='inline-block mr-[16px] ml-[17px]'><input type="radio" name='cate' value='3' class='hidden'/><label for='cate_3'>#과학</label></span>
                        <span class='inline-block mr-[16px] ml-[17px]'><input type="radio" name='cate' value='4' class='hidden'/><label for='cate_4'>#사회</label></span>
                        <span class='inline-block mr-[16px] ml-[17px]'><input type="radio" name='cate' value='5' class='hidden'/><label for='cate_5'>#영어</label></span>
                        <span class='inline-block mr-[16px] ml-[17px]'><input type="radio" name='cate' value='6' class='hidden'/><label for='cate_6'>#일본어</label></span>
                        <span class='inline-block mr-[16px] ml-[17px]'><input type="radio" name='cate' value='7' class='hidden'/><label for='cate_7'>#중국어</label></span>
                        <span class='inline-block mr-[16px] ml-[17px]'><input type="radio" name='cate' value='8' class='hidden'/><label for='cate_8'>#물리</label></span>
                </fieldset>
            </div>        
        </section>
      
        <section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div class="col mb-5">
                        <div class="card h-100">
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{gamelist[0]}</h5>
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="rounded-md btn btn-outline-dark mt-auto" href="#">게임페이지 이동</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <div class="badge bg-dark text-white position-absolute" style={style}>Sale</div>
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{gamelist[1]}</h5>
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="rounded-md btn btn-outline-dark mt-auto" href="#">게임페이지 이동</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <div class="badge bg-dark text-white position-absolute" style={style}>Sale</div>
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{gamelist[0]}</h5>
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="rounded-md btn btn-outline-dark mt-auto" href="#">게임페이지 이동</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{gamelist[1]}</h5>
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="rounded-md btn btn-outline-dark mt-auto" href="#">게임페이지 이동</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <div class="badge bg-dark text-white position-absolute" style={style}>Sale</div>
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{gamelist[0]}</h5>
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="rounded-md btn btn-outline-dark mt-auto" href="#">게임페이지 이동</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{gamelist[1]}</h5>
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="rounded-md btn btn-outline-dark mt-auto" href="#">게임페이지 이동</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <div class="badge bg-dark text-white position-absolute" style={style}>Sale</div>
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{gamelist[0]}</h5>
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="rounded-md btn btn-outline-dark mt-auto" href="#">게임페이지 이동</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{gamelist[1]}</h5>
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="rounded-md btn btn-outline-dark mt-auto" href="#">게임페이지 이동</a></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
        </div>
    );
}