const { ethers } = require("hardhat");

const networkConfig = {
  11155111: {
    name: "sepolia",
    cap: "100000000",
    reward: "50",
  },
  31337: {
    name: "hardhat",
    cap: "100000000",
    reward: "50",
  },
};

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
};
