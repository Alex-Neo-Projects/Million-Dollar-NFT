const { ethers } = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const MDNFT = await ethers.getContractFactory("MDNFT");
  const mdnft = await MDNFT.deploy();

  console.log("Token address:", mdnft.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
