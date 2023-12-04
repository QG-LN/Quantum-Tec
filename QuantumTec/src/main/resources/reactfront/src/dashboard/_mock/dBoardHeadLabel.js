import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const dBoardHeadLabel = [
    { id: 'postIndex', label: '번호',minWidth: '70px' },
    { id: 'boardCategoryName', label: '게시판' , align: 'center'},
    { id: 'postTitle', label: '게시글명' , align: 'center'},
    { id: 'postAuthorName', label: '사용자명', align: 'center'},
    { id: 'postCreatedDate', label: '작성일자', align: 'center'},
    { id: 'postViews', label: '조회수', align: 'center' },
    { id: 'postUpvotes', label: '추천수',minWidth: '80px', align: 'center' },
    { id: 'postComments', label: '댓글수',minWidth: '80px', align: 'center' },
    { id: ''}
    ];

export default dBoardHeadLabel;
