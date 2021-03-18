import React from 'react'
import '../App.css';

class Canvas extends React.Component {  
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  drawBoard(context) {
    console.log('drawboard called');
    for (var x = 0; x < 100; x++) {
      context.moveTo(x*10, 0); 
      context.lineTo(x*10, 1000); 
    } 

    for (var y = 0; y < 100; y++) {
      context.moveTo(0, 10*y); 
      context.lineTo(1000, 10*y); 
    }

    context.strokeStyle = "black";
    context.stroke();
  }
  
  componentDidMount() {
    const canvas = this.refs.canvasRef
    const context = canvas.getContext('2d')
  
    // Fix to make lines *not* blurry
    context.translate(0.5, 0.5);

    this.drawBoard(context);
    var background = new Image(); 
    background.src = 'https://raw.githubusercontent.com/BinaryMoon/MillionDollarHomepage/master/assets/image-map.png'; 
    background.onload = () => {
      context.drawImage(background, 0, 0); 
      this.drawBoard(context);
    }

    canvas.addEventListener('mousedown', function(e) {
      /* 
        Explanation: 
          If it's a block # under 10, get the tenth place value. 
            I.e: (83, 0) = Block 8 on the X axis. 
            https://stackoverflow.com/questions/24226324/getting-place-values-of-a-number-w-modulus

          If it's block # 100 - 1000, get the first two digits. 
            I.e: (110, 0) = Block 11 on the X axis
      */
      var xBlock = 0; 
      var yBlock = 0; 

      if (e.offsetX < 100) {
        xBlock = Math.floor((e.offsetX/10) % 10); 
      }
      else if (e.offsetX < 1000) {
        xBlock = parseInt(e.offsetX.toString().substr(0,2));
      }

      if (e.offsetY < 100) {
        yBlock = Math.floor((e.offsetY/10) % 10);
      }
      else if (e.offsetY < 1000) {
        yBlock = parseInt(e.offsetY.toString().substr(0,2));
      }

      // Need to get block position on grid
      var blockPosition = (yBlock*100) + xBlock; 
 
      var url = 'https://opensea.io/assets/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/' + blockPosition;
      window.open(url, '_blank');
    })
  
    this.drawBoard(context);
  }
  
  render() {
    return (
      <div>
        <heading style={{color: "white" , fontSize:"30px"}}><b>WORK IN PROGRESS - NFT COMING SOON</b></heading>
        <heading style={{color: "white"}}></heading>
        <p style={{color: "white"}}>(Grid will be replaced by user-generated images after launch)</p>
  
        <canvas ref="canvasRef" width='1000' height='1000' />
      </div>
    );
  }
}

export default Canvas