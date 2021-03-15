import { ethers } from "ethers";
import Canvas from './Canvas';
import { Link } from 'react-router-dom';

function Home() {

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  // You can also use an ENS name for the contract address
  const daiAddress = "dai.tokens.ethers.eth";

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

  // The Contract object
  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);



  return( 
    <div className="container">
      <div className="header-collection">
        <div className="header-logo">
          <h1> The Million Dollar <strike>Homepage</strike> NFT </h1>
        </div>
        <div className="header-info"> 
            <p>1,000,000 pixels | Starting at $1 per pixel | Own a piece of NFT history!</p>
        </div>
      </div>
      <button>Connect wallet</button>
      <div className="nav-links">
        <p>Click on an open spot to buy. <Link to="/redeem">Redeem your NFT to put your image on!</Link></p>
      </div> 

      <div className="ad">
        <div className="ad-collection">
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default Home; 