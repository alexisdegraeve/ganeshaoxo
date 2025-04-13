

function Square({value, onSquareClick}) {
  return (<button className={`square ${value==='X' ? "pink" : "blue"}`} onClick={onSquareClick}>{value}</button>);
}

export default Square;
