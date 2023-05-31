import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function View() {
    const [post, setPost] = useState(null);
    const { id } = useParams();  // react-router-dom을 사용하여 URL 파라미터에서 게시글 ID를 얻습니다.

    useEffect(() => {
        axios.get(`/api/boards/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;  // 데이터를 불러오는 동안에는 Loading 메시지를 보여줍니다.
    }

    return (
        <div className="container">
            <h1>{post.title}</h1>
            <p>작성자: {post.writer}</p>
            <p>작성일: {post.createdDate}</p>
            <p>{post.content}</p>
        </div>
    );
}

export default View;