import './App.css';
import logo from './images/header6.png';
import info from './images/info.png';
import redeem from './images/redeem.png'
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
          <img src={logo} width="1000" />
        </div>
      </div>

     {/* Navigation */}
     <div className="nav-links">
       <div className="nav-item">
        <img src={info} width="300" />
       </div>
       <div className="nav-item">
        <img src={redeem} width="120" />
       </div>
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
