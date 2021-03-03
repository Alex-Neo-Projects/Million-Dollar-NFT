import React from 'react';
import Square from './Square'

function Row(rowNum) {
    const rowSquares = [];
    const testArr = []; 

    for (var i = 1; i < 100; i++) {
        rowSquares.push('');
    }
    
    const openseaLinks = [];    
    for (var i = 0; i < 100; i ++) {
        var link = 'https://opensea.io/assets/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/' + (rowNum.rowNum * 100 + i);
        openseaLinks.push(link);
    }
    return (
        <div className="gridContainer">
            {rowSquares.map((curr, counter) => {
                return <Square link={openseaLinks[counter]}></Square>
            })}  
            {testArr}        
        </div>
    );
}

export default Row;