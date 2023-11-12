import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const dBoardHeadLabel = [
    { id: 'index', label: '번호',minWidth: '70px' },
    { id: 'boardcategory', label: '게시판' , align: 'center'},
    { id: 'boardname', label: '게시글명' , align: 'center'},
    { id: 'user', label: '사용자명', align: 'center'},
    { id: 'day', label: '작성일자', align: 'center'},
    { id: 'views', label: '조회수', align: 'center' },
    { id: 'recommend', label: '추천수',minWidth: '80px', align: 'center' },
    { id: 'comment', label: '댓글수',minWidth: '80px', align: 'center' },
    { id: ''}
    ];

export default dBoardHeadLabel;
