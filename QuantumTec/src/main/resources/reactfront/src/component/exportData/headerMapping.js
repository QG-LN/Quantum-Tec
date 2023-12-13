/**
 * 엑셀 파일의 헤더와 매핑되는 객체
 */

// 유저 정보[메인 정보]
const handlerMappingUser ={
	"번호" : "userID",
	"레벨" : "userLevel",
	"닉네임": "userNickname",
	"이름" : "userName",
	"현재 상태" : "userStatus",
	"보유 캐시" : "userCash",
	"출석 일수" : "userAttendance",
	"undefined" : "none"
}

// 유저 정보[결제 내역]
const handlerMappingUserPayment ={
	"번호" : "paymentIndex",
	"상품 종류" : "productType",
	"상품 명칭" : "productName",
	"결제 금액" : "paymentAmount",
	"결제 수단" : "paymentMethod",
	"결제 상태" : "paymentStatus",
	"결제 일자" : "paymentDate",
}


// 유저 정보[활동 사항] -- 수정 필요
const handlerMappingUserActive={
	"활동사항" : "tableName",
	"활동내용" : "newValue",
	"활동자" : "operatedBy",
	"활동시간" : "timestamp",

}

// 게임 정보[메인 정보]
const handlerMappingGame = {
	"번호" : "gameIndex",
	"게임이름" : "gameName",
	"가격" : "gamePrice",
	"개발자" : "gameDeveloper",
	"장르" : "gameCategoryName",
	"출시일" : "gameReleaseDate",
	"평가" : "gameRating",
}

// 게임 정보[결제 내역]
const handlerMappingGamePayment = {
	"번호" : "paymentIndex",
	"결제자" : "userId",
	"결제 금액" : "paymentAmount",
	"결제 수단" : "paymentMethod",
	"결제 상태" : "paymentStatus",
	"결제 일자" : "paymentDate",
}

// 게임 정보 [댓글 내역]
const handlerMappingGameComment = {
	"사용자명" : "userName",
	"댓글 내용" : "commentContent",
	"댓글 작성 시간" : "commentCreatedDate",
	"평점" : "commentRating",
	"추천 수" : "commentUpvote",
	"비추천 수" : "commentDownvote"
}

// 게시글 정보 [메인 정보]
const handlerMappingPost = {
	"번호" : "postIndex",
	"게시판" : "boardTitle",
	"게시글명" : "postTitle",
	"사용자명" : "postAuthorName",
	"작성일자" : "postCreatedDate",
	"조회수" : "postViews",
	"추천수" : "postUpvotes",
	"댓글수" : "postComments",
}

const handlerMappingPostComment = {
	"번호" : "commentIndex",
	"사용자명" : "commentWriter",
	"댓글 내용" : "commentContent",
	"댓글 작성 시간" : "commentCreatedDate",
	"평점" : "commentRating",
	"추천 수" : "commentUpvote",
	"비추천 수" : "commentDownvote"
}

// 아바타 정보 [구매 내역]
const handleMappingAvatarPayment = {
	"번호" : "paymentIndex",
	"결제자" : "userNickName",
	"결제 금액" : "paymentAmount",
	"결제 수단" : "paymentMethod",
	"결제 일자" : "paymentDate",
	"결제 상태" : "paymentStatus",
}

export {handlerMappingUser, handlerMappingUserPayment, handlerMappingUserActive, 
	handlerMappingGame, handlerMappingGamePayment, handlerMappingGameComment,
	handlerMappingPost, handlerMappingPostComment,
	handleMappingAvatarPayment};