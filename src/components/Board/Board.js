import React from "react";
import "./Board.css";

const classByTurn = ["turnO", "turnNo", "turnX"];
const classByCells = ["cellO", "cellNo", "cellX"];
const classByWinCells = ["", "cellWin"];

/*
Renders board of Tic Tac Toe game (3x3 cells). 
CSS classes for every Cell are set according to the content and different game states.
"onCellClick" events added to empty cells only when "clickDisabled" is false.
*/
const board = props => {
  const { turn, cells, clicksEnabled, onCellClick, winVisible, winCells } = props;

  const renderCell = (value, index) => {
    let result = null;
    let classCell = "Cell " + classByCells[value + 1]; // + 1 because [-1, 0, +1];
    if (winVisible) {
      // Apply winCells styling if the game is over and there is a winner
      if (winCells.includes(index)) classCell += " " + classByWinCells[1];
    }
    if (clicksEnabled && value === 0) {
      // Add click event to cells only if the cell is empty and clicksEnabled is true
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

  let classBoard = "Board " + classByTurn[turn + 1]; // + 1 because [-1, 0, +1];

  return <div className={classBoard}>{cells.map(renderCell)}</div>;
};

export default board;
