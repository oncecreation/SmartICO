require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
const { API_URL, PRIVATE_KEY } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    testnet: {
      url: API_URL || "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [
        "bb7b6541605a4e62471e2288a61ca39c6a067d969ffe3394998f138b444d20af",
      ],
    },
  },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },
};
