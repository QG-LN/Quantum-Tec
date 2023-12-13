import React, { useState, useEffect } from 'react';
import ProfileInfo from './avatarProfileInfo';
import AccountManagement from './accountManagement';
import AvatarItems from './avatarItems';
import ActivityGraph from './activityGraph';
import { useLocation } from "react-router";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from 'react-router-dom';
import {axiosRequest} from '../../../../Utils/networkUtils';
import { useDispatch } from 'react-redux';
import { setDashboardAvatarProfileList } from '../../../../../redux/actions/dashboardAvatarProfileAction.js';
import { getData } from '../../../DashBoardPage/Data/loadTableDataList.js';


function AvatarProfile() {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const { state } = useLocation();

  const [avatarInfo, setAvatarInfo] = useState({});

  useEffect(() => {

    getData("dashboard/avatarlist")
      .then((data) => {
        setItemsData(data);
        dispatch(setDashboardAvatarProfileList(data));
      })
      .catch((error) => {
        console.error("데이터 로딩 중 오류 발생", error);
      });

    // 상세 정보를 불러오기 위한 요청
    const path = "dashboard/avatarinfo";
    const body = {
      itemIndex: state?.itemIndex,
    };
    axiosRequest(path, body, "POST", "json")
      .then((response) => {
        setAvatarInfo(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Styles = styled("div")({
    "@media (min-width: 1200px)": {
      marginLeft: "279px",
    },
  });

  return (
    <Styles>
      <Container maxWidth="xl">
        <div className="mt-[100px]"></div>
        <div className="text-left">
          <ProfileInfo state={state} avatarInfo={avatarInfo} setState={setAvatarInfo} />
          <div className="m-5"></div>
          <AvatarItems state={state} />
          {/* <div className='m-5'></div>
                <LogDetail state={state} /> */}
          <div className="m-5"></div>
          <ActivityGraph state={state} />
          <div className="m-5"></div>
          {/* <AccountManagement state={state} /> */}
        </div>
      </Container>
    </Styles>
  );
}

export default AvatarProfile;
