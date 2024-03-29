import React, { useEffect, useState } from 'react';
import TablePage from '../../gamePage';
import LogDetailTableRow from '../../../log-detail-table-row';
import {axiosRequest} from '../../../../Utils/networkUtils';

function LogDetail({state}) {
    const logDetailHeadLabel = [
        { id: 'title', label: '활동사항', align: 'center' },
        { id: 'content', label: '활동내용', align: 'center' },
        { id: 'changer', label: '활동자', align: 'center' },
        { id: 'changeDate', label: '활동 시간', align: 'center'}
    ];

    // const [logData, setLogData] = useState([]);
    // useEffect(() => {
    //     const path = 'dashboard/userinfo/activitylogdetail';
    //     const body = {
    //         userId: state.userID
    //     };
    //     axiosRequest(path, body, 'POST', 'json')
    //         .then((response) => {
    //             // setLogData(response);
    //             console.log(response);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);
    const logData = [{
        name: '1',
        price: '1000',
        company: '1',
        category: '1',
        day: '1',
        review: '1'
    }];

    
    return (
        <>
            <TablePage margin={false} createButton={false} title={"활동 사항"} dataRow={LogDetailTableRow} dataLabel={logDetailHeadLabel} data={logData} />
        </>
    );
}

export default LogDetail;
