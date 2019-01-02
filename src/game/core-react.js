/*==============================================================================
Getters and Setters for Game.state.xxx as a storage
==============================================================================*/
import Game from '../containers/Game/Game';

export const getGameState = () => Game.getGameState();
export const setGameState = (value) => Game.setGameState(value);

export const getTurn = () => Game.getTurn();
export const setTurn = (value) => Game.setTurn(value);

export const getWinner = () => Game.getWinner();
export const setWinner = (value) => Game.setWinner(value);

export const getIntellect = () => Game.getIntellect();

export const getCells = () => Game.getCells();
export const getCell = (index) => Game.getCell(index);
export const setCell = (index, value) => Game.setCell(index, value);
 
export const getSums = () => Game.getSums();

export const getWinCells = () => Game.getWinCells();
export const setWinCells = (value) => Game.setWinCells(value);
