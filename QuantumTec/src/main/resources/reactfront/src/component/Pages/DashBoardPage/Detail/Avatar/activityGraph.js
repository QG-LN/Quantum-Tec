import React from 'react';

import { useTheme } from "@mui/material/styles";
import {
  AppConversionRates,
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

function ActivityGraph() {
    const theme = useTheme();
    return (
        <ThemeProvider>
          <div className="activity-graph">
              <h2>활동 그래프</h2>

              <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={8}>
                      <AppWebsiteVisits
                        title="아바타 구매 추이"
                        // subheader="(+43%) than last year"
                        chartLabels={
                          dayChartData.map((data, index) => data.date)}
                        chartData={
                          setAvatarData()
                      }
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <AppConversionRates
                        title="아바타 사용량(명)"
                        chartData={
                          itemUsing.map((ds, index) => (ds))
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
