import * as consts from './consts';

/*==============================================================================
Consts and variables
==============================================================================*/
/*
State of the gaming process. Possible values: 
	0	: game is stoped/over
	1	: player VS player game is running
	2	: player VS compiter game is running
	3	: game is running in demo mode
*/
let _gameState = 0;

/*
Identificator of the winner in the previus game. Possible values: 
	0	: no winner, the game was draw.
	1	: X player won the previous game
	-1	: 0 player won the previous game
*/
let _winner = 0;    

/*
Marker of the current turn in the gaming process. Possible values: 
	0	: turns are stopped/disabled
	1	: turn by X player
	-1	: turn by 0 player
*/
let _turn = 0;

/*
Switch for second (a computer) player's intelect level
	0		: manual play 
	1..5	: easy to hard AI
*/
let _intellect = 5; 

/*
Cells array for the game board has following structure:
    0 1 2 
    3 4 5 
    6 7 8 
Possible values: 
	0	: empty cell
	1	: X cell
	-1	: 0 cell
Must be filled with 0 at the beginnig of the game, use cellsDefault for that.
Note: Don't set cells[] values directly! Use setCell() as a setter function.
*/
let _cells = [...consts.cellsDefault]; 

/*
The winning combination on the game board is culculated as a math sum of cells 
that belong to the same line. There is a winning combination if Math.abs(sum[i])
of any line sum is greater then 2 (actually 3 or -3), Current "sums" are stored 
in [0..7] array of integers: 3 horizontal, 3 vertical and 2 diagonal directions.
Note: The sums array is updated after every turn of both players.
*/
let _sums = [...consts.sumsDefault];

/*
The "Win cells" contain indexes of board cells that belong to the winning line 
if there is a winning combination.
Note: Values are valid only if there is a "winner" and there is no "surrender".
*/
let _winCells = []; 

/*==============================================================================
Getters and Setters. 
==============================================================================*/

// Getter for the game state. 
const _getGameState = () => {
	return _gameState;
}
// Setter for the current turn. 
const _setGameState  = (value) => {
	const allowedValues = [0, 1, 2, 3]
	if (!allowedValues.includes(value)) {
		console.error('setGameState() - Invalid value parameter: ', value);
		return false;
	}
	_gameState = value;
	return true;
}

//------------------------------------------------------------------------------
// Getter for the winner. 
const _getWinner = () => {
	return _winner;
}
// Setter for the winner. 
const _setWinner = (value) => {
	if (Math.abs(value) > 1) {
		console.error('setWinner() - Invalid value parameter: ', value);
		return false;
	}
	_winner = value;
	return true;
}

//------------------------------------------------------------------------------
// Getter for the current turn. 
const _getTurn = () => {
	return _turn;
}
// Setter for the current turn. 
const _setTurn = (value) => {
	if (Math.abs(value) > 1) {
		console.error('setTurn() - Invalid value parameter: ', value);
		return false;
	}
	_turn = value;
	return true;
}

//------------------------------------------------------------------------------
// Getter for 2nd player intellect. 
const _getIntellect = () => {
	return _intellect;
}

//------------------------------------------------------------------------------
// Getter for array of all game board cells 
const _getCells = () => {
	return _cells;
}
// Getter for a single cell of the game board. 
const _getCell = (index) => {
	if (index < 0 || index >= _cells.length) {
		console.error('getCell() - Invalid index parameter: ', index);
		return 0;
	}
	return getCells()[index];
}
// Setter for a single cell of the game board.
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
}

//------------------------------------------------------------------------------
// Getter for array of line summaries 
const _getSums = () => {
	return _sums;
}

//------------------------------------------------------------------------------
// Getter for array of "winning" cells
const _getWinCells = () => {
	return _winCells;
}
// Setter for array of "winning" cells
const _setWinCells = (value) => {
	if (!Array.isArray(value)) {
		console.error('setWinCells() - Invalid value parameter: ', value);
		return false;
	}
	_winCells = [...value];
}

/*==============================================================================
Override these function to use own storage.
==============================================================================*/

export const getGameState = _getGameState;
export const setGameState = _setGameState;

export const getTurn = _getTurn;
export const setTurn = _setTurn;

export const getWinner = _getWinner;
export const setWinner = _setWinner;

export const getIntellect = _getIntellect;

export const getCells = _getCells;
export const getCell  = _getCell;
export const setCell  = _setCell;
 
export const getSums = _getSums;

export const getWinCells = _getWinCells;
export const setWinCells = _setWinCells;