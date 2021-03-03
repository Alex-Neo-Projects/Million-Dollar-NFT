import React from 'react';
import Square from './Square';
import img from './../img.png';

function Row(rowNum) {
    const rowSquares = [];

    const openseaLinks = [];    
    for (var i = 0; i < 100; i ++) {
        var link = 'https://opensea.io/assets/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/' + (rowNum.rowNum * 100 + i);
        openseaLinks.push(link);
    }

    for (var i = 0; i < 100; i++) {
        rowSquares.push(<Square link={openseaLinks[i]} imgLink={img}></Square>);
    }

    return (
        <div className="gridContainer">
            {rowSquares}  
        </div>
    );
}

export default Row;