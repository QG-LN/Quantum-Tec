import React, {useEffect, useState} from "react";
import axios from "axios";
import AvatarSide from "./avatarSide";
import AvatarMainContent from "./avatarMain";
import AvatarCategory from "./avatarCategory";
import AvatarSearch from "./avatarSearch";
import styled from "styled-components";

export default function AvatarMainPage() {
    const [page, setPage] = useState("추천");
    const [category, setCategory] = useState(["추천"]);

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
        tempArray.push('모자');
        tempArray.push('악세서리');
        tempArray.push('머리카락');
        tempArray.push('이너');
        tempArray.push('아웃터');
        tempArray.push('바지');
        tempArray.push('치마');
        tempArray.push('원피스');
        tempArray.push('신발');
        tempArray.push('구두');
        tempArray.push('배경');
        tempArray.push('가구');
        setCategory(category.concat(tempArray));
    }, []);
    const handlePage = (e) => {
        if(e.target.id === "" && e.target.id !== "avatar-search-button")
            setPage(e.target.parentNode.parentNode.id)
        else if(e.target.id !== "" && e.target.id !== "avatar-search-button")
            setPage(e.target.id);
        else
            setPage(e.target.previousElementSibling.value);
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
                        {page === "추천"?<AvatarMainContent onClick={handlePage} />:category.indexOf(page) !== -1?<AvatarCategory key={page} categoryName={page} />:<AvatarSearch key={page} searchName={page} onClick={handlePage} />}
                    </ScrollContainer>
                </div>
            </div>
        </div>
    )

}