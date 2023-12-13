import React, { useEffect, useState }from 'react';

import { useTheme } from "@mui/material/styles";
import {
  AppConversionRates,
  AppWebsiteVisits,
} from "../../../../../dashboard/sections/@dashboard/app";
import ThemeProvider from "../../../../../dashboard/theme";
import { axiosRequest } from "../../../../Utils/networkUtils";

import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import { faker } from "@faker-js/faker";

//일별 게임 이용자 수
const dayChartData = [
  { date: "01/01/2023"},
  { date: '02/01/2023'},
  { date: '03/01/2023'},
  { date: '04/01/2023'},
  { date: '05/01/2023'},
  { date: '06/01/2023'},
  { date: '07/01/2023'},
  { date: '08/01/2023'},
  { date: '09/01/2023'},
  { date: '10/01/2023'},
  { date: '11/01/2023'},
];
const dayChartDataGame = [
    { avatar: "Game 1", value: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]}
];

const setAvatarData = () =>{
    const data = dayChartDataGame.map((data, index) => ({
        name: data.avatar,
        type: "line",
        fill: "solid",
        data: data.value,
    }));
    return data;
}


const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;
const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

//일별 이용자 연령대
const itemUsing = [
    { label: "사용량", value:1 },
]

// 월별 체크를 위한 월 데이터 그냥 나열한것
const avatarMonthDate = [];
for (let month = 1; month <= 12; month++) {
  const date = `${month.toString().padStart(2, "0")}`;
  avatarMonthDate.push({ date });
}

// 아바타 데이터 부족에 따른 더미데이터
const avatarSaleData = () => {
  const data = avatarMonthDate.map((data, index) => ({
    label: data.date,
    value: faker.datatype.number({ min: 0, max: 100 }),
    lineValue: faker.datatype.number({ min: 0, max: 100 }),
  }));
  return data;
}

function ActivityGraph({state}) {
  
  useEffect(() => {
    const path = "dashboard/avatarinfo/sales";  // 아바타 판매량을 불러오는 메소드
    const body = {
      itemIndex: state.itemIndex,
    };
    axiosRequest(path, body, "POST", "json")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    const path2 = "dashboard/avatarinfo/usage";  // 아바타 사용량을 불러오는 메소드
    axiosRequest(path2, body, "POST", "json")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });


  }, []);


  const theme = useTheme();
  return (
    <ThemeProvider>
      <div className="activity-graph">
        <h2>활동 그래프</h2>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            {/* <AppConversionRates
                title="월별 판매량(개)"
                horizontal={false}
                chartData={avatarSaleData().map((data, index) => data)}
              /> */}
              <AppWebsiteVisits
                title="월별 판매량(개)"
                // subheader="월별 판매량"
                xaxisType="date"
                chartLabels={avatarSaleData().map((data, index) => data.label)}
                chartData={[
                  {
                    name: "판매량",
                    type: 'column',
                    data: avatarSaleData().map((data, index) => data.value),
                  },
                  {
                    name: "사용량",
                    data: avatarSaleData().map((data, index) => data.lineValue),
                  },
                ]}
              />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default ActivityGraph;
