import React, { useState, useEffect, useRef } from 'react';
import {axiosRequest} from '../../../module/networkUtils';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';


export default function WritePage() {
    const editorRef = useRef();
    const [title, setTitle] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(title === ''){
            alert("제목을 입력해주세요.");
            return;
        }
        const path = 'http://localhost:9090/board/write';
        const body ={
            boardIndex : 1,
            userID : localStorage.getItem("userID"),
            title : title,
            content : editorRef.current.getInstance().getMarkdown()
        }
        axiosRequest(path,body,'POST','json')
            .then(res => {
                if(res){
                    alert("글을 성공적으로 올렸습니다.");
                    document.location.href = "/board/0";
                }else{
                    alert("글을 올리지 못했습니다.");
                }
            })
    };




    return (
        <div className="container">
            <form onSubmit={handleSubmit} className=' mt-[10%]'>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="title" onChange={handleTitleChange} />
                    <label for="floatingInput">제목</label>
                </div>
                <div className="text-left">
                    <Editor
                        initialValue="이곳에 내용을 입력하세요!"
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

