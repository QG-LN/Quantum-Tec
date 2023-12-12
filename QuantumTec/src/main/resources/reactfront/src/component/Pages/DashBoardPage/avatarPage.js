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
    { avatarId: 7, avatarColor: "파란색", itemCategory: "배경" },
    { avatarId: 8, avatarColor: "갈색", itemCategory: "배경" },
    { avatarId: 9, avatarColor: "초록색", itemCategory: "배경" },
    { avatarId: 10, avatarColor: "보라색", itemCategory: "배경" },
    { avatarId: 11, avatarColor: "빨간색", itemCategory: "배경" },
    { avatarId: 12, avatarColor: "파란색", itemCategory: "모자" },
    { avatarId: 13, avatarColor: "갈색", itemCategory: "모자" },
    { avatarId: 14, avatarColor: "초록색", itemCategory: "모자" },
    { avatarId: 15, avatarColor: "보라색", itemCategory: "모자" },
    { avatarId: 16, avatarColor: "빨간색", itemCategory: "모자" },
    { avatarId: 17, avatarColor: "파란색", itemCategory: "이너" },
    { avatarId: 18, avatarColor: "갈색", itemCategory: "이너" },
    { avatarId: 19, avatarColor: "초록색", itemCategory: "이너" },
    { avatarId: 20, avatarColor: "보라색", itemCategory: "이너" },
    { avatarId: 21, avatarColor: "빨간색", itemCategory: "이너" },
    { avatarId: 23, avatarColor: "파란색", itemCategory: "바지" },
    { avatarId: 24, avatarColor: "갈색", itemCategory: "바지" },
    { avatarId: 25, avatarColor: "초록색", itemCategory: "바지" },
    { avatarId: 26, avatarColor: "보라색", itemCategory: "바지" },
    { avatarId: 27, avatarColor: "빨간색", itemCategory: "바지" },
    { avatarId: 28, avatarColor: "파란색", itemCategory: "치마" },
    { avatarId: 29, avatarColor: "갈색", itemCategory: "치마" },
    { avatarId: 30, avatarColor: "초록색", itemCategory: "치마" },
    { avatarId: 31, avatarColor: "보라색", itemCategory: "치마" },
    { avatarId: 32, avatarColor: "빨간색", itemCategory: "치마" },
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
            filename: item.avatarColor + " " + attribute,
            avatarid: item.avatarId,
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
          filename: item.avatarColor + " " + selectedButton,
          avatarid: item.avatarId,
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

  // Calculate the total number of pages
  const totalPages = Math.ceil(loadedImages.length / imagesPerPage);

  // Create an array of page numbers from 1 to totalPages
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
              key={image.filename}
              category={image.category}
              filename={image.filename}
              avatarid={image.avatarid}
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
