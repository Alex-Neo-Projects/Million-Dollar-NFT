const Web3 = require('web3');

function main() {
  web3 = new Web3('https://rinkeby.infura.io/v3/805886a506534dfe94aba19982c22465'); 
  
  const account =  web3.eth.accounts.create();

  console.log('address: ', account.address);
  console.log('privateKey: ', account.privateKey);
} 

main(); 