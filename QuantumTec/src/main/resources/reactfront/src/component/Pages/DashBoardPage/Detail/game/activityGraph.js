import React, { useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppConversionRates,
} from "../../../../../dashboard/sections/@dashboard/app";
import ThemeProvider from "../../../../../dashboard/theme";
import { axiosRequest } from "../../../../Utils/networkUtils";

import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import { faker } from "@faker-js/faker";

// 시간대 별 체크를 위한 시간 데이터 그냥 나열한것
const timeChartData = [];

for (let hour = 0; hour < 24; hour++) {
  const time = `${hour.toString().padStart(2, "0")}`;
  timeChartData.push({ time });
}

const dayChartDataGame = [
  // { gameName: "시간 별", value: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 10, 10]},
  {
    gameName: "시간 별",
    value: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    // value: faker.datatype.number({ min: 0, max: 100}),
  },
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

let setGameData = () => {
  const data = dayChartDataGame.map((data, index) => ({
    name: data.gameName,
    type: "line",
    fill: "solid",
    data: data.value,
  }));
  return data;
};

// //게임별 이용자 수
// const gameUserData =[
//   { label: "Game1", value: 20 },
//   { label: "Game2", value: 30 },
//   { label: "Game3", value: 26 },
//   { label: "Game4", value: 20 },
//   { label: "Game5", value: 30 },
//   { label: "Game6", value: 43 },
// ]

// //게임 이용자 수 데이터 [ 더미 데이터 ]
const gameUserData = (type) => {
  if (type === "time") {
    const data = timeChartData.map((data, index) => ({
      label: data.time,
      value: faker.datatype.number({ min: 0, max: 100 }),
    }));
    return data;
  } else {
  }
};

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

const dayCommentData = (type) => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    data.push({
      label: getDates()[i].time,
      value: faker.datatype.number({ min: 0, max: 100 }),
    });
  }

  return data;
}

function ActivityGraph() {
  useEffect(() => {
    const path = "dashboard/gameinfo/accessbytime";
    const body = {
      gameIndex: 1,
    };

    const requestData = [];

    axiosRequest(path, body, "POST", "json")
      .then((response) => {
        requestData.push(response.accessCount);

        // 더미 데이터 생성
        const values = [];
        for (let hour = 0; hour < 24; hour++) {
          const value = faker.datatype.number({ min: 0, max: 100 });
          values.push(value);
        }
        const valueData = { value: values };

        setGameData = () => {
          const data = requestData.map((data, index) => ({
            name: data.gameName,
            type: "line",
            fill: "solid",
            data: valueData.value, // 더미데이터로 임시 세팅
          }));
          return data;
        };
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
            <AppConversionRates
              title="일일 접속량(명)"
              horizontal={false}
              chartData={gameUserData("time").map((data, index) => data)}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="댓글 작성량(명)"
              // subheader="(+43%) than last year"
              horizontal={false}
              chartData={dayCommentData("time").map((data, index) => data)}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="게임 구매량(명)"
              // subheader="(+43%) than last year"
              horizontal={false}
              chartData={dayCommentData("time").map((data, index) => data)}
            />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default ActivityGraph;
