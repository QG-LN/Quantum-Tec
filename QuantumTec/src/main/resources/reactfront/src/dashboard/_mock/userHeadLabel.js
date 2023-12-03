import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const userHeadLabel = [
    { id: 'userIndex', label: '번호' },
    { id: 'userLevel', label: '레벨' },
    { id: 'userNickname', label: '닉네임', align: 'center'},
    { id: 'userName', label: '이름', align: 'center' },
    { id: 'userStatus', label: '현재 상태' },
    { id: 'userCash', label: '보유 캐시' },
    { id: 'userAttendance', label: '출석 일수' },
    { id: ''}
    ];

export default userHeadLabel;
