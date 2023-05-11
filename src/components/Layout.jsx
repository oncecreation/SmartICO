import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ height: "100vh" }}>{children}</Box>
      </Container>
    </>
  );
};
