/**
 * 엑셀 파일의 헤더와 매핑되는 객체
 */

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

// const headerMappingPayment ={
// 	"번호" : "paymentIndex",
// 	"상품 종류" : "paymentType",
// 	"상품 이름" : "paymentName",
// }

export default headerMappingUser;