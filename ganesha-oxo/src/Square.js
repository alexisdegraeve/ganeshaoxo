

function Square({value, onSquareClick, anm=false}) {
  return (<button className={`square ${value==='X' ? "pink" : "blue"}  ${anm ? "anm-square" : ""} `} onClick={onSquareClick}><span>{value}</span></button>);
}

export default Square;
