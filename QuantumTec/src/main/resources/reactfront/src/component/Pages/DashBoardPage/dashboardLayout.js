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


function DashBoardLayout() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      {/* <Home /> */}
    </StyledRoot>
  );
}

export default DashBoardLayout;
