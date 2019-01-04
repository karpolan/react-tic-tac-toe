/*******************************************************************************
"Tic Tac Toe" Game on JavaScript - Export of Game routines

Copyright (c) KARPOLAN <i@karpolan.com> (https://karpolan.com)
*******************************************************************************/
export {
	getGameState, setGameState,
	getTurn, setTurn,
	getWinner, setWinner,
	getIntellect,
	getCells, getCell, setCell,
	getSums,
	getWinCells, setWinCells,
} from './core'; 		

export {
	gameStart,
	setOnGameStopCallback,
	gameStop,
	setOnTurnCallback,
	onTurnComplete,
	turnByIntelect,
} from './logic';
