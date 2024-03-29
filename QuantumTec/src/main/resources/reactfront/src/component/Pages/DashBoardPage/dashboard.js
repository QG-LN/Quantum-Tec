// import React from 'react';
import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
import { useTheme } from "@mui/material/styles";
import Iconify from "../../../dashboard/components/iconify";
import ScrollToTop from "../../../dashboard/components/scroll-to-top";
import { StyledChart } from "../../../dashboard/components/chart";
import ThemeProvider from "../../../dashboard/theme";
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from "../../../dashboard/sections/@dashboard/app";
import Home from "./dashboardHome"
import { Grid, Container, Typography } from "@mui/material";
import Nav from "../../../dashboard/layouts/dashboard/nav";
import Header from "../../../dashboard/layouts/dashboard/header";
import { useState } from "react";
import { styled } from "@mui/material/styles";
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
const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});



//일별 게임 이용자 수
const dayChartData = [
    { date: "01/01/2003"},
    { date: '02/01/2003'},
    { date: '03/01/2003'},
    { date: '04/01/2003'},
    { date: '05/01/2003'},
    { date: '06/01/2003'},
    { date: '07/01/2003'},
    { date: '08/01/2003'},
    { date: '09/01/2003'},
    { date: '10/01/2003'},
    { date: '11/01/2003'},
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

//일별 이용자 연령대
const dayUserAgeData = [
    { label: "10대 미만", value: 4344 },
    { label: "10대", value: 5435 },
    { label: "20대", value: 1443 },
    { label: "30대 이상", value: 4443 },
]

//게임별 이용자 수
const gameUserData =[
    { label: "Game1", value: 20 },
    { label: "Game2", value: 30 },
    { label: "Game3", value: 26 },
    { label: "Game4", value: 20 },
    { label: "Game5", value: 30 },
    { label: "Game6", value: 43 },
]

//최근 결제 건
//date 형식은 iso-8601형식으로 mapper할때 바꿔서 가져와야됨
const orderTimelineData = [
    {text:"Game1, Item1, $4220", date: "2021-12-06T05:40:44.408Z"},
    {text:"아바타, 초록 바지, 1000캐시", date: "2021-12-09T05:20:44.408Z"},
    {text:"Order #37745 from September", date: "2021-12-03T05:40:44.408Z"},
    {text:"New order placed #XF-2356", date: "2021-12-03T05:40:44.408Z"},
    {text:"New order placed #XF-2356", date: "2021-12-03T05:40:44.408Z"},
]

//튜터링 이용자 수
const tutoringUserDate = [  
    { date: "01/01/2003"},
    { date: '02/01/2003'},
    { date: '03/01/2003'},
    { date: '04/01/2003'},
    { date: '05/01/2003'},
    { date: '06/01/2003'},
    { date: '07/01/2003'},
    { date: '08/01/2003'},
    { date: '09/01/2003'},
    { date: '10/01/2003'},
    { date: '11/01/2003'}];


const setTutorData = () =>{
    const data = tutoringUserData.map((data, index) => ({
        name: data.tutorName,
        type: "line",
        fill: "solid",
        data: data.value,
    }));
    return data;
}
const tutoringUserData =[
    { tutorName: "국어", value: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]},
    { tutorName: "수학", value: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]},
    { tutorName: "과학", value: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]}
];


//서버 정보
const serverlist = [
    {
        name: "총 데이터베이스 사용량",
        value: (100 / 200) * 100,
        icon: (
          <Iconify
            icon={"eva:facebook-fill"}
            color="#1877F2"
            width={32}
          />
        ),
      },
      {
        name: "내 게임서버 1",
        value: (100 / 200) * 100,
        icon: (
          <Iconify
            icon={"eva:google-fill"}
            color="#DF3E30"
            width={32}
          />
        ),
      },
      {
        name: "내 게임서버 2",
        value: (10 / 100) * 100,
        icon: (
          <Iconify
            icon={"eva:linkedin-fill"}
            color="#006097"
            width={32}
          />
        ),
      },
      {
        name: "내 게임서버 3",
        value: (20 / 100) * 100,
        icon: (
          <Iconify
            icon={"eva:twitter-fill"}
            color="#1C9CEA"
            width={32}
          />
        ),
      },
]

//오류 체크리스트
const taskList = [
    { id: "1", label: "Create FireStone Logo" },
    { id: "2", label: "Add SCSS and JS files if required" },
    { id: "3", label: "Stakeholder Meeting" },
    { id: "4", label: "Scoping & Estimations" },
    { id: "5", label: "Sprint Showcase" },
];

function DashBoard() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Home />
    </StyledRoot>
  );
}

export default DashBoard;
