import React from 'react';

function ActivityLog() {
    const activityLog = {
        lastLogin: "2022-10-01",
        mainGameCategory: "RPG",
        commentCount: 50
    };

    return (
        <div className="activity-log">
            <h2>활동 로그</h2>
            <table className='d-flex justify-content-start table table-hover'>
                <tbody>
                    <tr>
                        <th>최근 로그인 날짜</th>
                        <th>주 게임 카테고리</th>
                        <th>댓글 작성</th>
                    </tr>
                    <tr>
                        <td>{activityLog.lastLogin}</td>
                        <td>{activityLog.mainGameCategory}</td>
                        <td>{activityLog.commentCount}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}

export default ActivityLog;
