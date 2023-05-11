import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Grid from "@mui/material/Grid";
const LoadingPage = () => {
  return (
    <>
      <LinearProgress />
      <Grid container spacing={4}>
        <Grid xs={3} item />
        <Grid item xs={6}>
          <Button color="success">
            Please Install NetMask Extension
            {/* <AddShoppingCartIcon /> Wallet Connect */}
          </Button>
        </Grid>
        <Grid />
      </Grid>
    </>
  );
};
export default LoadingPage;
