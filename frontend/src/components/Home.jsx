import Canvas from './Canvas';
import { Link } from 'react-router-dom';
import logo from '../images/header7.png';
import info from '../images/info.png';
import redeem from '../images/redeem.png';

function Home() {

  return( 
    <div className="container">
      <div className="header-collection">
        <div className="header-logo">
          <img src={logo} width="1000" />
        </div>
      </div>

     <div className="nav-collection">
       <div className="nav-item">
        <img src={info} width="300" />
       </div>
       <div className="nav-item">
        <Link to="/redeem"> 
          <img src={redeem} width="120" /> 
        </Link>
       </div>
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