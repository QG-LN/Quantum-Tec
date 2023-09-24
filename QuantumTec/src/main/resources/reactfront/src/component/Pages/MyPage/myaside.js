import { useState } from "react";
import "../../../styles.css";

//my page에서 select값을 가져와 setSelect으로 값을 변경한다.
export default function Myaside({ select, setSelect }) {
  const [isOpen, setIsOpen] = useState(false);                    // 카테고리 선택에 서브메뉴 활성화 여부

  const [nowChoiceMenu, setNowChoiceMenu] = useState("마이페이지");         // 현재 선택된 메뉴

  //카테고리 리스트 설정
  const menuItems = [
    { item: "마이페이지" },
    { item: "사용자설정", subItems: ["개인정보변경", "아바타설정"] },
    { item: "결제내역" },
    { item: "회원탈퇴" },
  ];

  // 카테고리 클릭시 해당 값을 mypage에 전송
  const handleClick = (menuItem) => {
    if (typeof menuItem.item !== "undefined") {
      setSelect(menuItem.item);
    }

    if (menuItem.subItems) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleMenuClick = (menuItem) => {
    setNowChoiceMenu(menuItem.item);
  }

  return (
    <div className="min-w-[280px] w-[280px] float-left mt-40">
      <aside style={{ padding: "0px", height: "82vh" }}>
        <div>
          <h2 className="border-b-4 border-green-500 rounded-md pb-4">카테고리</h2>
          <ul className="list-unstyled">
            {menuItems.map((menuItem, index) => (
              <li
                className={`text-xl border-b py-3 cursor-pointer`}
                key={index}
                onClick={() => handleClick(menuItem)}
                name={menuItem.item}
              >
                <div class={`hover:bg-gray-300 rounded-3 ${menuItem.item === nowChoiceMenu ? "bg-gray-300 rounded-3" : ""}`} 
                      onClick={()=> handleMenuClick(menuItem)}>
                  {menuItem.item}
                </div>
                {menuItem.subItems && isOpen && (
                  <ul className="list-unstyled m-3 ">
                    {menuItem.subItems.map((subItem, subIndex) => (
                      <li
                        name="sublist"
                        className="text-sm py-3 cursor-pointer"
                        key={subIndex}
                        onClick={() => handleClick({ item: subItem })}
                      >
                        <div class="hover:bg-gray-300 rounded-3">{subItem}</div>
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
