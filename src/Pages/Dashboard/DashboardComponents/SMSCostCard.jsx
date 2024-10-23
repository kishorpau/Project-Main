import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import styles from "../DashboardComponents/SMSCostCardStyle";

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
            {TotalSMSCredit}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h6" sx={styles.title}>
            SMS क्रेडिट खर्च भयो
          </Typography>
          <Typography variant="body1" sx={styles.body}>
            {SpentSMSCredit}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h6" sx={styles.title}>
            बाँकी SMS क्रेडिट
          </Typography>
          <Typography variant="body1" sx={styles.body}>
            {TotalSMSCredit - SpentSMSCredit}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
