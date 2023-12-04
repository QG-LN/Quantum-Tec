import React from 'react';

import { useTheme } from "@mui/material/styles";
import {
  AppCurrentVisits,
  AppWebsiteVisits,
} from "../../../../../dashboard/sections/@dashboard/app";
import ThemeProvider from "../../../../../dashboard/theme";

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

//일별 이용자 연령대
const dayUserAgeData = [
    { label: "게임", value: [2,3,6,7,8,2] },
]

function ActivityGraph() {
    const theme = useTheme();
    return (
        <ThemeProvider>
          <div className="activity-graph">
              <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={8}>
                      <AppWebsiteVisits
                        title="게임 구매 추이"
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
                        title="일일 접속량(명)"
                        chartData={
                          dayUserAgeData.map((ds, index) => (ds))
                        }
                        chartColors={[
                          theme.palette.primary.main,
                        ]}
                      />
                    </Grid>
                </Grid>
          </div>
        </ThemeProvider>
    );
}

export default ActivityGraph;
