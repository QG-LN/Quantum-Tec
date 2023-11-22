import React, { useEffect, useState } from 'react';
import TablePage from '../userPage';
import LogDetailTableRow from '../../log-detail-table-row';
import {axiosRequest} from '../../../Utils/networkUtils';
function LogDetail({state}) {
    const logDetailHeadLabel = [
        { id: 'columnName', label: '활동사항', align: 'center' },
        { id: 'newValue', label: '활동내용', align: 'center' },
        { id: 'operatedBy', label: '활동자', align: 'center' },
        { id: 'timestamp', label: '활동 시간', align: 'center'}
    ];

    const [logData, setLogData] = useState([]);
    useEffect(() => {
        const path = 'dashboard/userinfo/activitylogdetail';
        const body = {
            userId: state.userID
        };
        axiosRequest(path, body, 'POST', 'json')
            .then((response) => {
                setLogData(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <TablePage margin={false} createButton={false} title={"활동 사항"} dataRow={LogDetailTableRow} dataLabel={logDetailHeadLabel} data={logData} />
        </>
    );
}

export default LogDetail;
