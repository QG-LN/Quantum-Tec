import React, { useState, useEffect, useRef } from 'react';
import {axiosRequest} from '../../../module/networkUtils';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import { useLocation } from "react-router";
import { useParams } from 'react-router-dom';

export default function WritePage() {
    const editorRef = useRef();
    const [title, setTitle] = useState('');

    const [isEdit, setIsEdit] = useState(false);    // 글 수정인지 확인하는 변수

    const {state} = useLocation();  // 수정버튼 클릭 시 전달받은 state 값
    const { no, id } = useParams();  // 게시판 번호, 게시글 번호

    useEffect(() => {
        if(state !== null){
            console.log(state);
            setIsEdit(true);
            setTitle(state.title);
            editorRef.current.getInstance().setMarkdown(state.content);
        }

    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!title){
            alert('제목을 입력하세요.');
            return;
        }else{
            if(isEdit){
                const path = 'http://localhost:9090/board/modify';
                const body = {
                    boardIndex : (no === "0") ? 1 : no,
                    postIndex : id,
                    userID : localStorage.getItem("userID"),
                    title : title,
                    content : editorRef.current.getInstance().getMarkdown()
                }

                axiosRequest(path,body,'POST','json')
                .then(res => {
                    if(res){
                        alert("글을 성공적으로 수정하였습니다.");
                        document.location.href = `/board/${no}`;
                    }else{
                        alert("글 수정에 실패하였습니다.");
                    }
                })
            }else{
                const userID = localStorage.getItem("userID");

                const boarderIndex = (no === "0") ? 1 : no;
    
                const path = 'http://localhost:9090/board/write';
                const body = {
                    boardIndex : boarderIndex,
                    userID : userID,
                    title : title,
                    content : editorRef.current.getInstance().getMarkdown()
                }

                axiosRequest(path,body,'POST','json')
                    .then(res => {
                        if(res){
                            alert("글을 성공적으로 등록하였습니다.");
                            document.location.href = `/board/${no}`;
                        }else{
                            alert("글 등록에 실패하였습니다.");
                        }
                    })
            }

            
        }
    };


    return (
        <div className="container">
            <form onSubmit={handleSubmit}  className="text-left mt-[10%]">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">제목</label>
                    <input type="text" 
                            class="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="제목을 입력해주세요." 
                            onChange={handleTitleChange} 
                            value={title}/>
                </div>
                <div>
                    <Editor
                        initialValue="이곳에 내용을 입력하세요!
오른쪽 화면에서 미리보기가 가능합니다."
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        ref={editorRef}
                        plugins={[codeSyntaxHighlight]}
                    />
                </div>
                <br />
                <div className='text-right'>
                    <button onClick={handleSubmit} class="btn btn-success mb-5 text-right">Submit</button>
                </div>
            </form>
        </div>
    );
}

