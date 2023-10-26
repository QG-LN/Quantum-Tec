import React from 'react';
import ProfileInfo from './Detail/profileInfo';
import AccountManagement from './Detail/accountManagement';
import UserItems from './Detail/userItems';
import ActivityLog from './Detail/activityLog';
import ActivityGraph from './Detail/activityGraph';

import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
function UserProfile() {
  // API 호출 등을 통해 userId에 해당하는 사용자의 상세 정보를 가져옵니다.
  
  const Styles = styled("div")({
    "@media (min-width: 1200px)": {
      marginLeft: "279px",
    },
  });
  return (
    <Styles>

        <Container maxWidth="xl">
            <div className='mt-[100px]'></div>
            <div className='text-left'>

                <ProfileInfo />
                <div className='m-5'></div>
                <UserItems />
                <div className='m-5'></div>
                <ActivityLog />
                <div className='m-5'></div>
                <ActivityGraph />
                <div className='m-5'></div>
                <AccountManagement />
            </div>
        </Container>
    </Styles>
  );
}

export default UserProfile;
