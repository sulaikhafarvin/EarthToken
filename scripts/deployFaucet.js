const { ethers } = require("hardhat");

async function main() {
  const Faucet = await ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy(
    "0x309D0dD0010b628465850cAC060b34F8F37884EB"
  );

  await faucet.waitForDeployment();

  const address = await faucet.getAddress();

  console.log(`Faucet contract deployed:${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
