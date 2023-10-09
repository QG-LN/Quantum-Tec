import { useState } from "react";
import "../../../styles.css";

//my page에서 select값을 가져와 setSelect으로 값을 변경한다.
export default function Myaside({ select, setSelect }) {
  const [isOpen, setIsOpen] = useState(false); // 카테고리 선택에 서브메뉴 활성화 여부

  const [nowChoiceMenu, setNowChoiceMenu] = useState("마이페이지"); // 현재 선택된 메뉴
  const [nowSubMenu, setNowSubMenu] = useState(""); // 현재 선택된 서브메뉴

  //카테고리 리스트 설정
  const menuItems = [
    { item: "대시보드" },
    { item: "사용자설정", subItems: [{ item: "개인정보변경" }, { item: "내 아바타" }] },
    { item: "결제내역" },
    { item: "회원탈퇴" },
  ];

  // 카테고리 클릭시 해당 값을 mypage에 전송
  const handleClick = (menuItem) => {
    if (menuItem.subItems) {
      // 사용자설정의 하위 아이템을 클릭한 경우에만 isOpen 상태를 유지
      setIsOpen((prevIsOpen) => menuItem.item === nowChoiceMenu ? !prevIsOpen : true);
    } else {
      setIsOpen(false);
      setSelect(menuItem.item);
    }
    setNowChoiceMenu(menuItem.item);
  };

  return (
    <div className="min-w-[280px] w-[280px] float-left mt-40">
      <aside style={{ padding: "0px", height: "82vh" }}>
        <div>
          <h2 className="border-b-4 border-green-500 rounded-md pb-4">
            카테고리
          </h2>
          <ul className="list-unstyled">
            {menuItems.map((menuItem, index) => (
              <li
                className={`text-xl border-b py-3 cursor-pointer`}
                key = {index}
                onClick={() => handleClick(menuItem)}
              >
                <div
                  className={`hover:bg-gray-300 rounded-3 ${
                    menuItem.item === nowChoiceMenu
                      ? "bg-gray-300 rounded-3"
                      : ""
                  }`}
                >
                  {menuItem.item}
                </div>
                {menuItem.subItems && isOpen && (
                  <ul className="list-unstyled m-3 ">
                    {menuItem.subItems.map((subItem, subIndex) => (
                      <li
                        name="sublist"
                        className="text-sm py-3 cursor-pointer"
                        key={subIndex}
                        onClick={() => {
                          handleClick({ item: subItem.item });
                          setNowSubMenu(subItem.item);
                        }}
                      >
                        <div
                          className={`hover:bg-gray-300 rounded-3 ${
                            subItem.item === nowSubMenu ? "bg-gray-300 rounded-3" : ""
                          }`}
                        >
                          {subItem.item}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
