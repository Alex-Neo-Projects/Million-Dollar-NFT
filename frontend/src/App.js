import './App.css';
import Square from './Square';
import { Row } from 'reactstrap';

function App() {

  const squareInfo = [];

  for (var i = 0; i < 100; i++) {
    squareInfo.push('');
  }

  return (  
    <div className="App">
      <h1 style={{textAlign: 'center'}}> The Million Dollar NFT </h1>
      
      <br></br>
      <div class="homepage" style={{ borderStyle: 'solid',  margin: 'auto', height:'1000px', width:'1000px', backgroundColor: '#FFFF'}}>        
        <div className="gridContainer">
          {squareInfo.map(() => {
            return <Square></Square>
          })}          
         </div>


      
        {/* {squareInfo.map(() => {
          return <Square style={{marginLeft:'40px'}}></Square>
        })}
        {squareInfo.map(() => {
          return <Square style={{marginLeft:'30px'}}></Square>
        })}
        {squareInfo.map(() => {
          return <Square style={{marginLeft:'20px'}}></Square>
        })}
        {squareInfo.map(() => {
          return <Square style={{marginLeft:'10px'}}></Square>
        })} */}
      </div>
    </div>
  );
}

export default App;
