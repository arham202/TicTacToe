import './styles.scss';
import Square from './components/Square';
import Board from './components/board';
import StatusMessage from './components/StatusMessage';
import { useState } from 'react';
import { calculateWinner } from './winner';


function App() {

  const [square, setSquare] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(square);
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
      <StatusMessage winner = {winner} isXNext = {isXNext} square = {square} />
      <Board square={square} handleSquareClick={handleSquareClick} />
    </div>
    
  );
}

export default App;
