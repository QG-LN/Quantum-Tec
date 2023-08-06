import React, { useState, useEffect } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default function WritePage() {
    const [title, setTitle] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //editor.getMarkdown()
    };

    let editor;

    useEffect(() => {
        editor = new Editor({
            el: document.querySelector('#editor'),
            height: '600px',
            initialEditType: 'markdown',
            previewStyle: 'vertical'
        });
    }, []);


    return (
        <div className="container">
            <form onSubmit={handleSubmit} className=' mt-[10%]'>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="title" onChange={handleTitleChange} />
                    <label for="floatingInput">제목</label>
                </div>
                <div id="editor" className='text-left'></div>
                <br />
                <button type="submit" class="btn btn-success mb-5">Submit</button>
            </form>
        </div>
    );
}

