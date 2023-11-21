import React from 'react';

import { useTheme } from "@mui/material/styles";
import {
  AppCurrentVisits,
  AppWebsiteVisits,
} from "../../../../dashboard/sections/@dashboard/app";
import ThemeProvider from "../../../../dashboard/theme";

import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

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
    { gameName: "Game 1", value: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]},
    { gameName: "Game 2", value: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]},
    { gameName: "Game 3", value: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]}
];

const setGameData = () =>{
    const data = dayChartDataGame.map((data, index) => ({
        name: data.gameName,
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

function ActivityGraph({logData}) {
    //logData[].tableName별로 데이터를 그룹별로으로 갯수 파악
    const countData = logData.reduce((acc, cur) => {
      // 이미 존재하는 tableName의 인덱스를 찾음
      const existingIndex = acc.findIndex(item => item.label === cur.tableName);
    
      if (existingIndex >= 0) {
        // 이미 존재하는 경우, 해당 객체의 value를 증가
        acc[existingIndex].value += 1;
      } else {
        // 새로운 tableName의 경우, 새 객체를 배열에 추가
        acc.push({ label: cur.tableName, value: 1 });
      }
    
      return acc;
    }, []); // 초기 accumulator 값을 빈 배열로 설정
    
    
    const theme = useTheme();
    return (
        <ThemeProvider>
          <div className="activity-graph">
              <h2>활동 그래프</h2>

              <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={8}>
                      <AppWebsiteVisits
                        title="일별 게임 플레이 타임"
                        // subheader="(+43%) than last year"
                        chartLabels={
                          dayChartData.map((data, index) => data.date)}
                        chartData={
                          setGameData()
                      }
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <AppCurrentVisits
                        title="활동 영역"
                        chartData={
                          countData.map((ds, index) => (ds))
                        }
                        chartColors={[
                          theme.palette.primary.main,
                          theme.palette.info.main,
                          theme.palette.warning.main,
                          theme.palette.error.main,
                        ]}
                      />
                    </Grid>
                </Grid>
          </div>
        </ThemeProvider>
    );
}

export default ActivityGraph;
