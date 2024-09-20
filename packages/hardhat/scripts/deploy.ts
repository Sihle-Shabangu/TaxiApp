import { ethers } from "hardhat";

async function main() {
  const TaxiApp = await ethers.deployContract("TaxiManagement");

  await TaxiApp.waitForDeployment();

  console.log("Taxi App Contract Address - " + (await TaxiApp.getAddress()));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
