/**
 * "Tic Tac Toe" Game on JavaScript - Game Core
 * @author: Anton Karpenko <i@karpolan.com>
 * Copyright (c) KARPOLAN (https://karpolan.com)
 */
import * as consts from './consts';

/**
 * What is current "State" of the gaming process?
 * 0: game is stoped/over
 * 1: player VS player (PvP) game is running
 * 2: player VS environment (PvE) game is running
 * 3: game is running in Demo mode
 */
let _gameState = 0;
const _getGameState = () => _gameState;
const _setGameState = (value) => {
  const allowedValues = [0, 1, 2, 3];
  if (!allowedValues.includes(value)) {
    console.error('setGameState() - Invalid value parameter: ', value);
    return false;
  }
  _gameState = value;
  return true;
};

/**
 * Who was the "Winner" in previous game?
 * 0 : no winner, the game was draw.
 * 1 : X player won the previous game.
 * -1: 0 player won the previous game.
 */
let _winner = 0;
const _getWinner = () => _winner;
const _setWinner = (value) => {
  if (Math.abs(value) > 1) {
    console.error('setWinner() - Invalid value parameter: ', value);
    return false;
  }
  _winner = value;
  return true;
};

/**
 * Who is making a "turn" right now?
 * 0 : turns are stopped/disabled
 * 1 : turn by X player.
 * -1: turn by 0 player.
 */
let _turn = 0;
const _getTurn = () => _turn;
const _setTurn = (value) => {
  if (Math.abs(value) > 1) {
    console.error('setTurn() - Invalid value parameter: ', value);
    return false;
  }
  _turn = value;
  return true;
};

/**
 * Waht is "Intelect" level of the second (a computer) player?
 * 0   : manual play
 * 1..5: "easy" to "hard" by AI :)
 */
let _intellect = consts.GAME_INTELECT_DEFAULT;
const _getIntellect = () => _intellect;
const _setIntellect = (value) => {
  if (!Number.isInteger(value) || value < 0) {
    console.error('setIntellect() - Invalid value parameter: ', value);
    return false;
  }
  _intellect = value;
  return true;
};

/**
 * "Cells" array for the game board has following structure:
 *   0 1 2
 *   3 4 5
 *   6 7 8
 * Possible values:
 *   0 : empty cell
 *   1 : X cell
 *   -1: O cell
 * Must be filled with 0 at the beginnig of the game, use cellsDefault for that.
 * Note: Don't set cells[] values directly! Use setCell() as a setter function.
 */
const _cells = [...consts.cellsDefault];
const _getCells = () => _cells;
const _getCell = (index) => {
  if (index < 0 || index >= _cells.length) {
    console.error('getCell() - Invalid index parameter: ', index);
    return 0;
  }
  return getCells()[index];
};
const _setCell = (index, value = 0) => {
  if (index < 0 || index >= _cells.length) {
    console.error('setCell() - Invalid index parameter: ', index);
    return false;
  }
  if (Math.abs(value) > 1) {
    console.error('setCell() - Invalid value parameter: ', value);
    return false;
  }
  // Must be a single place of the program where cells value is changed!
  getCells()[index] = value;
  //	console.log('setCell(%s, %s) sucessful', index, value);
  return true;
};

/**
 * The "winning combination" on the game board is culculated as a math sum of cells
 * that belong to the same line. There is a winning combination if Math.abs(sum[i])
 * of any line sum is greater then 2 (actually 3 or -3), Current "sums" are stored
 * in [0..7] array of integers: 3 horizontal, 3 vertical and 2 diagonal directions.
 * Note: The sums array is recalculated after every turn.
 */
const _sums = [...consts.sumsDefault];
const _getSums = () => _sums;

/**
 * The "Win cells" contain indexes of board cells that belong to the winning line
 * if there is a winning combination.
 * Note: Values are valid only if there is the "winner".
 */
let _winCells = [];
const _getWinCells = () => _winCells;
const _setWinCells = (value) => {
  if (!Array.isArray(value)) {
    console.error('setWinCells() - Invalid value parameter: ', value);
    return false;
  }
  _winCells = [...value];
};

/**
 * You may override exported functions to use own storage.
 */
const getGameState = _getGameState;
const setGameState = _setGameState;

const getTurn = _getTurn;
const setTurn = _setTurn;

const getWinner = _getWinner;
const setWinner = _setWinner;

const getIntellect = _getIntellect;
const setIntellect = _setIntellect;

const getCells = _getCells;
const getCell = _getCell;
const setCell = _setCell;

const getSums = _getSums;

const getWinCells = _getWinCells;
const setWinCells = _setWinCells;

export {
  getGameState,
  setGameState,
  getTurn,
  setTurn,
  getWinner,
  setWinner,
  getIntellect,
  setIntellect,
  getCells,
  getCell,
  setCell,
  getSums,
  getWinCells,
  setWinCells,
};
