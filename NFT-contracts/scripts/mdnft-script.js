// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  await deploy(); 
  // await interact(); 
}
async function deploy() {
  // We get the contract to deploy
  const MDNFT = await hre.ethers.getContractFactory("MDNFT");
  const mdnft = await MDNFT.deploy();

  const accounts = await ethers.getSigners();
  console.log("Account address: ", accounts[0].address);
  console.log("MDNFT deployed to:", mdnft.address);

  var newCollectible1 = await mdnft.createCollectible("https://dzz5sxiamfbrzzsliney53o6td377qhhjwon6ane6wmrnwz2o2ka.arweave.net/HnPZXQBhQxzmS0NJju3emPf_wOdNnN8BpPWZFts6dpQ");
  
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

  // var tokenCounter = await mdnft.tokenCounter(); 
  // console.log("NFTs minted counter: ", tokenCounter.toString());

}


async function interact() {
  // https://docs.ethers.io/v5/getting-started/#getting-started--contracts
  const provider = ethers.getDefaultProvider(process.env.NETWORK);
  
  // You can also use an ENS name for the contract address
  const daiAddress = "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735";

  // The ERC-20 Contract ABI, which is a common contract interface
  // for tokens (this is the Human-Readable ABI format)
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
  const wallet = new ethers.Wallet.fromMnemonic(process.env.METAMASK_PRIVATE_KEY).connect(provider);

  // The Contract object
  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

  const daiWithSigner = daiContract.connect(wallet);

  // Each DAI has 18 decimal places
  const dai = ethers.utils.parseUnits("1.0", 18);
  
  // Send 1 DAI to "ricmoo.firefly.eth"
  tx = await daiWithSigner.transfer("0x136D473D0C3965D7630F346152101e741074825f", dai);
  console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
