// import React from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../../dashboard/components/iconify';
import ScrollToTop from '../../../dashboard/components/scroll-to-top';
import { StyledChart } from '../../../dashboard/components/chart';
import ThemeProvider from '../../../dashboard/theme';
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
  } from '../../../dashboard/sections/@dashboard/app';

import { Grid, Container, Typography } from '@mui/material';
import Nav from '../../../dashboard/layouts/dashboard/nav';
import Header from '../../../dashboard/layouts/dashboard/header';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;
const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});
function Test() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    return (
        <StyledRoot>
            <Header onOpenNav={() => setOpen(true)} />
            <Nav openNav={open} onCloseNav={() => setOpen(false)} />
            <Main>
            <ThemeProvider>
                <ScrollToTop />
                <StyledChart />
                <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ mb: 5 }}>
                    사이트 요약
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary title="현재 사용자 수" total={714000} icon={'ant-design:android-filled'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary title="튜터링 이용자 수" total={1351} color="info" icon={'ant-design:apple-filled'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary title="금일 결제금액" total={56000} color="info" icon={'ant-design:windows-filled'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
                        </Grid>

                        <Grid item xs={12} md={6} lg={8}>
                            <AppWebsiteVisits
                            title="일별 게임 이용자 수"
                            // subheader="(+43%) than last year"
                            chartLabels={[
                                '01/01/2003',
                                '02/01/2003',
                                '03/01/2003',
                                '04/01/2003',
                                '05/01/2003',
                                '06/01/2003',
                                '07/01/2003',
                                '08/01/2003',
                                '09/01/2003',
                                '10/01/2003',
                                '11/01/2003',
                            ]}
                            chartData={[
                                {
                                name: 'Game 1',
                                type: 'line',
                                fill: 'solid',
                                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                                },
                                {
                                name: 'Game 2',
                                type: 'line',
                                fill: 'solid',
                                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                                },
                                {
                                name: 'Game 3',
                                type: 'line',
                                fill: 'solid',
                                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                                },
                            ]}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <AppCurrentVisits
                            title="일별 이용자 연령대"
                            chartData={[
                                { label: '10대 미만', value: 4344 },
                                { label: '10대', value: 5435 },
                                { label: '20대', value: 1443 },
                                { label: '30대 이상', value: 4443 },
                            ]}
                            chartColors={[
                                theme.palette.primary.main,
                                theme.palette.info.main,
                                theme.palette.warning.main,
                                theme.palette.error.main,
                            ]}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={8}>
                            <AppConversionRates
                            title="게임별 이용자 수"
                            // subheader="(+43%) than last year"
                            chartData={[
                                { label: 'Game1', value: 20 },
                                { label: 'Game2', value: 30 },
                                { label: 'Game3', value: 26 },
                                { label: 'Game4', value: 20 },
                                { label: 'Game5', value: 30 },
                                { label: 'Game6', value: 43 },
                            ]}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            {/* <AppCurrentSubject
                            title="Current Subject"
                            chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
                            chartData={[
                                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                            ]}
                            chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
                            /> */}
                            <AppOrderTimeline
                            title="최근 결제 건"
                            list={[...Array(5)].map((_, index) => ({
                                id: faker.datatype.uuid(),
                                title: [
                                'Game1, Item1, $4220',
                                '아바타, 초록 바지, 1000캐시',
                                'Order #37745 from September',
                                'New order placed #XF-2356',
                                'New order placed #XF-2346',
                                ][index],
                                type: `order${index + 1}`,
                                time: faker.date.past(),
                            }))}
                            />
                        </Grid>

                        {/* <Grid item xs={12} md={6} lg={8}>
                            <AppNewsUpdate
                            title="News Update"
                            list={[...Array(5)].map((_, index) => ({
                                id: faker.datatype.uuid(),
                                title: faker.name.jobTitle(),
                                description: faker.name.jobTitle(),
                                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                                postedAt: faker.date.recent(),
                            }))}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <AppOrderTimeline
                            title="Order Timeline"
                            list={[...Array(5)].map((_, index) => ({
                                id: faker.datatype.uuid(),
                                title: [
                                '1983, orders, $4220',
                                '12 Invoices have been paid',
                                'Order #37745 from September',
                                'New order placed #XF-2356',
                                'New order placed #XF-2346',
                                ][index],
                                type: `order${index + 1}`,
                                time: faker.date.past(),
                            }))}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <AppTrafficBySite
                            title="Traffic by Site"
                            list={[
                                {
                                name: 'FaceBook',
                                value: 323234,
                                icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                                },
                                {
                                name: 'Google',
                                value: 341212,
                                icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                                },
                                {
                                name: 'Linkedin',
                                value: 411213,
                                icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                                },
                                {
                                name: 'Twitter',
                                value: 443232,
                                icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                                },
                            ]}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={8}>
                            <AppTasks
                            title="Tasks"
                            list={[
                                { id: '1', label: 'Create FireStone Logo' },
                                { id: '2', label: 'Add SCSS and JS files if required' },
                                { id: '3', label: 'Stakeholder Meeting' },
                                { id: '4', label: 'Scoping & Estimations' },
                                { id: '5', label: 'Sprint Showcase' },
                            ]}
                            />
                        </Grid> */}
                    </Grid>
                </Container>
            </ThemeProvider>
            </Main>

        </StyledRoot>
    );
}

export default Test;
