import { useEffect, useState } from "react";
export default () => {
  const [valid, setValid] = useState(false);
  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) {
      setValid(false);
    } else setValid(true);
  });
  return [valid];
};
