import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AvatarImg from "./Detail/Avatar/avatarImg";
import "./Detail/Avatar/avatarImg.css";

function AvatarPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImages, setCurrentImages] = useState(0); // 현재 페이지에 보여줄 이미지들
  const [limit, setLimit] = useState(8);
  const postsPerPage = 8;

  const [selectedButton, setSelectedButton] = useState("전체");
  const buttonImageMap = ["전체", "배경", "모자", "이너", "바지"];

  const [loadedImages, setLoadedImages] = useState([]);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
  //  const avatarcolor = [
  //   "빨간색",
  //   "파란색",
  //   "초록색",
  //   "갈색",
  //   "보라색"
  //  ]
  //  const avatarid = [
  //   "1",
  //   "2",
  //   "3",
  //   "4",
  //   "5"
  //  ]

  const avatarinfo = [
    { itemIndex: 7, itemName: "파란색 배경", itemCategory: "배경" },
    { itemIndex: 8, itemName: "갈색 배경", itemCategory: "배경" },
    { itemIndex: 9, itemName: "초록색 배경", itemCategory: "배경" },
    { itemIndex: 10, itemName: "보라색 배경", itemCategory: "배경" },
    { itemIndex: 11, itemName: "빨간색 배경", itemCategory: "배경" },
    { itemIndex: 12, itemName: "파란색 모자", itemCategory: "모자" },
    { itemIndex: 13, itemName: "갈색 모자", itemCategory: "모자" },
    { itemIndex: 14, itemName: "초록색 모자", itemCategory: "모자" },
    { itemIndex: 15, itemName: "보라색 모자", itemCategory: "모자" },
    { itemIndex: 16, itemName: "빨간색 모자", itemCategory: "모자" },
    { itemIndex: 17, itemName: "파란색 이너", itemCategory: "이너" },
    { itemIndex: 18, itemName: "갈색 이너", itemCategory: "이너" },
    { itemIndex: 19, itemName: "초록색 이너", itemCategory: "이너" },
    { itemIndex: 20, itemName: "보라색 이너", itemCategory: "이너" },
    { itemIndex: 21, itemName: "빨간색 이너", itemCategory: "이너" },
    { itemIndex: 23, itemName: "파란색 바지", itemCategory: "바지" },
    { itemIndex: 24, itemName: "갈색 바지", itemCategory: "바지" },
    { itemIndex: 25, itemName: "초록색 바지", itemCategory: "바지" },
    { itemIndex: 26, itemName: "보라색 바지", itemCategory: "바지" },
    { itemIndex: 27, itemName: "빨간색 바지", itemCategory: "바지" },
    { itemIndex: 28, itemName: "파란색 치마", itemCategory: "치마" },
    { itemIndex: 29, itemName: "갈색 치마", itemCategory: "치마" },
    { itemIndex: 30, itemName: "초록색 치마", itemCategory: "치마" },
    { itemIndex: 31, itemName: "보라색 치마", itemCategory: "치마" },
    { itemIndex: 32, itemName: "빨간색 치마", itemCategory: "치마" },
  ];

  const renderAvatarImages = () => {
    // 이미지 초기화
    setLoadedImages([]);

    // 만약 "전체"가 선택되었다면 모든 속성 출력
    if (selectedButton === "전체") {
      const avatarAttributes = buttonImageMap.filter((el) => el !== "전체");
      const newImages = avatarAttributes.flatMap((attribute) =>
        avatarinfo
          .filter((item) => item.itemCategory === attribute)
          .map((item) => ({
            category: attribute,
            itemName: item.itemName,
            itemIndex: item.itemIndex,
          }))
      );
      // 이미지 업데이트
      setLoadedImages(newImages);
    } else {
      // 그렇지 않다면 선택된 속성만 출력
      const newImages = avatarinfo
        .filter((item) => item.itemCategory === selectedButton)
        .map((item) => ({
          category: selectedButton,
          itemName: item.itemName,
          itemIndex: item.itemIndex,
        }));
      // 이미지 업데이트
      setLoadedImages(newImages);
    }
  };

  useEffect(() => {
    // 렌더링 시에 이미지를 초기화하고 렌더링
    renderAvatarImages();
  }, [selectedButton]); // selectedButton이 변경될 때마다 실행

  /* 페이징 */
  const handlePageChange = (e) => {
    setCurrentPage(e);
    setCurrentImages((e - 1) * postsPerPage);
    setLimit((e - 1) * postsPerPage + postsPerPage);
    console.log(currentImages);
    console.log(limit);
  };
  const imagesPerPage = 8;

  // 전체 페이지 갯수를 계산
  const totalPages = Math.ceil(loadedImages.length / imagesPerPage);

  // 1부터 전체페이지 갯수 배열로 저장
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const pageButtons = pageNumbers.map((pageNumber) => (
    <button
      className={`bg-[#f0f0f0] border-2 p-3 rounded-xl mx-2 border-black ${
        currentPage === pageNumber
          ? "bg-black text-white"
          : "bg-[#f0f0f0] text-black"
      }`}
      key={pageNumber}
      id={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  ));

  return (
    <div className="dashboard mt-24 fixed right-0 avatorBoardPageBody h-[54rem]">
      <div className="overflow-y-scroll h-full">
        <h2 className="font-bold">AVATAR</h2>
        <div className="ml-20 flex justify-start space-x-2 mb-4">
          {buttonImageMap.map((buttonName) => (
            <Button
              key={buttonName}
              className={`bg-[#f0f0f0] border-2 border-black ${
                selectedButton === buttonName
                  ? "bg-black text-white"
                  : "bg-[#f0f0f0] text-black"
              }`}
              variant="ghost"
              onClick={() => handleButtonClick(buttonName)}
            >
              {buttonName}
            </Button>
          ))}
        </div>
        <hr />
        <div class="row container m-auto">
          {/* 이미지를 렌더링 */}
          {loadedImages.slice(currentImages, limit).map((image) => (
            <AvatarImg
              key={image.fileName}
              category={image.category}
              itemName={image.itemName}
              itemIndex={image.itemIndex}
            />
          ))}
          <div class="flex m-auto place-content-center">{pageButtons}</div>
          <div class='mb-6 h-7'></div>
        </div>
      </div>
    </div>
  );
}

export default AvatarPage;
