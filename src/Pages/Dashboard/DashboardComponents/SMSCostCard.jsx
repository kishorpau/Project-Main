import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import styles from "../DashboardComponents/SMSCostCardStyle";
import CountUp from "react-countup";

export default function SMSCostCard() {
  const TotalSMSCredit = 7000;
  const SpentSMSCredit = 3000;

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h6" sx={styles.title}>
            कुल SMS क्रेडिट
          </Typography>
          <Typography variant="body1" sx={styles.body}>
            <CountUp end={TotalSMSCredit} duration={2} />
          </Typography>
        </CardContent>
      </Card>

      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h6" sx={styles.title}>
            SMS क्रेडिट खर्च भयो
          </Typography>
          <Typography variant="body1" sx={styles.body}>
            <CountUp end={SpentSMSCredit} duration={2} />
          </Typography>
        </CardContent>
      </Card>

      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h6" sx={styles.title}>
            बाँकी SMS क्रेडिट
          </Typography>
          <Typography variant="body1" sx={styles.body}>
            <CountUp end={TotalSMSCredit - SpentSMSCredit} duration={2} />
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
