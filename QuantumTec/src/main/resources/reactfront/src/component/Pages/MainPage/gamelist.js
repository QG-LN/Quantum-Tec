import {useEffect, useState} from "react";

export default function Gamelist(props) {
    const gamelist = props.name;

    const [titleImage, setTitleImage] = useState(null);             // 게임 타이틀 이미지

    const imagePath = 'http://localhost:9090/image/game/games_';  // 게임 이미지 경로
    const defaultImage = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"; // 이미지가 없을 경우 기본 이미지

    useEffect(() => {
        if (props.img === null) {                                   // 이미지가 없을 경우 기본 이미지로 설정
             setTitleImage(defaultImage);
        } else {                                                    // 이미지가 있을 경우 해당 이미지로 설정
            setTitleImage(imagePath + props.img +"_0.png");
        }
    },[props.img])

    const gamelink = () => {
        window.open(props.link);
    }
    return(
        <>
        <div class="col mb-5 hover:cursor-pointer">
            <div class="card h-100 w-[300px] h-[200px]" id={props.id} onClick={gamelink}>
                <img class="card-img-top" src={titleImage} alt="..." />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">{gamelist}</h5>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}