import React, {useEffect, useState} from "react";
import axios from "axios";
import AvatarSide from "./avatarSide";
import AvatarMainContent from "./avatarMain";
import AvatarCategory from "./avatarCategory";
import AvatarSearch from "./avatarSearch";
import styled from "styled-components";

export default function AvatarMainPage() {
    const [page, setPage] = useState("전체");
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
    const handlePage = (e) => {
        if(e.target.id === "" && e.target.id !== "avatar-search-button")
            setPage(e.target.parentNode.parentNode.id)
        else if(e.target.id !== "" && e.target.id !== "avatar-search-button")
            setPage(e.target.id);
        else
            setPage(e.target.previousElementSibling.value);
    }
    function renderContent(page, handlePage, category) {
        if (page === "전체") {
            return <AvatarMainContent onClick={handlePage} />;
        } else if (category.includes(page)) {
            const idx = category.indexOf(page);
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