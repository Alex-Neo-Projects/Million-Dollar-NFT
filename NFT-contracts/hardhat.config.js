require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY; 

const RINKEBY_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY; 

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async () => {
//   const accounts = await ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/** 
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: {
        mnemonic: `${RINKEBY_PRIVATE_KEY}`,
      },
    },
  },
};

