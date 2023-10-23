import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const gameHeadLabel = [
    { id: 'index', label: '번호' },
    { id: 'name', label: '게임이름' },
    { id: 'price', label: '가격' },
    { id: 'company', label: '게임 회사', align: 'center'},
    { id: 'category', label: '장르'},
    { id: 'day', label: '출시일' },
    { id: 'review', label: '평가' },
    { id: ''}
    ];

export default gameHeadLabel;
