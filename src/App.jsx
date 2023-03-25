import './styles.scss';
import Square from './components/Square';
import Board from './components/board';
import History from './components/History';
import StatusMessage from './components/StatusMessage';
import { useState } from 'react';
import { calculateWinner } from './winner';

const New_Game = [{ square: Array(9).fill(null), isXNext: true }];

function App() {
  const [history, setHistory] = useState(New_Game);

  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const { winner, winningsquares } = calculateWinner(gamingBoard.square);

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

  const onNewGameState = () => {
    setHistory(New_Game);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE
      </h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        square={gamingBoard.square}
        handleSquareClick={handleSquareClick}
        winningsquares={winningsquares}
      />

      <button
        type="button"
        onClick={onNewGameState}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Start New Game
      </button>

      <h3 style={{
        fontWeight : 'normal',
      }
      }>Current Game History</h3>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;
