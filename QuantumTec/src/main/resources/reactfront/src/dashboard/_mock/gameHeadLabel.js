import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const gameHeadLabel = [
    { id: 'gameIndex', label: '번호',minWidth: '70px', align: 'center' },
    { id: 'gameName', label: '게임이름' , align: 'center'},
    { id: 'gamePrice', label: '가격' , align: 'center'},
    { id: 'gameDeveloper', label: '개발자', align: 'center'},
    { id: 'gameCategoryName', label: '장르', align: 'center'},
    { id: 'gameReleaseDate', label: '출시일', align: 'center' },
    { id: 'gameRating', label: '평가' ,minWidth: '70px', align: 'center'},
    { id: ''}
    ];

export default gameHeadLabel;
