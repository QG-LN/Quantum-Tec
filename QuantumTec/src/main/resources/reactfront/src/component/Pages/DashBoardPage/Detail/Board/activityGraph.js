import React from 'react';
import { useTheme } from "@mui/material/styles";
import {
  AppWebsiteVisits,
} from "../../../../../dashboard/sections/@dashboard/app";
import ThemeProvider from "../../../../../dashboard/theme";

import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import { faker } from "@faker-js/faker";

// 현재로부터 최근 일주일 날짜를 구하기 위한 함수 [ 더미 데이터 ] 포맷 : 2021-10-01
const getDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today.setDate(today.getDate() - 1));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    dates.push({
      time: `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`,
    });
  }
  return dates;
};

const timeChartData = getDates();
console.log(timeChartData);

// 일별 게임 이용자 수 데이터 [ 더미 데이터 ]
const randomData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(faker.datatype.number({ min: 0, max: 100 }));
  }
  return data;
}

// 일별 게임 이용자 수 데이터 [ 더미 데이터 ]
const timeChartDataGame = [
  { gameName: "조회수", value: randomData(7)},
  { gameName: "댓글증가량", value: randomData(7)},  
  // { gameName: "Game 3", value: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]}
];

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


function ActivityGraph() {
    const theme = useTheme();
    return (
        <ThemeProvider>
          <div className="activity-graph">
              <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={12}>
                      <AppWebsiteVisits
                        title="게시글 조회수 및 댓글 증가량"
                        // subheader="(+43%) than last year"
                        xaxisType={"date"}
                        chartLabels={
                          timeChartData.map((data, index) => data.time)}
                        chartData={[
                          {
                            name: "조회수",
                            type: "column",
                            fill: "solid",
                            data: timeChartDataGame[0].value,
                          },
                          {
                            name: "댓글증가량",
                            type: "line",
                            fill: "solid",
                            data: timeChartDataGame[1].value,
                          }
                        ]}
                      />
                    </Grid>
                </Grid>
          </div>
        </ThemeProvider>
    );
}

export default ActivityGraph;
