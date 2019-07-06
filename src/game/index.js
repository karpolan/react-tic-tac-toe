/**
 * "Tic Tac Toe" Game on JavaScript - Export of Game routines
 * @author: Anton Karpenko <i@karpolan.com>
 * Copyright (c) KARPOLAN (https://karpolan.com)
 */
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
} from './core';

export { gameStart, setOnGameStopCallback, gameStop, setOnTurnCallback, onTurnComplete, turnByIntelect } from './logic';
