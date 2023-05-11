import Main from "./container/Main";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
