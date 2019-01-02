import React, { Component } from "react";
import "./Game.css";
import * as game from "../../game/index";
import Board from "../../components/Game/Board/Board";

class Game extends Component {
  constructor(props) {
    super(props); // Don't call this.setState() here!
    this.state = {
      gameState: 0, // 0 - the game is over, 1 - with Player, 2 - with Comp, 3 - Demo-mode
      turn: 0, // 0 - no-turns, 1 - X turns, -1 - 0 turns.
      winner: 0, // 0 - draw, 1 - X won, -1 - 0 won.
      intellect: 5, // 0 - manual game, 1 - easy... 5 - hard
      cells: [...Array(9)], // The board cells, by horisontal lines from uper left to boootm right.
      sums: [...Array(8)], // Sums of the board cells by lines and diagonals to verify the winning combination
      winCells: [] // Indexes of winning cells if there is some winning combination.
    };
    game.gameStart(1, 1);
  } // constructor

  //==========================================================================
  // Getters and Setters to conect state/storage with the Game Engine
  //==========================================================================

  //--------------------------------------------------------------------------
  // Setter/Getter for the game state.
  getGameState = () => this.state.gameState;
  setGameState = value => {
    const allowedValues = [0, 1, 101];
    if (allowedValues.includes(value)) {
      console.error("setGameState() - Invalid value parameter: ", value);
      return false;
    }
    this.setState({ gameState: value });
    return true;
  };
  //--------------------------------------------------------------------------
  // Getter/Setter for the current turn.
  getTurn = () => this.state.turn;
  setTurn = value => {
    if (Math.abs(value) > 1) {
      console.error("setTurn() - Invalid value parameter: ", value);
      return false;
    }
    this.setState({ turn: value });
    return true;
  };
  //--------------------------------------------------------------------------
  // Getter/Setter for the winner.
  getWinner = () => this.state.winner;
  setWinner = value => {
    if (Math.abs(value) > 1) {
      console.error("setWinner() - Invalid value parameter: ", value);
      return false;
    }
    this.setState({ winner: value });
    return true;
  };
  //--------------------------------------------------------------------------
  // Getter/Setter for 2nd player intellect.
  getIntellect = () => this.state.intellect;

  //--------------------------------------------------------------------------
  // Getter/Setter for the board cells
  getCells = () => this.state.cells;
  getCell = index => {
    if (index < 0 || index >= Game.state.cells.length) {
      console.error("getCell() - Invalid index parameter: ", index);
      return 0;
    }
    return this.state.cells[index];
  };
  setCell = (index, value = 0) => {
    if (index < 0 || index >= Game.state.cells.length) {
      console.error("setCell() - Invalid index parameter: ", index);
      return false;
    }
    if (Math.abs(value) > 1) {
      console.error("setCell() - Invalid value parameter: ", value);
      return false;
    }
    // Must be a single place of the program where cells value is changed!
    let array = [...this.state.cells];
    array[index] = value;
    this.setState({ cells: array });
    console.log("setCell(%s, %s) sucessful", index, value);
    return true;
  };
  //--------------------------------------------------------------------------
  // Getter/Setter for array of line summaries
  getSums = () => {
    console.log("getSums");
    return this.state.sums;
  };

  //--------------------------------------------------------------------------
  // Getter/Setter for array of "winning" cells
  getWinCells = () => this.state.winCells;
  setWinCells = value => {
    if (!Array.isArray(value)) {
      console.error("setWinCells() - Invalid value parameter: ", value);
      return false;
    }
    let array = [...value];
    this.setState({ winCells: array });
  };

  //==========================================================================
  // Events and Handlers
  //==========================================================================

  cellClickHandler = index => {
    let turn = game.getTurn();
    game.setCell(index, turn);

    let cells = [...game.getCells()];
    //cells[index] = turn;
    this.setState({ cells: cells });

    game.onTurnComplete(turn);
  };

  //==========================================================================
  // React and Rendering
  //==========================================================================

  render() {
    return (
      <div className="Game">
        <Board
          gameState={game.getGameState()}
          winner={game.getWinner()}
          turn={game.getTurn()}
          cells={game.getCells()}
          winCells={game.getWinCells()}
          onCellClick={this.cellClickHandler}
        />
      </div>
    );
  }
}

/*==============================================================================
==============================================================================*/

export default Game;
