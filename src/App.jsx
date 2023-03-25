import './styles.scss';
import Square from './components/Square';
import Board from './components/board';
import { useState } from 'react';
import { calculateWinner } from './winner';

function App() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(square);
  const nextplayer = isXNext ? 'X' : 'O';
  const statusMessage = winner
    ? `Winner is ${winner}`
    : `Next Player is ${nextplayer}`;

  // console.log(winner);

  const handleSquareClick = clickedPosition => {
    if (square[clickedPosition] || winner) {
      return;
    }

    setSquare(currentSquares => {
      return currentSquares.map((squarevalue, position) => {
        if (clickedPosition === position) {
          return isXNext ? 'X' : 'O';
        }
        return squarevalue;
      });
    });

    setIsXNext(currentIsXNext => !currentIsXNext);
  };

  return (
    <div className="app">
      <h2>{statusMessage}</h2>
      <Board square={square} handleSquareClick={handleSquareClick} />
    </div>
  );
}

export default App;
