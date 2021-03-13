var { abi } = require('./abi');

const Web3 = require('web3'); 
const ganache = require('ganache-cli');

require('dotenv').config();

const main = async () => {
  const provider = ganache.provider();
  const web3 = new Web3(provider);
  // const account = web3.eth.accounts.privateKeyToAccount(process.env.RINKEBY_PRIVATE_KEY);
  // console.log(web3.eth.accounts.privateKeyToAccount('0x4e7e85b31544532cedcbe0415062118ce04a2acb868c0e466a3b2b168dd171aa'));
  // console.log(account);

  const { abi } = require('./abi');
  // console.log(abi);
  let instance = new web3.eth.Contract(abi, '0x58e8efe96abc4f457cdb08ac1e3f24fea45f1f01');

  const mintNFT = await instance.methods.createCollectible('testURI').send({ from: '0xf2c63a9683a0cb6f0097091b8d8db3100610423fd44055625d73b8ab4e343a9b' });
  // const value = await instance.methods.tokenCounter().call();
  // console.log(value);

  // console.log(accounts)

  
}

main(); 
