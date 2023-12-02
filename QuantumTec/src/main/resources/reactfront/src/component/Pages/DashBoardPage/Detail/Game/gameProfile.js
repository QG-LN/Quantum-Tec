import React, { useState, useEffect } from 'react';
import ProfileInfo from './gameProfileInfo';
import AccountManagement from './accountManagement';
import GameItems from './gameItems';
import ActivityGraph from './activityGraph';

import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LogDetail from './gameLogDetail';
import {axiosRequest} from '../../../../Utils/networkUtils';

function GameProfile({loadState}) {
  // const location = useLocation();
  // const [state, setState] = useState(location.state ? location.state.row : {});
  const states = useSelector(state => state.dashboardUserProfile.dashboardUserList);
  const { id } = useParams();
  const [state, setState] = useState(states.filter(e => e.userIndex === parseInt(id))[0]);

  useEffect(() => {
    console.log(state)
    if (!state?.gameIndex) {
        // userIndex가 없다면, 요청을 보내지 않습니다.
        setState(loadState);
        return;
    }
    const path = 'dashboard/gameinfo';
    const body = {
      gameIndex: state?.gameIndex
    }
    axiosRequest(path, body, 'POST', 'json')
        .then((response) => {
            setState(prevState => ({ ...prevState, ...response }));
        })
        .catch((error) => {
            console.log(error);
        });
}, [state?.gameIndex]);

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
                <GameItems state={state} />
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
