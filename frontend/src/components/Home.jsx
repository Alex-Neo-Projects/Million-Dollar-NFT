import Canvas from './Canvas';
import { Link } from 'react-router-dom';
function Home() {

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