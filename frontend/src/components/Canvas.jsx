import React, { useRef, useEffect } from 'react'
import '../App.css';

function Canvas() {  
  const canvasRef = useRef(null)
  var mouseX = 0; 
  var mouseY = 0; 

  // Helper function to get exact position for the mouse
  function getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;
   
    while (el) {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
      el = el.offsetParent;
    }
    return {
      x: xPosition,
      y: yPosition
    };
  }       

  
  const drawBoard = context => {
    console.log('drawboard called');
    for (var i = 0; i < 100; i++) {
      context.moveTo(i*10, 0); 
      context.lineTo(i*10, 1000); 
    } 

    for (var i = 0; i < 100; i++) {
      context.moveTo(0, 10*i); 
      context.lineTo(1000, 10*i); 
    }

    context.strokeStyle = "black";
    context.stroke();
  }

  function update (context) {
    context.clearRect(0, 0, 1000, 1000);

    context.beginPath();
    context.arc(mouseX, mouseY, 50, 0, 2 * Math.PI, true);
    context.fillStyle = "#FF6A6A";
    context.font = "20px Georgia";

    context.fill();

    requestAnimationFrame(function(){
      update(context);
    });
    // requestAnimationFrame(update(context));
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    var canvasPos = getPosition(canvas);
  
    // Fix to make lines *not* blurry
    context.translate(0.5, 0.5);
    
    // var img = new Image(10,10);   // Create new img element
    // img.src = 'https://i.imgur.com/8dKz43K.png';
    // img.style.height = "10px";
    // img.style.width = "10px";

    var background = new Image(); 
    background.src = 'https://raw.githubusercontent.com/BinaryMoon/MillionDollarHomepage/master/assets/image-map.png'; 
    update(context);

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

      // context.drawImage(background, 0, 0); 
      // context.drawImage(img, (xBlock*10), yBlock*10);
      // drawBoard(context);
      // var url = 'https://opensea.io/assets/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/' + blockPosition;
      // window.open(url, '_blank');
    })
    
    canvas.addEventListener("mousemove", function(e) {
      mouseX = e.clientX - canvasPos.x;
      mouseY = e.clientY - canvasPos.y; 

    });

    drawBoard(context)
  }, [drawBoard])
  
  return (
    <div>
      <canvas ref={canvasRef} width='1000' height='1000' />
    </div>
  );
}

export default Canvas