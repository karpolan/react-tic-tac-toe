/*
export {
	cellsDefault, cellsCenter, cellsCorners,
	sumsDefault,
	mapCellsToSum
} from './consts';
*/

export {
	getGameState, setGameState,
	getTurn, setTurn,
	getWinner, setWinner,
	getIntellect,
	getCells, getCell, setCell,
	getSums,
	getWinCells, setWinCells,
} from './core'; 		// Getter and Setter for variables as a store
//} from './core-react'; 	// Getter and Setter for React's Game.store

export {
	gameStart,
	gameStop,
	onTurnComplete,
	turnByIntelect,
} from './logic';
