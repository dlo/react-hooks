// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react';

import { List } from 'immutable';

type Player = 'X' | 'O';

const resetSquare = () => {
  return null;
};

Storage.prototype.setObject = function (key: string, value: unknown) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key: string) {
  const value = this.getItem(key);
  if (!value) {
    return null;
  }

  return JSON.parse(value);
};

declare global {
  /* eslint-disable no-unused-vars */
  interface Storage {
    setObject: (key: string, value: unknown) => void;
    getObject: (key: string) => unknown;
  }
  /* eslint-enable no-unused-vars */
}

const isArray = <T,>(value: unknown): value is Array<T> => {
  return Array.isArray(value);
};

const Board = () => {
  // 🐨 squares is the state for this component. Add useState for squares
  const [squares, setSquares] = React.useState<List<Player | null>>(
    () => {
      const rawArray = localStorage.getObject('squares');
      if (!isArray<Player | null>(rawArray)) {
        return List(Array(9).fill(null)) as List<Player | null>;
      }

      rawArray.length = 9;
      rawArray.fill(null, rawArray.length, 9);

      return List(rawArray) as List<Player | null>;
    },
  );

  React.useEffect(() => {
    localStorage.setObject('squares', squares);
  }, [squares]);

  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  // eslint-disable-next-line no-unused-vars
  const selectSquare = (square: number) => {
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    if (winner) {
      return;
    }

    if (squares.get(square)) {
      return;
    }

    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    //
    // 🐨 make a copy of the squares array
    // 💰 `[...squares]` will do it!)
    //
    // 🐨 set the value of the square that was selected
    // 💰 `squaresCopy[square] = nextValue`
    // 🐨 set the squares to your copy
    setSquares(squares.set(square, nextValue));
  };

  const restart = () => {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setSquares(squares.map(resetSquare));
    // setWinner(null);
    // setStatus(calculateStatus(winner, squares, nextValue));
    // setNextValue('X');
  };

  const renderSquare = (i: number) => (
    <button className='square' onClick={() => selectSquare(i)}>
      {squares.get(i)}
    </button>
  );

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className='restart' onClick={restart}>
        restart
      </button>
    </div>
  );
};

const Game = () => (
  <div className='game'>
    <div className='game-board'>
      <Board />
    </div>
  </div>
);

const calculateStatus = (
  winner: Player | null,
  squares: List<Player | null>,
  nextValue: Player,
) => {
  console.log(squares);
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
};

const calculateNextValue = (squares: List<Player | null>): Player => {
  return squares.filter(Boolean).size % 2 == 0 ? 'X' : 'O';
};

// eslint-disable-next-line no-unused-vars
const calculateWinner = (
  squares: List<Player | null>,
): Player | null => {
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

  for (const [a, b, c] of lines) {
    const entry = squares.get(a);
    if (
      entry &&
      squares.get(a) === squares.get(b) &&
      squares.get(a) === squares.get(c)
    ) {
      return entry;
    }
  }

  return null;
};

function App() {
  return <Game />;
}

export default App;
