import Row from './components/Row'

function App() {
  const rows = [];
  for (var i = 0; i < 100; i++) {
    rows.push(<Row></Row>);
  }

  return (  
    <div className="App">
      <h1 className="pageHeader"> The Million Dollar NFT </h1>
      <br></br>
      <div className="homePage">       
        {rows}
      </div>
    </div>
  );
}

export default App;
