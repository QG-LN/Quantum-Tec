import { useState } from "react";
import "../../../styles.css";

//my page에서 select값을 가져와 setSelect으로 값을 변경한다.
export default function Myaside({ select, setSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const astyle = {
    textDecorationLine: "none",
    color: "black",
  };
  //css 부분 나중에 옮길것
  const asideStyle = {
    padding: "0px",
    height: "82vh",
  };
  const listStyle = {
    height: "5vh",
  };
  const uiStyle = {
    listStyleType: "none",
    paddingLeft: "0px",
  };

  //카테고리 리스트 설정
  const [list, setList] = useState(["마이페이지", "사용자설정"]);
  const [list2, setList2] = useState(["결제방식", "회원탈퇴"]);
  const [listsub, setListsub] = useState(["개인정보변경", "아바타설정"]);

  // 카테고리 클릭시 해당 값을 mypage에 전송
  const handleClick = (e) => {
    if (typeof e.target.text === "undefined") {
      return;
    } else {
      setSelect(e.target.text);
    }
    // console.log(e.target.list);
    // console.log(e.target);
    // console.log(e.target.text);
    if (e.target.text === "사용자설정") {
      setIsOpen(!isOpen);
    } else if (e.target.text === "개인정보변경") {
      setIsOpen(isOpen);
    } else if (e.target.text === "아바타설정") {
      setIsOpen(isOpen);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="min-w-[280px] w-[280px] float-left mt-40">
      <aside style={asideStyle}>
        <div>
          <h2 class=" border-b-4 border-green-500 rounded-md pb-4">카테고리</h2>
          <ul class="asideul" style={uiStyle}>
            {list.map((item, index) => (
              // <li class='listyle' style={listStyle} key={index} onClick={handleClick}><a class='astyle' style={astyle}>{item}</a></li>
              <li
                class="listyle text-xl border-b hover:cursor-pointer"
                style={listStyle}
                key={index}
                onClick={handleClick}
                name={item}
              >
                <a class="astyle" style={astyle}>
                  {item}
                </a>
              </li>
            ))}
            {isOpen && (
              <ul class="sublist  ml-[-30px]">
                {listsub.map((item, index) => (
                  <li
                    name="sublist"
                    class="pb-3 border-b text-sm mt-3 listyle hover:cursor-pointer"
                    key={index}
                    onClick={handleClick}
                  >
                    <a>{item}</a>
                  </li>
                ))}
              </ul>
            )}
            {list2.map((item, index) => (
              // <li class='listyle' style={listStyle} key={index} onClick={handleClick}><a class='astyle' style={astyle}>{item}</a></li>
              <li
                class="border-b listyle text-xl hover:cursor-pointer"
                style={listStyle}
                key={index}
                onClick={handleClick}
              >
                <a class="astyle" style={astyle}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
