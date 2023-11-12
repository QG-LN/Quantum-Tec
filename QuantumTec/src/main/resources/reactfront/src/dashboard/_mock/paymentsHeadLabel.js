import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const paymentsHeadLabel = [
    { id: 'index', label: '번호', minWidth: '70px', align: 'center'},
    { id: 'payhistory', label: '결제내역', align: 'center' },
    { id: 'userid', label: '사용자ID' , align: 'center'},
    { id: 'paytype', label: '결제유형', align: 'center'},
    { id: 'payday', label: '결제일시', align: 'center' },
    { id: 'paystates', label: '결제상태' , minWidth: '120px', align: 'center'},
    { id: ''}
    ];

export default paymentsHeadLabel;
