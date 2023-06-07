import React, { useState } from 'react';

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
        // Send the title and content to the server to be saved
        // ...
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

