import React, { useState } from "react";
import Mysection from "./mysection";
import Myaside from "./myaside";
import MyPaymentDetails from "./MyPaymentDetails";
import Dismember from "./dismember";
import PasswordChk from "./passwordChk";
import MyMain from "./mypage";

export default function Mypage() {
  //카테고리 선택에 따른 값 업데이트
  const [select, setSelect] = useState("");

  return (
    <div className="max-w-[1230px] m-auto pb-20 box-border">
      <div>
        <aside style={{ flexBasis: "15%" }}>
          <Myaside select={select} setSelect={setSelect} />
        </aside>
        <section style={{ flexBasis: "85%" }}>
          <div>
            {select === "마이페이지" || select === "" ? (
              <MyMain select={select} setSelect={setSelect} />
            ) : (
              <div />
            )}
            {select === "사용자설정" ? <PasswordChk /> : <div />}
            {select === "개인정보변경" ? <PasswordChk /> : <div />}
            {/*아바타 페이지 연결해주세요. 연결 후 삭제 플리즈 */}
            {select === "아바타설정" ? <PasswordChk /> : <div />}
            {select === "결제내역" ? <MyPaymentDetails /> : <div />}
            {select === "회원탈퇴" ? <Dismember /> : <div />}
          </div>
        </section>
      </div>
    </div>
  );
}