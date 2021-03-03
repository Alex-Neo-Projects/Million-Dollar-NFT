import './App.css';
import Row from './components/Row';

function App() {
  const rows = [];
  
  for (var i = 0; i < 100; i++) {
    rows.push(<Row rowNum={i}></Row>);
  }

  return (
    <div className="container">
      
      <div className="header-collection">
        <div className="header-logo">
          <h1> The Million Dollar <strike>Homepage</strike> NFT </h1>
        </div>
        <div className="header-info"> 
            <p>1,000,000 pixels | $x per pixel | Own a piece of NFT history!</p>
        </div>
      </div>

      <div className="nav-links">
        <p>Click on an open spot to buy. Redeem your NFT to put your ad/image on it!</p>
      </div>

      <div className="ad">
        <div className="ad-collection">
          <h1>{rows}</h1>
        </div>
      </div>

    </div>
  );
}

export default App;
