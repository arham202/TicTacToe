import './styles.scss';
import Square from './components/Square';
import Board from './components/board';
import History from './components/History';
import StatusMessage from './components/StatusMessage';
import { useState } from 'react';
import { calculateWinner } from './winner';

function App() {
  const [history, setHistory] = useState([
    { square: Array(9).fill(null), isXNext: false },
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const [square, setSquare] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(gamingBoard.square);
  // console.log({ history, currentMove });

  const handleSquareClick = clickedPosition => {
    if (gamingBoard.square[clickedPosition] || winner) {
      return;
    }

    setHistory(currentHistory => {
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];

      const nextGamingState = lastGamingState.square.map(
        (squarevalue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? 'X' : 'O';
          }
          return squarevalue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        square: nextGamingState,
        isXNext: !lastGamingState.isXNext,
      });
    });

    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  return (
    <div className="app">
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        square={gamingBoard.square}
        handleSquareClick={handleSquareClick}
      />
      <h3>Current Game History</h3>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;
