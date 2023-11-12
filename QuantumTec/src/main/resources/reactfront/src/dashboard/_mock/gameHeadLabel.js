import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const gameHeadLabel = [
    { id: 'index', label: '번호',minWidth: '70px', align: 'center' },
    { id: 'name', label: '게임이름' , align: 'center'},
    { id: 'price', label: '가격' , align: 'center'},
    { id: 'company', label: '게임 회사', align: 'center'},
    { id: 'category', label: '장르', align: 'center'},
    { id: 'day', label: '출시일', align: 'center' },
    { id: 'review', label: '평가' ,minWidth: '70px', align: 'center'},
    { id: ''}
    ];

export default gameHeadLabel;
