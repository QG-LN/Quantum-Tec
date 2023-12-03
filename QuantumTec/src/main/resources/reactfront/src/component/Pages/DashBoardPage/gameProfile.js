import React, { useState, useEffect } from 'react';
import ProfileInfo from './Detail/Game/profileInfo';
import AccountManagement from './Detail/Game/accountManagement';
import UserItems from './Detail/Game/userItems';
import ActivityLog from './Detail/Game/activityLog';
import ActivityGraph from './Detail/Game/activityGraph';
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation } from 'react-router-dom';
import {axiosRequest} from '../../Utils/networkUtils';
import LogDetail from './Detail/Game/logDetail';
function GameProfile() {
  const location = useLocation();
  const [state, setState] = useState(location.state ? location.state.row : {});
  
  useEffect(() => {
    if (!state.userIndex) {
        // userIndex가 없다면, 요청을 보내지 않습니다.
        return;
    }
    const path = 'dashboard/userinfo';
    const body = {
        userIndex: state.userIndex
    }
    axiosRequest(path, body, 'POST', 'json')
        .then((response) => {
            setState(prevState => ({ ...prevState, ...response }));
        })
        .catch((error) => {
            console.log(error);
        });
}, [state.userIndex]);
  const Styles = styled("div")({
    "@media (min-width: 1200px)": {
      marginLeft: "279px",
    },
  });

  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <Styles>

        <Container maxWidth="xl">
            <div className='mt-[100px]'></div>
            <div className='text-left'>

                <ProfileInfo state={state} setState={setState}/>
                <div className='m-5'></div>
                <UserItems state={state} />
                <div className='m-5'></div>
                <LogDetail state={state} />
                <div className='m-5'></div>
                <ActivityGraph state={state} />
                <div className='m-5'></div>
                <AccountManagement state={state} />
            </div>
        </Container>
    </Styles>
  );
}

export default GameProfile;
