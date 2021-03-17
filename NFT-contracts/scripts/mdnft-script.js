// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // await deploy(); 
  // await interact(); 
}
async function deploy() {
  // We get the contract to deploy
  const MDNFT = await hre.ethers.getContractFactory("MDNFT");
  const mdnft = await MDNFT.deploy();

  const accounts = await ethers.getSigners();
  console.log("Account address: ", accounts[0].address);
  console.log("MDNFT deployed to:", mdnft.address);

  var newCollectible1 = await mdnft.createCollectible("https://testopenseaapi.alex243.repl.co/api/metadata?id=2");
  var newCollectible2 = await mdnft.createCollectible("https://testopenseaapi.alex243.repl.co/api/metadata?id=3");
  
  var theOwner = await mdnft.ownerOf(0);
  console.log("Owner of the first NFT: ", theOwner); 

  var balance = await mdnft.balanceOf(accounts[0].address);
  console.log("Owner's balance: ", balance.toString()); 

  var tokenUri = await mdnft.tokenURI(0); 
  console.log("Token URI of the first NFT: ", tokenUri);

  // var burn = await mdnft.burnCollectible(0); 
  // console.log("Burning 0! ");

  // var balance = await mdnft.balanceOf(accounts[0].address);
  // console.log("Owner's new balance: ", balance.toString()); 

  var tokenCounter = await mdnft.tokenCounter(); 
  console.log("NFTs minted counter: ", tokenCounter.toString());

}


async function interact() {
  // https://docs.ethers.io/v5/getting-started/#getting-started--contracts
  const daiAddress = "dai.tokens.ethers.eth";

  const daiAbi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",

    // Get the account balance
    "function balanceOf(address) view returns (uint)",

    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",

    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)"
  ];
  let provider = ethers.getDefaultProvider();
  const wallet = new ethers.Wallet.fromMnemonic(process.env.METAMASK_PRIVATE_KEY).connect(provider);
  // const signer = ethers.getSigners()
  console.log(wallet.address);

  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);
  let daiSymbol = await daiContract.symbol(); 
  console.log(daiSymbol);

  const erc20_rw = new ethers.Contract(daiAddress, daiAbi, wallet)

  // // Each DAI has 18 decimal places
  const dai = ethers.utils.parseUnits("1.0", 18);

  // // Send 1 DAI to "ricmoo.firefly.eth"
  tx = erc20_rw.transfer("ricmoo.firefly.eth", dai);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
