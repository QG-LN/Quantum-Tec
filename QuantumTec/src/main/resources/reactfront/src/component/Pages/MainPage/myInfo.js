import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Myinfo(){
    const [userData, setUserData] = useState('')

    useEffect(()=>{
        const inputId = localStorage.getItem("inputId");
        const inputPw = localStorage.getItem("inputPw");
        axios.post('/myinfo', {
            userID: inputId,
            userPW: inputPw,
        })
            .then(res=>{
                setUserData(res.data);
            })
            .catch(err => console.log(err));
    },[]);

    const userProperties = [
        'userIdx', 'userID', 'userPW', 'userNickname', 'userName', 'userBirth',
        'userAddress', 'userAddressDetail', 'userPostal', 'userEmail',
        'statusIdx', 'userRole', 'userStatus', 'userUpdatedAt', 'userCash'
    ];

    const renderUserProperties = () => {
        return userProperties.map(property => (
            <div key={property}>
                {property}: {userData[property]} <br />
            </div>
        ));
    }

    return (
        <div>
            {renderUserProperties()}
        </div>
    );
}