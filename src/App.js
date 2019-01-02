import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './containers/Game/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Tic Tac Toe game on React JS</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
