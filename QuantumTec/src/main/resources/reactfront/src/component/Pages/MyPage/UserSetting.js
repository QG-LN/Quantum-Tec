import React, { useState } from "react";
import { axiosRequest } from "../../Utils/networkUtils";
import "../../../styles.css";
import PasswordChk from "./passwordChk";
import { Link } from "react-router-dom";

export default function UserSetting({category}) {

	// 아바타 인벤토리로 이동시키는 요소를 랜더링
	const renderMyAvatar = () =>{
		return (
			<div class="mt-[120px]">
				<button
					class="w-[300px] h-[50px] ml-8 border-2 shadow-sm rounded-xl border-green-400">
                        <Link to="/inventory" 
                            className="px-3 py-2 items-center text-xl uppercase font-bold leading-snug text-black hover:opacity-75 hover:cursor-pointer text-decoration-none">
                            <span className="text-center">아바타 인벤토리로 이동</span>
                        </Link>
				</button>
		  	</div>
		)
	}
	
	const checkCategory = () => {
		console.log(category);
		switch(category){
			case "개인정보변경":
				return <PasswordChk/>
			case "내 아바타":
				return renderMyAvatar();
			default:
				return <PasswordChk/>
		}
	}

	return (
		<div>
			<h2 class="account_main_page_title ">{category}</h2>
			{checkCategory()}
		</div>
	)

}