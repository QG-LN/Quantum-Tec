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
    const [eng_category, setEng_category] = useState(["all"]);

    const ScrollContainer = styled.div`
      height: 95vh;
      overflow-y: auto;
      background-color: var(--bs-gray-200)
    `;

    useEffect(() => {
        axios.get('http://localhost:8080/api/avatar/category')
            .then((response) => {
                setCategory(category.concat(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
        const tempArray = []
        tempArray.push('전체');
        tempArray.push('배경');
        tempArray.push('모자');
        tempArray.push('이너');
        tempArray.push('바지');
        tempArray.push('치마');
        setCategory(category.concat(tempArray));
        const tempArray2 = []
        tempArray2.push('all');
        tempArray2.push('bg');
        tempArray2.push('hat');
        tempArray2.push('inner');
        tempArray2.push('pants');
        tempArray2.push('skirt');
        setEng_category(eng_category.concat(tempArray2));
    }, []);
    const handlePage = (e) => {
        if(e.target.id === "" && e.target.id !== "avatar-search-button")
            setPage(e.target.parentNode.parentNode.id)
        else if(e.target.id !== "" && e.target.id !== "avatar-search-button")
            setPage(e.target.id);
        else
            setPage(e.target.previousElementSibling.value);
        console.log(eng_category[category.indexOf(page)])
    }
    function renderContent(page, handlePage, category, eng_category) {
        if (page === "전체") {
            return <AvatarMainContent onClick={handlePage} />;
        } else if (category.includes(page)) {
            const idx = category.indexOf(page);
            return <AvatarCategory key={page} categoryName={page} eng_category={eng_category[idx]} />;
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
                    {renderContent(page, handlePage, category, eng_category)}
                    </ScrollContainer>
                </div>
            </div>
        </div>
    )

}