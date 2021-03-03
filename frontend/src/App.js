import Row from './components/Row';

function App() {
  const rows = [];
  
  for (var i = 0; i < 100; i++) {
    rows.push(<Row rowNum={i}></Row>);
  }

  return (  
    <div className="App">
      <h1 className="pageHeader"> The Million Dollar NFT </h1>
      <p className="pageHeader">Click on an open spot to buy. Redeem your NFT to put your ad/image on it!</p>
      <br></br>
      <div className="homePage">       
        {rows}
      </div>
    </div>
  );
}

export default App;
