import React, { useEffect, useState } from 'react';
import TablePage from '../../tablePage';
import LogDetailTableRow from '../../../log-detail-table-row';
import {axiosRequest} from '../../../../Utils/networkUtils';
import ActivityGraph from './activityGraph';
function LogDetail({state}) {
    const logDetailHeadLabel = [
        // { id: 'activeTitle', label: '활동사항', align: 'center' },
        // { id: 'activeContent', label: '활동내용', align: 'center' },
        // { id: 'activeChanger', label: '활동자', align: 'center' },
        // { id: 'activeChangeDate', label: '활동시간', align: 'center'}

        // mayone
        { id: 'columnName', label: '활동사항', align: 'center' },
        { id: 'newValue', label: '활동내용', align: 'center' },
        { id: 'operatedBy', label: '활동자', align: 'center' },
        { id: 'timestamp', label: '활동시간', align: 'center'}
    ];

    const [logData, setLogData] = useState([]);
    useEffect(() => {
        if(!state?.userID){
            return;
        }
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
            {/* <TablePage margin={false} createButton={false} title={"활동사항_"+state.userName} dataRow={LogDetailTableRow} dataLabel={logDetailHeadLabel} data={logData} /> */}

            { state?.userID && (
                <TablePage margin={false} createButton={false} title={"활동사항_"+state.userName} dataRow={LogDetailTableRow} dataLabel={logDetailHeadLabel} data={logData} />
            )}

            <div className='m-5'></div>
            <ActivityGraph logData={logData} />
        </>
    );
}

export default LogDetail;
