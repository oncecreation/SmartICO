import { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Grid,
  Button,
  Stack,
  Item,
  Typography,
} from "@mui/material";
import Progress from "./Progress";
const STATE = {
  0: "Deposit",
  1: "Claim",
  2: "Withdraw",
};
export default ({ deposit: _deposit, handleDeposit }) => {
  const [deposit, setDeposit] = useState(0);
  const [bstate, setBstate] = useState(0); // O:'Deposit', 1:'Claim', 2:'Withdraw'
  const requestDeposit = () => {};
  const requestWithdraw = () => {};
  const requestClaim = () => {};
  useEffect(() => {
    // setDeposit(_deposit);
  }, []);
  return (
    <Grid container sx={{ alignItems: "center" }}>
      <Grid item xs={3}>
        <div style={{ padding: "5%" }}>
          <TextField
            id="outlined-number"
            label="Deposited Amount Number"
            type="number"
            color="info"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </Grid>
      <Grid item xs={2}>
        <div className="description">
          <Typography variant="h4">Total Amount: {deposit}</Typography>
        </div>
      </Grid>

      <Grid item xs={2}>
        <div style={{ padding: "10%" }}>
          <Button variant="outlined" onClick={handleDeposit}>
            {STATE[bstate]}
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};
