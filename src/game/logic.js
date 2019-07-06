/**
 * "Tic Tac Toe" Game on JavaScript - Game Logic
 * @author: Anton Karpenko <i@karpolan.com>
 * Copyright (c) KARPOLAN (https://karpolan.com)
 */
import * as consts from './consts';
import * as core from './core';

/* -----------------------------------------------------------------------------
  Tools and utilities
----------------------------------------------------------------------------- */

/**
 * Calculates sum of cells by its' indexes. Used to verify "winning" cells and to make a good turn.
 * @param {array[] of number} arrayOfCellIndexes - array with Indexes of Cells to calculate.
 * @return {number} sum of cell Values for given Indexes.
 */
const cellsSumOf = (arrayOfCellIndexes) => {
  const arrayOfCellValues = arrayOfCellIndexes.map((value) => core.getCell(value));
  const sumOfCellValues = arrayOfCellValues.reduce((prev, curr) => prev + curr);
  return sumOfCellValues;
};

/**
 * Returns number of empty cells
 */
const cellsEmptyCount = () => {
  let count = 0;
  // Todo: Change to forEach() or reduce()
  for (let i = 0; i < core.getCells().length; i++) {
    if (core.getCell(i) === 0) count++;
  }
  return count;
};

/**
 * Updates summaries for horizontal, vertical and diagonal lines of cells.
 */
const sumsUpdate = () => {
  const sumsArray = core.getSums();
  for (let i = 0; i < consts.mapCellsToSum.length; i++) {
    sumsArray[i] = cellsSumOf(consts.mapCellsToSum[i]);
  }
};

/**
 * Returns true if there is some winning line on the game board.
 */
const winnerExist = () => {
  const highSums = core.getSums().filter((value) => Math.abs(value) >= 3);
  return highSums.length > 0;
};

/* -----------------------------------------------------------------------------
  The Gaming process
----------------------------------------------------------------------------- */

/**
 * Perform AI turn after some delay for Demo and PvE mode for player O (-1)
 */
const makeDelayedTurnIfNeeded = () => {
  if (core.getGameState() === 3 || (core.getGameState() === 2 && core.getTurn() === -1)) {
    setTimeout(() => {
      turnByIntelect();
    }, consts.GAME_DELAY_AUTO_TURNS);
  }
};

/**
 * Starts a new game, also reset all params to defaults
 * @param {number} newGameState - What is the kind of new game? (PvP, PvE, Demo)
 * @param {number} newTurn - Who will make a turn first? (1: X, -1: O)
 * @param {number} newIntelect - What is level of intelect for 2nd player (0: Manual turns, 1..5: Level of AI)
 */
export const gameStart = (newGameState = 1, newTurn = 1, newIntelect = consts.GAME_INTELECT_DEFAULT) => {
  // Fill cells with zeros
  consts.cellsDefault.map((index) => core.setCell(index, 0));

  sumsUpdate(); // Recalculate summaries (actually fill with zeros)
  core.setWinCells([]); // Delete any "winning" cells
  core.setTurn(newTurn); // Who will make a turn first, "x" turn by default
  core.setIntellect(newIntelect); // Update AI level if needed

  core.setGameState(newGameState);

  // Perform AI turn after some delay for Demo and PvE mode for player O (-1)
  makeDelayedTurnIfNeeded();

  console.log(
    'gameStart(%s, %s, %s) - gameState: %s, intelect: %s',
    newGameState,
    newTurn,
    newIntelect,
    core.getGameState(),
    core.getIntellect()
  );
}; // gameStart

/**
 * Custom callback to be called at the end of the Game.
 */
let _gameStopCallback = null;
export const setOnGameStopCallback = (value) => {
  _gameStopCallback = value;
};

/**
 * Stops any gaming activity. Called when there is no turn, some player wins, or the critical error occurs.
 */
export const gameStop = () => {
  core.setGameState(0); // stop any gaming activity
  core.setTurn(0); // no future turns

  // Verify if there a winner and the winning combination
  // Todo: Add a "surrender" case here
  if (winnerExist()) {
    const cellIndexes = [];
    core.getSums().map((value, index) => {
      const line = consts.mapCellsToSum[index];
      if (Math.abs(value) >= 3) {
        cellIndexes.push.apply(cellIndexes, line);
      }
      // cellIndexes = line;
      return line;
    });

    core.setWinCells(cellIndexes);
    if (cellIndexes.length > 0) {
      core.setWinner(core.getCell(cellIndexes[0]));
    } // -1 or 1
    else {
      core.setWinner(0);
    } // Todo: Verify surrender case
  } else {
    core.setWinner(0);
  }

  // Call custom callback if set
  if (_gameStopCallback && typeof _gameStopCallback === 'function') {
    _gameStopCallback();
  }

  console.log(
    'gameStop() - gameState: %s, winner: %s, winCells: %o',
    core.getGameState(),
    core.getWinner(),
    core.getWinCells()
  );
}; // gameStop

/**
 * Custom callback to be called at the end of every successful turn
 */
let _turnCompleteCallback = null;
export const setOnTurnCallback = (value) => {
  _turnCompleteCallback = value;
};

/**
 * Event is called at the end of every successful turn.
 * @param {number} theTurn - id of the player who did the turn (1: X, -1: O)
 */
export const onTurnComplete = (theTurn = 0) => {
  // Recalculate line summfries
  sumsUpdate();

  // Set the turn marker to opposite value
  core.setTurn(core.getTurn() * -1);

  // Call custom callback if set
  if (_turnCompleteCallback && typeof _turnCompleteCallback === 'function') {
    _turnCompleteCallback();
  }

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

  // Perform AI turn after some delay for Demo and PvE mode for player O (-1)
  makeDelayedTurnIfNeeded();
}; // onTurnComplete

/* -----------------------------------------------------------------------------
  The AI turns
----------------------------------------------------------------------------- */
/**
 * Takes some empty cell by random
 * @param {number} theTurn - id of the player who is making the turn (1: X, -1: O)
 */
const turnRandom = (theTurn = 0) => {
  const emptyCells = []; // Array of Indexes for every empty cell

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
  const randomIndex = Math.trunc(Math.random() * emptyCells.length);

  // Make a rundom turn
  if (theTurn === 0) theTurn = core.getTurn(); // Use global value if not set
  console.log('turnRandom(%s) - at %s cell', theTurn, emptyCells[randomIndex]);
  return core.setCell(emptyCells[randomIndex], theTurn);
};

/**
 * Takes center cell if possible
 * @param {number} theTurn - id of the player who is making the turn (1: X, -1: O)
 */
const turnCenter = (theTurn = 0) => {
  if (core.getCell(consts.cellsCenter) !== 0) return false; // Center is taken

  // Todo: Add check for "first turn to the corner by oposite player" we should not take center in that case

  // Make a center turn
  if (theTurn === 0) theTurn = core.getTurn(); // Use global value if not set
  console.log('turnCenter(%s) - at %s cell', theTurn, consts.cellsCenter);
  return core.setCell(consts.cellsCenter, theTurn);
};

/**
 * Takes some corner cell by random.
 * @param {number} theTurn - id of the player who is making the turn (1: X, -1: O)
 */
const turnCorner = (theTurn = 0) => {
  let emptyCells = []; // Array of Indexes for empty cell on the conners
  // Variant 1
  // if (getCell(cellsCorners[0]) == 0) emptyCells.push(cellsCorners[0]);
  // if (getCell(cellsCorners[1]) == 0) emptyCells.push(cellsCorners[1]);
  // if (getCell(cellsCorners[2]) == 0) emptyCells.push(cellsCorners[2]);
  // if (getCell(cellsCorners[3]) == 0) emptyCells.push(cellsCorners[3]);
  // Variant 2
  emptyCells = consts.cellsCorners.filter((value) => core.getCell(value) === 0);
  //	console.log("turnCorner() - emptyCells: ", emptyCells);
  if (emptyCells.length < 1) return false; // There is no empty corners

  // Get index of some random corner cell, from 0 to emptyCells.length-1
  const randomIndex = Math.trunc(Math.random() * emptyCells.length);

  // Make a corner turn
  if (theTurn === 0) theTurn = core.getTurn(); // Use global value if not set
  console.log('turnCorner(%s) - at %s cell', theTurn, emptyCells[randomIndex]);
  return core.setCell(emptyCells[randomIndex], theTurn);
};

/**
 * Blocks possible winning turn by opposite player
 * @param {number} theTurn - id of the player who is making the turn (1: X, -1: O)
 */
const turnBlock = (theTurn = 0) => {
  if (theTurn === 0) theTurn = core.getTurn(); // Use global value if not set
  let lookFor = -2;
  if (theTurn < 0) lookFor = 2;

  for (let i = 0; i < core.getSums().length; i++) {
    if (core.getSums()[i] === lookFor) {
      // Opposite player can win on this line
      const lineCellIndexes = consts.mapCellsToSum[i];
      for (let j = 0; j < lineCellIndexes.length; j++) {
        if (core.getCell(lineCellIndexes[j]) === 0) {
          // We found an empty cell on the specific line
          console.log('turnBlock(%s) - at %s for %o line', theTurn, lineCellIndexes[j], lineCellIndexes);
          return core.setCell(lineCellIndexes[j], theTurn);
        }
      }
      // Something wrong with this line :(
      console.warn('turnBlock(%s) - cannot make a defense turn on a blocking line %o', theTurn, lineCellIndexes);
    }
  }
  return false; // There is no blocking turn
}; // turnBlock

/**
 *  Makes winning turn if possible.
 * @param {number} theTurn - id of the player who is making the turn (1: X, -1: O)
 */
const turnWin = (theTurn = 0) => {
  if (theTurn === 0) theTurn = core.getTurn(); // Use global value if not set
  let lookFor = 2;
  if (theTurn < 0) lookFor = -2;

  for (let i = 0; i < core.getSums().length; i++) {
    if (core.getSums()[i] === lookFor) {
      // We can take a win on this line
      const lineCellIndexes = consts.mapCellsToSum[i];
      for (let j = 0; j < lineCellIndexes.length; j++) {
        if (core.getCell(lineCellIndexes[j]) === 0) {
          // We found an empty cell on the specific line
          console.log('turnWin(%s) - at %s for %o line', theTurn, lineCellIndexes[j], lineCellIndexes);
          return core.setCell(lineCellIndexes[j], theTurn);
        }
      }
      // Something wrong with this line :(
      console.warn('turnWin(%s) - cannot make a winning turn on a line %o', theTurn, lineCellIndexes);
    }
  }
  return false; // There is no winning turn
}; // turnWin

/**
 * Performs the turn depending on current level of the AI intelect
 * @param {number} theTurn - id of the player who is making the turn (1: X, -1: O)
 * @param {*} theIntelect - level of AI to use (0: manual turn, 1..5: "easy" to "hard" level)
 */

export const turnByIntelect = (theTurn = 0, theIntelect = 0) => {
  if (theTurn === 0) theTurn = core.getTurn(); // Use global value if not set
  if (theIntelect === 0) theIntelect = core.getIntellect(); // Use global value if not set

  // Todo: Add check for "first turn to the corner by oposite player" we should not take center in that case

  let result = false;
  switch (theIntelect) {
    case 5: // Win -> Block -> Center -> Corner -> Random turns
      result =
        turnWin(theTurn) || turnBlock(theTurn) || turnCenter(theTurn) || turnCorner(theTurn) || turnRandom(theTurn);
      break;
    case 4: // Win -> Center -> Corner -> Random turns
      result = turnWin(theTurn) || turnCenter(theTurn) || turnCorner(theTurn) || turnRandom(theTurn);
      break;
    case 3: // Center -> Corner -> Random turns
      result = turnCenter(theTurn) || turnCorner(theTurn) || turnRandom(theTurn);
      break;
    case 2: // Center -> Random turns
      result = turnCenter(theTurn) || turnRandom(theTurn);
      break;
    case 1: // Random turns
      result = turnRandom(theTurn);
      break;
    default:
      // No intellect, play manually
      result = false;
  }
  // Fire the event if the turn is successful
  if (result) onTurnComplete(theTurn);
  return result;
}; // turnByIntelect
