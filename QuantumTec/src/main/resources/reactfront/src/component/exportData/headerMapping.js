/**
 * 엑셀 파일의 헤더와 매핑되는 객체
 */

// 유저 정보[메인 정보]
const headerMappingUser ={
	"번호" : "userID",
	"레벨" : "userLevel",
	"닉네임": "userNickName",
	"이름" : "userName",
	"현재 상태" : "userStatus",
	"보유 캐시" : "userCash",
	"출석 일수" : "userAttendance",
	"undefined" : "none"
}

// 유저 정보[결제 내역]
const headerMappingUserPayment ={
	"번호" : "paymentIndex",
	"상품 종류" : "productType",
	"상품 명칭" : "productName",
	"결제 금액" : "paymentAmount",
	"결제 수단" : "paymentMethod",
	"결제 상태" : "paymentStatus",
	"결제 일자" : "paymentDate",
}


// 유저 정보[활동 사항] -- 수정 필요
const headerMappingUserActive={
	"활동사항" : "tableName",
	"활동내용" : "newValue",
	"활동자" : "operatedBy",
	"활동시간" : "timestamp",

}

// 게임 정보[메인 정보]
const headerMappingGame = {
	"번호" : "gameIndex",
	"게임 이름" : "gameName",
	"가격" : "gamePrice",
	"개발자" : "gameDeveloper",
	"장르" : "gameGenre",
	"출시일" : "gameReleaseDate",
	"평가" : "gameRating",
}

export {headerMappingUser, headerMappingUserPayment, headerMappingUserActive, headerMappingGame};