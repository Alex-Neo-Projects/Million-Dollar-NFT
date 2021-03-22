require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MDNFT.sol/MDNFT.json");

const contractAddress = '0xc837e4e1b7A526FF5E571f74c12C3Df194f7365B';
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY; 

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

  const tx = {
    'from' : PUBLIC_KEY, 
    'to': contractAddress, 
    'nonce': nonce, 
    'gas': 500000,
    'data': nftContract.methods.createCollectible(tokenURI).encodeABI()
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY); 
  signPromise.then((signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("Transaction hash: ", hash)
      } else {
        console.log("ERR: ", err)
      }
    });
  }).catch((err) => {
    console.log("Failed promise: ", err); 
  }); 
}

mintNFT('https://arweave.net/IpYcPLA655w3Mi49FXzS2nW-PsQyndVKpuiZfDxwGRo')