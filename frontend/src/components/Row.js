import React from 'react';
import Square from './Square'

class Row extends React.Component {
    render() {
        const rowSquares = [];
        for (var i = 0; i < 100; i++) {
            rowSquares.push('');
        }

        return (
            <div className="gridContainer">
                {rowSquares.map(() => {
                    return <Square></Square>
                })}          
            </div>
        );
    }
}

export default Row;