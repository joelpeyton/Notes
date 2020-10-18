import React from 'react';

function ColouredSquare(props) {
    return (
        <div className="square" id={props.id} style={{backgroundColor:props.backgroundColour}} onClick={props.selected}></div>
    );
}

export default ColouredSquare;