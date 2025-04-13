import { useState } from "react";
import "./Game.css";
import Board from "./Board";

function Game() {
  const [isThinking, setIsThinking] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true); // On gère manuellement qui joue
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handlePlay(nextSquares) {
    saveMove(nextSquares);
    const winner = calculateWinner(nextSquares);

    // Computer Play
    if (!winner && xIsNext) {
      setIsThinking(true);
      setTimeout(() => {
        makeComputerMove(nextSquares);
        setIsThinking(false);
        setXIsNext(true);
      }, 800);
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  function makeComputerMove(squares) {
    if (calculateWinner(squares)) return;

    const emptyIndexes = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndexes.length === 0) return; // Match nul si plus de cases vides

    // Choisir une case au hasard parmi les cases vides
    const randomIndex =
      emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    const nextSquares = squares.slice();
    nextSquares[randomIndex] = "O"; // L'ordinateur joue avec "O"
    saveMove(nextSquares);
  }

  function saveMove(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function restart() {
    setHistory([Array(9).fill(null)]); // Repart de zéro
    setCurrentMove(0); // Reviens au premier tour
    setXIsNext(true); // Reviens au joueur humain (X) qui commence
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // Retourne le gagnant
      }
    }
    return null;
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="container mt-5">
        <h1 className="text-primary">Hello Bootstrap 5 + React 👋</h1>
        <button className="btn btn-success">Clique moi</button>
      </div>
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          status={status}
        />
      </div>
      <div className="game-info">
        {isThinking && (
          <div className="thinking">
            🤖 L'ordinateur réfléchit...
            <div className="spinner" />
          </div>
        )}
      </div>
      <button onClick={() => restart()}>Restart</button>
    </div>
  );
}

export default Game;
