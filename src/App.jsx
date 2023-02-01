import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bulma/css/bulma.min.css'
import './App.css'

function Square(props) {
  return (
    <button className="square button is-responsive" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row columns is-mobile is-centered">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row columns is-mobile is-centered">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row columns is-mobile is-centered">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Ir al movimiento ' + move :
        'Reiniciar el juego';
      return (
        <button className='movs button is-rounded is-small' onClick={() => this.jumpTo(move)}>{desc}</button>
      );
    });

    let status;
    if (winner) {
      status = 'GANADOR: ' + winner;
    } else {
      status = 'Proximo jugador: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <nav className='navbar level'>
          <p className='level-item has-text-centered'>
            <p className='ta'>Ta</p>
            <p className='te'>Te</p>
            <p className='ti'>Ti</p>
          </p>
        </nav>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <footer className='footer'>
          <div className='content has-text-centered'>
            <p>
              2023 © Herrera Franco - Tecnico en Programacion & Software developer
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

// ===============================================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App