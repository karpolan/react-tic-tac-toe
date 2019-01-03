import React, { Component } from "react";
import "./App.css";
import Game from "./containers/Game/Game";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Tic Tac Toe game on React JS</h1>
        </header>
        <Game />
        <footer>
          <p>
            Source codes are available on GitHub:{" "}
            <a
              rel="author noopener noreferrer"
              target="_blank"
              href="https://github.com/karpolan/react-tic-tac-toe"
            >
              React JS demo - Tic Tac Toe game
            </a>
          </p>
          <p>
            Copyright &copy;{" "}
            <a
              rel="author noopener noreferrer"
              target="_blank"
              href="https://karpolan.com"
            >
              KARPOLAN
            </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
