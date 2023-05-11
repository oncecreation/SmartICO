import {
  AppBar,
  IconButton,
  Button,
  Container,
  Grid,
  Box,
  TextField,
  LinearProgress,
  linearProgressClasses,
  Typography,
  CircularProgress,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { softCap } from "../utils/constant";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const icostate = ["Deposit", "Withdraw", "Claim"];
const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        size={100}
        sx={{
          color: orange[200],
          position: "absolute",
          top: -50,
          left: -50,
        }}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};
CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ({ state }) => {
  return (
    <Grid container>
      <Grid item xs={10} style={{ paddingTop: "1%" }}>
        <BorderLinearProgress variant="determinate" value={softCap / 10} />
        <Typography variant="h3" component="div" color="green">
          {}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <p style={{ fontSize: "18pt" }}>{}</p>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={1} style={{ paddingTop: "1%" }} rowSpacing={8}>
        <CircularProgressWithLabel value={0} />
      </Grid>
      <Grid item xs={7}>
        <span style={{ fontSize: "18pt" }}>
          ICO period: 5/8/2023 0 AM - 5/9/2023 0 AM
        </span>
      </Grid>
    </Grid>
  );
};
