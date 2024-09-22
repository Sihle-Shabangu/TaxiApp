import hre from "hardhat";
import { contract } from "web3/lib/commonjs/eth.exports";

async function main () {
    const TaxiApp = await hre.ethers.getContractFactory("TaxiManagement");
    const taxiApp = TaxiApp.deploy("0x874069fa1eb16d44d622f2e0ca25eea172369bc1");
    console.log(`contract deployed to ${(await taxiApp).target}`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });