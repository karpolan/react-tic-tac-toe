//import * as game from './index';
import * as consts from './consts';
import * as core from './core';

/*=============================================================================
Tools and utilities
=============================================================================*/

//------------------------------------------------------------------------------
// Calculates sum of cells by its' indexes. Used to verify "winning" cells and 
// to make a good turn.
const cellsSumOf = (arrayOfCellIndexes) => {
	let arrayOfCellValues = arrayOfCellIndexes.map((value) => core.getCell(value));
	let sumOfCellValues = arrayOfCellValues.reduce((prev, curr) => prev + curr);
	return sumOfCellValues;
}

//------------------------------------------------------------------------------
// Returns number of empty cells
const cellsEmptyCount = () => {
	let count = 0;
	// Todo: Change to forEach() or reduce()
	for (let i = 0; i < core.getCells().length; i++) {
		if (core.getCell(i) === 0) count++;
	}
	return count;
}

//------------------------------------------------------------------------------
// Updates summaries for horizontal, vertical and diagonal lines of cells
const sumsUpdate = () => {
	let sumsArray = core.getSums();
	for (let i = 0; i < consts.mapCellsToSum.length; i++) {
		sumsArray[i] = cellsSumOf(consts.mapCellsToSum[i])
	}
}

//------------------------------------------------------------------------------
// Returns true if there is some winning line on the game board
const winnerExist = () => {
	let highSums = core.getSums().filter((value) => (Math.abs(value) >= 3));
	return (highSums.length > 0)
}

/*=============================================================================
The gaming process
=============================================================================*/

//------------------------------------------------------------------------------
// Starts a new game, also reset all params to defaults 
export const gameStart = (newGameState = 1, newTurn = 1) => {
	// Fill cells with zeros 
	consts.cellsDefault.map((index)=> core.setCell(index, 0));

	sumsUpdate(); 			// Recalculate summaries (actually fill with zeros) 
	core.setWinCells([]);	// Delete any "winning" cells
	core.setTurn(newTurn); 	// Who will make a turn first, "x" turn by default 

	// Allow to paly the game or start the demo mode
	core.setGameState(newGameState); 	
	console.log('gameStart() successful. gameState: %s turn: %s', 
		core.getGameState(), core.getTurn());
}

//------------------------------------------------------------------------------
// Stops any gaming activity. Called when there is no turn, some player wins, 
// or critical error occurs 
export const gameStop = () => {
	core.setGameState(0); 	// stop any gaming activity
	core.setTurn(0);		// no future turns

	// Verify if there a winner and the winning combination
	// Todo: Add a surrender case here
	if (winnerExist()) { 
		let cellIndexes = [];
		core.getSums().map((value, index) => {
			let line = consts.mapCellsToSum[index];	
			if (Math.abs(value) >= 3) 
				cellIndexes.push.apply(cellIndexes, line); 
//				cellIndexes = line; 
			return line;	
		});

		core.setWinCells(cellIndexes);
		if (cellIndexes.length > 0) 
			core.setWinner(core.getCell(cellIndexes[0])); // -1 or 1
		else
			core.setWinner(0); // Todo: Verify surrender case	
	} else {
		core.setWinner(0);
	}

	console.log('gameStop() successful. winner: %s, winCells: %o', 
		core.getWinner(), core.getWinCells());	
} // gameStop

//------------------------------------------------------------------------------
// Event is called at the end of every successful turn
export const onTurnComplete = (theTurn = 0) => {
	// Recalculate line summfries
	sumsUpdate();

	if (winnerExist()) {
		// Stop the game, somebody wins
		gameStop(theTurn);
		return; 
	}

	if (cellsEmptyCount() < 1) {
		// Stop the game, there is no empty cells to make new turn. 
		// Todo: Verify is it a draw?
		gameStop(theTurn);
		return; 
	}

	// Set the turn marker to opposite value and continue the game
	core.setTurn(core.getTurn() * -1)
}

//------------------------------------------------------------------------------
// Takes some empty cell by random
const turnRandom = (theTurn = 0) => {
	let emptyCells = []; // Array of Indexes for every empty cell
	
	// Get indexes of every empty cells 
	// Todo: Change to forEach() or map()
	for (let i = 0; i < core.getCells().length; i++) {
		if (core.getCell(i) === 0) emptyCells.push(i);
	}

	if (emptyCells.length < 1) {
		// There is no empty cells!!! Todo: stop the game here
		return false;  
	}

	// Get index of some random empty cell, from 0 to emptyCells.length-1
	let randomIndex = Math.random() * emptyCells.length;

	// Make a rundom turn
	if (theTurn === 0) theTurn = core.getTurn(); // Use global value if not set
	console.log("turnRandom() at %s cell", emptyCells[randomIndex]);
	return core.setCell(emptyCells[randomIndex], theTurn);
}

