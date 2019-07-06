import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';

const classByTurn = ['turnO', 'turnNo', 'turnX'];
const classByCells = ['cellO', 'cellNo', 'cellX'];
const classByWinCells = ['', 'cellWin'];

/**
 * Renders board of Tic Tac Toe game (3x3 cells).
 * CSS classes for every Cell are set according to the content and different game states.
 * "onCellClick" events added to empty cells only when "clicksEnabled" is true.
 */
const Board = (props) => {
  const { turn, cells, clicksEnabled, onCellClick, winVisible, winCells } = props;

  const renderCell = (value, index) => {
    let classCell = `Cell ${classByCells[value + 1]}`; // + 1 because [-1, 0, +1];
    if (winVisible) {
      // Apply winCells styling when the game is over and there is a winner
      if (winCells.includes(index)) classCell += ` ${classByWinCells[1]}`;
    }
    let onClick = null;
    if (clicksEnabled && value === 0 && typeof onCellClick === 'function') {
      // Add click event to cells only when the cell is empty and clicksEnabled is true
      onClick = () => onCellClick(index);
    }
    return <div key={index} className={classCell} onClick={onClick} />;
  };

  const classBoard = `Board ${classByTurn[turn + 1]}`; // + 1 because [-1, 0, +1];
  return <div className={classBoard}>{cells.map(renderCell)}</div>;
};

Board.propTypes = {
  turn: PropTypes.number.isRequired,
  cells: PropTypes.arrayOf(PropTypes.number).isRequired,
  clicksEnabled: PropTypes.bool,
  onCellClick: PropTypes.func,
  winVisible: PropTypes.bool,
  winCells: PropTypes.arrayOf(PropTypes.number),
};

Board.defaultProps = {
  clicksEnabled: false,
  winVisible: false,
  winCells: [],
};

export default Board;
