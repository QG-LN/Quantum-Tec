import React, { useState } from "react";
import Myaside from "./myaside";
import MyPaymentDetails from "./MyPaymentDetails";
import Dismember from "./dismember";
import PasswordChk from "./passwordChk";
import MyDashboard from "./mypage";

export default function Mypage() {
  //카테고리 선택에 따른 값 업데이트
  const [select, setSelect] = useState("");

  // 카테고리 클릭시 해당 값을 mypage에 전송
  const renderMyPage = () => {
    switch (select) {
      case "대시보드":
        return <MyDashboard/>
      case "사용자설정":
        return <PasswordChk/>
      case "개인정보변경":
        return <PasswordChk/>
      case "내 아바타":
        return <PasswordChk/>
      case "결제내역":
        return <MyPaymentDetails/>
      case "회원탈퇴":
        return <Dismember/>
      default:
        return <MyDashboard/>
    }
  }

  return (
    <div className="max-w-[1230px] m-auto pb-20 box-border">
      <div>
        <aside style={{ flexBasis: "15%" }}>
          <Myaside select={select} setSelect={setSelect} />
        </aside>
        <section style={{ flexBasis: "85%" }}>
          <div class="mypagestyle float-right w-mypagesection max-w-[880px] relative min-w-[700px]">
             {renderMyPage()}
          </div>
        </section>
      </div>
    </div>
  );
}