//------------------------------------------------------------------------------
// Takes center cell if possible
const turnCenter = (theTurn = 0) => {
	if (core.getCell(consts.cellsCenter) !== 0) return false; // Center is taken

	// Make a center turn
	if (theTurn === 0) theTurn = core.getTurn(); // Use global value if not set	
	console.log("turnCenter() at %s cell", consts.cellsCenter);
	return core.setCell(consts.cellsCenter, theTurn);
}

//------------------------------------------------------------------------------
// Takes some corner cell by random
const turnCorner = (theTurn = 0) => {
	let emptyCells = []; // Array of Indexes for empty cell on the conners
	// Variant 1
	// if (getCell(cellsCorners[0]) == 0) emptyCells.push(cellsCorners[0]);
	// if (getCell(cellsCorners[1]) == 0) emptyCells.push(cellsCorners[1]);
	// if (getCell(cellsCorners[2]) == 0) emptyCells.push(cellsCorners[2]);
	// if (getCell(cellsCorners[3]) == 0) emptyCells.push(cellsCorners[3]);
	// Variant 2
	emptyCells = consts.cellsCorners
		.filter((value) => core.getCell(value) === 0);
	console.log("turnCenter() - emptyCells: ", emptyCells);
	if (emptyCells.length < 1) return false;	// There is no empty corners
	
	// Get index of some random corner cell, from 0 to emptyCells.length-1
	let randomIndex = Math.random() * emptyCells.length;	

	// Make a corner turn
	if (theTurn === 0) theTurn = core.getTurn(); // Use global value if not set	
	console.log("turnCorner() at %s cell", emptyCells[randomIndex]);
	return core.setCell(emptyCells[randomIndex], theTurn);
}

//------------------------------------------------------------------------------
// Blocks possible winning turn by opposite player 
const turnBlock = (theTurn = 0) => {
	if (theTurn === 0) theTurn = core.getTurn();	// Use global value if not set	
	let lookFor = -2;
	if (theTurn < 0) lookFor = 2;

	for (let i = 0; i < core.getSums().length; i++)
		if (core.getSums()[i] === lookFor) {
			// Opposite player can win on this line
			let lineCellIndexes = consts.mapCellsToSum[i];
			for (let j = 0; j < lineCellIndexes.length; j++) {
				if (core.getCell(lineCellIndexes[j]) === 0) {
					// We found an empty cell on the specific line
					console.log("turnBlock() at %s for %o line", lineCellIndexes[j], lineCellIndexes);
					return core.setCell(lineCellIndexes[j], theTurn);
				}
			}	
			// Something wrong with this line :(
			console.warn("turnBlock() - cannot make a defense turn on a blocking line %o", lineCellIndexes);
		}
	return false; // There is no blocking turn
} // turnBlock

//------------------------------------------------------------------------------
// Makes winning turn if possible 
const turnWin = (theTurn = 0) => {
	if (theTurn === 0) theTurn = core.getTurn();	// Use global value if not set	
	let lookFor = 2;
	if (theTurn < 0) lookFor = -2; 

	for (let i = 0; i < core.getSums().length; i++)
		if (core.getSums()[i] === lookFor) {
			// We can take a win on this line
			let lineCellIndexes = consts.mapCellsToSum[i];
			for (let j = 0; j < lineCellIndexes.length; j++) {
				if (core.getCell(lineCellIndexes[j]) === 0) {
					// We found an empty cell on the specific line
					console.log("turnWin() at %s for %o line", lineCellIndexes[j], lineCellIndexes);
					return core.setCell(lineCellIndexes[j], theTurn);
				}
			}	
			// Something wrong with this line :(
			console.warn("turnWin() - cannot make a winning turn on a line %o", lineCellIndexes);
		}
	return false; // There is no winning turn
} // turnWin

//------------------------------------------------------------------------------
// Performs computer turn depending on current level of the intelect	
export const turnByIntelect = (theTurn = 0) => {
	if (theTurn === 0) theTurn = core.getTurn(); // Use global value if not set	
	let result = false;	
	switch (core.getIntellect()) {
		case 5:		// Win -> Block -> Center -> Corner -> Random turns
			result = 
				turnWin(theTurn) || 
				turnBlock(theTurn) ||
				turnCenter(theTurn) ||
				turnCorner(theTurn) ||
				turnRandom(theTurn);
			break;
		case 4:		// Win -> Center -> Corner -> Random turns
			result = 
				turnWin(theTurn) || 
				turnCenter(theTurn) ||
				turnCorner(theTurn) ||
				turnRandom(theTurn);
			break;
		case 3:		// Center -> Corner -> Random turns 
			result = 
				turnCenter(theTurn) ||
				turnCorner(theTurn) ||
				turnRandom(theTurn);
			break;
		case 2:		// Center -> Random turns 
			result = 
				turnCenter(theTurn) ||
				turnRandom(theTurn);
			break;
		case 1: 	// Random turns 
			result = turnRandom(theTurn);
			break;
		default:	// No intellect, play manually	
			result = false;
	}
	// Fire the event if the turn is successful 
	if (result) onTurnComplete(theTurn);
	return result;
} // turnByIntelect
