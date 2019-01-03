import React from "react";
import "./Board.css";

export const classByGameState = ["gameNo", "gamePvp", "gamePvc", "gameDemo"];
export const classByWinner = ["winnerO", "winnerNo", "winnerX"];
export const classByTurn = ["turnO", "turnNo", "turnX"];
export const classByCells = ["cellO", "cellNo", "cellX"];
export const classByWinCells = ["", "cellWin"];

const board = props => {
  const { gameState, winner, turn, cells, winCells, onCellClick } = props;
  const inputEnabled = gameState === 1 || gameState === 2;
  const winnerExist = gameState === 0 && winner !== 0;

  const renderCell = (value, index, all) => {
    let result = null;
    let classCell = "Cell " + classByCells[value + 1]; // +1 because [-1, 0, +1];
    if (winnerExist) {
      // The game is over and there is a winner, apply winCells styling
      if (winCells.includes(index)) classCell += " " + classByWinCells[1];
    }
    if (inputEnabled && value === 0) {
      // Add events to the cell only if the input enabled and cell is empty
      result = (
        <div
          key={index}
          className={classCell}
          onClick={() => onCellClick(index)}
        />
      );
    } else result = <div key={index} className={classCell} />;

    return result;
  };

  let classBoard =
    "Board" +
    " " +
    classByGameState[gameState] +
    " " +
    classByWinner[winner + 1] + // +1 because [-1, 0, +1];
    " " +
    classByTurn[turn + 1]; // +1 because [-1, 0, +1];

  return <div className={classBoard}>{cells.map(renderCell)}</div>;
};

export default board;
