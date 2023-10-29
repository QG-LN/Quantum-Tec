import React from 'react';

function ActivityLog() {
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

    return (
        <div className="activity-log">
            <h2>활동 로그</h2>
            <hr />
            <table className='table'>
                <tbody>
                    <tr>
                        <th className='w-[10%]'>변경 사항</th>
                        <th className='w-[60%]'>변경 내용</th>
                        <th className='w-[10%]'>변경 자</th>
                        <th className='w-[20%]'>변경 시간</th>
                    </tr>
                    {activityLog.map((activity, index) => {
                        return (
                            <tr key={index}>
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
