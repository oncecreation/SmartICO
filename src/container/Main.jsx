import React, { useEffect } from "react";
import useMetaMask from "../hooks/useMetaMask";
import LoadingPage from "./LoadingPage";
import Board from "./Board";
import Layout from "../components/Layout";
const Main = () => {
  const [connected, connectNetmask] = useMetaMask();
  return <Layout>{connected ? <Board /> : <LoadingPage />}</Layout>;
};
export default Main;
