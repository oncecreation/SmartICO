import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
export default () => {
  //   const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const tickTime = () => {
    const date = new Date();
    const formattedDate = date.toLocaleString();
    setTime(formattedDate);
  };
  useEffect(() => {
    let timer = setInterval(tickTime);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <Grid item xs={7}>
      <Typography variant="h3">{time}</Typography>
    </Grid>
  );
};
