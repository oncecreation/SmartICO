import { endingTime, hardCap, softCap } from "./constant";

export const formatTime = (time) => {
  const date = new Date(time);
  return date.toLocaleString();
};
export const buttonStatus = (balance) => {
  const curTime = new Date().getTime();
  if (endingTime < curTime || balance > hardCap) return 2;
  if (balance >= softCap && balance <= hardCap) return 0;
  if (balance < softCap && curTime > endingTime) return 1;
};
