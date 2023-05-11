import React, { useState, useEffect } from "react";
import {
  AppBar,
  IconButton,
  Button,
  Container,
  Grid,
  Stack,
  Box,
  Typography,
  linearProgressClasses,
  CircularProgress,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import PropTypes from "prop-types";
import Timer from "../components/Timer";
import Deposit from "../components/Deposit";
import Progress from "../components/Progress";
import { useW3 } from "../hooks/useW3";
import { buttonStatus } from "../utils/func";

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

export default ({}) => {
  const [handleDeposit, handleWithdraw, handleClaim, fetchData] = useW3();
  const [deposit, setDeposit] = useState(0);
  const [bstate, setbstate] = useState(buttonStatus(deposit));
  //   console.log(handleDeposit);
  useEffect(() => {
    // fetchData();
  }, []);
  return (
    <Container>
      <Box>
        <Stack>
          <Timer />
          <Deposit handleDeposit={handleDeposit} state={bstate} />
          <Progress />
        </Stack>
      </Box>
    </Container>
  );
};
