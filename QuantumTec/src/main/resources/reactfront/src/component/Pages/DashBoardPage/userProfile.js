import React, { useState, useEffect } from 'react';
import ProfileInfo from './Detail/profileInfo';
import AccountManagement from './Detail/accountManagement';
import UserItems from './Detail/userItems';
import ActivityLog from './Detail/activityLog';
import ActivityGraph from './Detail/activityGraph';

import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation } from 'react-router-dom';
import {axiosRequest} from '../../Utils/networkUtils';
import LogDetail from './Detail/logDetail';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
function UserProfile({loadState}) {
  const location = useLocation();
  // const [state, setState] = useState(location.state ? location.state.row : {});
  const { id } = useParams();
  const dispatch = useDispatch();
  const states = useSelector(state => state.dashboardUserProfile.dashboardUserList);
  const [state, setState] = useState(states.filter(e => e.userIndex === parseInt(id))[0]);
  
  useEffect(() => {
    if (!state?.userIndex) {
        // userIndex가 없다면, 요청을 보내지 않습니다.
        setState(loadState);
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
}, [state?.userIndex]);
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

export default UserProfile;
