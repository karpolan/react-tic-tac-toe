import React, { Component } from "react";
import * as game from "../../game/"; // "Tic Tac Toe Game on JavaScript" by KARPOLAN
import Board from "../../components/Board/Board";
import "./Game.css";

const classByGameState = ["gameNo", "gamePvp", "gamePve", "gameDemo"];
const classByWinner = ["winnerO", "winnerNo", "winnerX"];

/*
Tic Tac Toe game container.
Uses "Tic Tac Toe Game on JavaScript" by KARPOLAN as the Game Engine.
*/
class Game extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      inGame: false,
      nextTurnBy: 0,  // for indicator: Next turn by player: -1 or 1
      prevWinner: 0,  // for indicator: Winner of previous game: -1 or 1, 0 means Draw.
      waitingForTurn: false, // Clicks are ignored if "true" while waiting for AI turn(s). 
    };
    game.setOnTurnCallback(this.onTurn);
    game.setOnGameStopCallback(this.onGameStop)
  } // constructor

  componentDidMount() {
    this.doStartGame();
  }

  doStartGame() {
    game.gameStart(
      2, // 1: player VS player, 2: player VS computer, 3: game is running in demo mode
      1, // First turn by 1: X, -1: O
      5  // AI intelect level: 1..5 
    );
    const flag = (game.getGameState() !== 0)
    this.setState({inGame: flag});
  }

  onTurn = () => {
    const turn = game.getTurn();
    this.setState({nextTurnBy: turn})
  
//    console.log('onTurn() - nextTurnBy: %s', turn);
  }

  onGameStop = () => {
    const flag = game.getGameState() !== 0;
    const winner = game.getWinner();
    this.setState({inGame: flag, prevWinner: winner})
 
//    console.log('onGameStop() - inGame: %s, prevWinner: %s', flag, winner);
  }

  cellClickHandler = index => {
    if (this.state.waitingForTurn) return; // Clicks are disbaled now

    let turn = game.getTurn();
    game.setCell(index, turn);
    game.onTurnComplete(turn);
  };

  performAutoTurnDelayed = (delay) => {
    this.setState({waitingForTurn: true});
    setTimeout(() => {
      game.turnByIntelect(); 
      this.setState({waitingForTurn: false});
    }, delay);
  }

  render() {
    let classGame = "Game" +
    " " + classByGameState[game.getGameState()] +
    " " + classByWinner[game.getWinner() + 1]; // +1 because [-1, 0, +1];

    const gameState = game.getGameState();
    const clicksEnabled = !this.state.waitingForTurn && (gameState === 1 || gameState === 2)
    const winVisible = gameState === 0 && game.getWinner() !== 0;

    return (
      <div className={classGame}>
        <Board
          turn={game.getTurn()}
          cells={game.getCells()}
          clicksEnabled={clicksEnabled}
          onCellClick={this.cellClickHandler}
          winVisible={winVisible}
          winCells={game.getWinCells()}
        />
      </div>
    );
  }
}

export default Game;
