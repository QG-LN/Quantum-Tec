import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ActivityLog({ userIndex }) {
    const navigate = useNavigate();
    const location = useLocation();

    // 변경 사항, 변경 내용, 변경 자, 변경 시간
    const activityLog = [{
        changeDetails: "게시글",
        changeDescription: "제목 -> 제목1",
        changer: "홍길동",
        changeTime: "2022-01-01 00:00:00"
    },
    {
        changeDetails: "댓글",
        changeDescription: "안녕하세요 -> 아니에요",
        changer: "홍길동",
        changeTime: "2022-01-01 00:00:00"
    },
    {
        changeDetails: "비밀번호",
        changeDescription: "***********",
        changer: "홍길동",
        changeTime: "2022-01-01 00:00:00"
    }
    ];

    const handleClickRow = (e) => {
        navigate(`${location.pathname}/log`);
    };
    return (
        <div className="activity-log">
            <h2>활동 로그</h2>
            <hr />
            <table className='table table-hover'>
                <tbody>
                    <tr>
                        <th className='w-[10%]'>활동 사항</th>
                        <th className='w-[60%]'>활동 내용</th>
                        <th className='w-[10%]'>활동 자</th>
                        <th className='w-[20%]'>활동 시간</th>
                    </tr>
                    {activityLog.map((activity, _) => {
                        return (
                            <tr key={activity.changeDetails} onClick={handleClickRow}>
                                <td>{activity.changeDetails}</td>
                                <td>{activity.changeDescription}</td>
                                <td>{activity.changer}</td>
                                <td>{activity.changeTime}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
}

export default ActivityLog;
