import React, { useState } from 'react';
import {axiosRequest} from '../../../module/networkUtils';


export default function WritePage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if(!title){
            alert('제목을 입력하세요.');
            return;
        }else if(!content){
            alert('내용을 입력하세요.');
            return;
        }else{
            const currentPathname = window.location.pathname; // 현재 주소값 가져오기
            const parts = currentPathname.split('/'); // 슬래시(/)를 기준으로 주소를 자르기
            const boardId = parts[2]; // boardId 값을 추출

            const userID = localStorage.getItem("userID");

            const path = 'http://localhost:9090/board/write';
            const body = {
                boardIndex : boardId,
                userID : userID,
                title : title,
                content : content,
            }
            const result = axiosRequest(path, body, 'POST', 'json');
            if(result){
                alert('글이 등록되었습니다.');
                document.location.href = `/board/${boardId}`;
            }else{
                alert('글 등록에 실패하였습니다.');
            }
            
        }


    };

    return (
        <div className="container">
            <h1 class="m-5">글쓰기</h1>
            <form onSubmit={handleSubmit}>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="title" onChange={handleTitleChange} />
                    <label for="floatingInput">제목</label>
                </div>
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style={{height: "400px"}} onChange={handleContentChange} />
                    <label for="floatingTextarea">내용</label>
                </div>
                <br />
                <button type="submit" class="btn btn-success mb-5">Submit</button>
            </form>
        </div>
    );
}

