import React from "react";
import { Box, Card, Typography } from "@mui/material";
import LeftSideNav from "../../components/LeftSideNav/LeftSideNav";
import NavBar from "../../components/NavBar/NavBar";
import SMSCostCard from "./DashboardComponents/SMSCostCard";
import MonthlySMSExpensesChart from "../../Charts/MonthlySMSExpensesChart";
import ThirtyDaysSMSExpensesChart from "../../Charts/ThirtyDaysSMSExpensesChart";
import ProgramWiseSMSChart from "../../Charts/ProgramWiseSMSChart";
import OrganizationWiseTotalSMSSTATChart from "../../Charts/OrganizationWiseTotalSMSSTATChart";
import styles from "./DashboardStyle";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <LeftSideNav />
      <Box sx={styles.mainContainer}>
        <Box component="aside" sx={styles.sidebar}></Box>

        <Box component="main" sx={styles.contentArea}>
          <Box sx={styles.card}>
            <SMSCostCard />
          </Box>

          <Box sx={styles.chartContainer}>
            <Box sx={styles.cardContainer}>
              <Card sx={styles.card}>
                <Typography sx={styles.title}>
                  Thirty Days SMS Expenses Chart
                </Typography>
                <ThirtyDaysSMSExpensesChart />
              </Card>
            </Box>
            <Box sx={styles.cardContainer}>
              <Card sx={styles.card}>
                <Typography sx={styles.title}>
                  Monthly SMS Expenses Chart
                </Typography>
                <MonthlySMSExpensesChart />
              </Card>
            </Box>
            <Box sx={styles.cardContainer}>
              <Card sx={styles.card}>
                <Typography sx={styles.title}>
                  Program Wise SMS Chart
                </Typography>
                <ProgramWiseSMSChart />
              </Card>
            </Box>
            <Box sx={styles.cardContainer}>
              <Card sx={styles.card}>
                <Typography sx={styles.title}>
                  Organization Wise Total SMS STAT Chart
                </Typography>
                <OrganizationWiseTotalSMSSTATChart />
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
