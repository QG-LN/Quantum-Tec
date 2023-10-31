import React from 'react';
import TablePage from '../userPage';
import LogDetailTableRow from '../../log-detail-table-row';

function LogDetail() {
    const logDetailHeadLabel = [
        { id: 'title', label: '활동사항', align: 'center' },
        { id: 'content', label: '활동내용' },
        { id: 'changer', label: '활동자', align: 'center' },
        { id: 'changeDate', label: '활동 시간', align: 'center'},
        { id: ''}
    ];

    const logDetailData = [
        { title: '게시글', content: 'title: 제목 -> 제목1', changer: '홍길동', changeDate: '2022-01-01 00:00:00' },
        { title: '게시글', content: 'content: 내용 -> 아니에요', changer: 'admin', changeDate: '2022-01-01 00:00:00' },
        { title: '게시글', content: 'content: ㅁㄴㅇㄴㅁㅁㄴㅇ -> 내용', changer: '홍길동', changeDate: '2022-01-01 00:00:00' }
    ];

    return (
        <>
            <TablePage title={"활동 사항"} dataRow={LogDetailTableRow} dataLabel={logDetailHeadLabel} data={logDetailData} />
        </>
    );
}

export default LogDetail;
