import React, {useEffect, useState} from "react";
import axios from "axios";
import AvatarSide from "./avatarSide";
import AvatarMainContent from "./avatarMain";
import AvatarCategory from "./avatarCategory";
import AvatarSearch from "./avatarSearch";
import styled from "styled-components";

/**
 * 아바타 부모 컴포넌트
 * @returns {JSX.Element} - AvatarMainPage 컴포넌트.
 * @auther MayoneJY <mayone6063@kakao.com>
 */
export default function AvatarMainPage() {

    // 현재 페이지 이름
    const [page, setPage] = useState("전체");
    // 카테고리 목록
    const [category, setCategory] = useState(["전체"]);

    const ScrollContainer = styled.div`
      height: 95vh;
      overflow-y: auto;
      background-color: var(--bs-gray-200)
    `;

    useEffect(() => {
        axios.get('http://localhost:9090/avatar/category')
            .then((response) => {
                setCategory(category.concat(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    /**
     * 페이지를 변경하는 함수
     * @param {*} e - 클릭 이벤트
     * @returns {void}
     */
    const handlePage = (e) => {
        // 수정 필요
        if(e.target.id === "" && e.target.id !== "avatar-search-button"){
            setPage(e.target.parentNode.parentNode.id);
            console.log(e.target.parentNode.parentNode.id);
        }
        else if(e.target.id !== "" && e.target.id !== "avatar-search-button")
            setPage(e.target.id);
        else
            setPage(e.target.previousElementSibling.value);
    }

    /**
     * 페이지에 맞는 컨텐츠를 렌더링하는 함수
     * @param {string} page - 현재 페이지
     * @param {*} handlePage - 페이지 변경 함수
     * @param {string[]} category - 카테고리 목록
     * @returns {JSX.Element} - 렌더링할 컴포넌트
     */
    function renderContent(page, handlePage, category) {
        if (page === "전체") {
            return <AvatarMainContent onClick={handlePage} />;
        } else if (category.includes(page)) {
            return <AvatarCategory key={page} categoryName={page} />;
        } else {
            return <AvatarSearch key={page} searchName={page} onClick={handlePage} />;
        }
    }

    return (
        <div className="AvatarMainPage container" style={{ height: "95vh" }}>
            <div className="row justify-content-center h-[100%]">
                <div className="col-3 ps-0 pe-0">
                    <ScrollContainer>
                        <AvatarSide onClick={handlePage}/>
                    </ScrollContainer>
                </div>
                <div className="col-9 ps-0 pe-0">
                    <ScrollContainer>
                    {renderContent(page, handlePage, category)}
                    </ScrollContainer>
                </div>
            </div>
        </div>
    )

}