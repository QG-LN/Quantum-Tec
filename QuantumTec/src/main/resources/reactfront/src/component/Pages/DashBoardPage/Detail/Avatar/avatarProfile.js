import React, { useState, useEffect } from 'react';
import ProfileInfo from './avatarProfileInfo';
import AccountManagement from './accountManagement';
import AvatarItems from './avatarItems';
import ActivityGraph from './activityGraph';
import { useLocation } from "react-router";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LogDetail from './avatarLogDetail';
import {axiosRequest} from '../../../../Utils/networkUtils';
import { useDispatch } from 'react-redux';
import { setDashboardAvatarProfileList } from '../../../../../redux/actions/dashboardAvatarProfileAction.js';
import { getData } from '../../../DashBoardPage/Data/loadTableDataList.js';
function AvatarProfile() {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const { state } = useLocation();
  console.log(state);
  useEffect(() => {
    
    getData("dashboard/avatar")
      .then(data => {
        setItemsData(data);
        dispatch(setDashboardAvatarProfileList(data));
      })
      .catch(error => {
        console.error("데이터 로딩 중 오류 발생", error);
      });
  }, []);
  
  
  // const location = useLocation();
  // const [state, setState] = useState(location.state ? location.state.row : {});
 
  const { id } = useParams();
  const defaultState = { };
  // const [state, setState] = useState(states ? states.filter(e => e.itemIndex === parseInt(id))[0] || defaultState : defaultState);
  
//   useEffect(() => {
//     if (!state?.gameIndex) {
//         // userIndex가 없다면, 요청을 보내지 않습니다.
//         setState(loadState);
//         return;
//     }
//     const path = 'dashboard/gameinfo';
//     const body = {
//       gameIndex: state?.gameIndex
//     }
//     axiosRequest(path, body, 'POST', 'json')
//         .then((response) => {
//             setState(prevState => ({ ...prevState, ...response }));
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }, [state?.gameIndex]);

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

        <Container maxWidth="xl" >
            <div className='mt-[100px]'></div>
            <div className='text-left'>
                <ProfileInfo state={state} />
                <div className='m-5'></div>
                <AvatarItems state={state} />
                {/* <div className='m-5'></div>
                <LogDetail state={state} /> */}
                <div className='m-5'></div>
                <ActivityGraph state={state} />
                <div className='m-5'></div>
                <AccountManagement state={state} />
            </div>
        </Container>
    </Styles>
  );
}

export default AvatarProfile;
