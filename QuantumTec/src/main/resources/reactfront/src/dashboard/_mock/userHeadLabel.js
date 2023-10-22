import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const userHeadLabel = [
    { id: 'index', label: '번호' },
    { id: 'level', label: '레벨' },
    { id: 'nickname', label: '닉네임', align: 'center'},
    { id: 'name', label: '이름', align: 'center' },
    { id: 'status', label: '현재 상태' },
    { id: 'cash', label: '보유 캐시' },
    { id: 'days', label: '출석 일수' },
    { id: ''}
    ];

export default userHeadLabel;
