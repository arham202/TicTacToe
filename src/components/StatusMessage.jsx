import React from "react";

const StatusMessage = ({ winner, isXNext, square }) => {
  const noMoveLeft = square.every(squareValue => squareValue !== null);
  const nextplayer = isXNext ? 'X' : 'O';

  const renderstatusmessage = () => {
    if (winner) {
      return (
        <React.Fragment>
          Winner is{' '}
          <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner}
          </span>
          </React.Fragment>
      );
    }

    if (!winner && noMoveLeft) {
      return (
        <React.Fragment>
          <span className="text-orange">O</span> And{' '}
          <span className="text-green">X</span> tied
        </React.Fragment>
      );
    }

    if (!winner && !noMoveLeft) {
      return (
        <>
          Next Player is{' '}
          <span className={isXNext ? 'text-green' : 'text-orange'}>
            {nextplayer}
          </span>
        </>
      );
    }
    return null;
  };

  return <div className="status-message">{renderstatusmessage()}</div>;
};

export default StatusMessage;
