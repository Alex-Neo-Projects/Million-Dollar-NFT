// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  await deploy(); 
}
async function deploy() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const MDNFT = await hre.ethers.getContractFactory("MDNFT");
  const mdnft = await MDNFT.deploy();
  
  await mdnft.deployed();

  const accounts = await ethers.getSigners();
  console.log("Account address: ", accounts[0].address);
  console.log("MDNFT deployed to:", mdnft.address);

  var newCollectible = await mdnft.createCollectible("Test!");
  var newCollectible = await mdnft.createCollectible("Test 2!");
  var newCollectible = await mdnft.createCollectible("Test 3!");
  
  var theOwner = await mdnft.ownerOf(0);
  console.log("Owner of the first NFT: ", theOwner); 

  var balance = await mdnft.balanceOf(accounts[0].address);
  console.log("Owner's balance: ", balance.toString()); 

  var tokenUri = await mdnft.tokenURI(0); 
  console.log("Token URI of the first NFT: ", tokenUri);

  var burn = await mdnft.burnCollectible(0); 
  console.log("Burning 0! ");

  var balance = await mdnft.balanceOf(accounts[0].address);
  console.log("Owner's new balance: ", balance.toString()); 

  var tokenCounter = await mdnft.tokenCounter(); 
  console.log("NFTs minted counter: ", tokenCounter.toString());

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
