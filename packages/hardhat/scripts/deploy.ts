import hre from "hardhat";

async function main() {
  const TaxiApp = await hre.ethers.getContractFactory("TaxiManagement");
  const taxiApp = await TaxiApp.deploy("0x874069fa1eb16d44d622f2e0ca25eea172369bc1");

  await taxiApp.waitForDeployment();

  console.log("Taxi App Contract Address - " + (taxiApp.getAddress()));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
