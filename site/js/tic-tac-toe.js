/*
let log = (() => {
   let output = document.getElementById('output');

   let logFunction = message =>
      output.innerText = message;

   logFunction.append = message =>
      output.innerText = `${output.innerText ? `${output.innerText}\n` : ''}${message}`;

   logFunction.clear = () =>
      output.innerText = '';

   return logFunction;
})();

document.getElementById('button1')
   .addEventListener('click', () =>
      log('testing...'));

document.getElementById('button2')
   .addEventListener('click', () =>
      log.append('testing append...'));

document.getElementById('button3')
   .addEventListener('click', () =>
      log.clear());

let stylesheet = document.styleSheets[0];

document.getElementById('borders-toggle')
   .addEventListener('change', (event) =>
      event.target.checked
         ? stylesheet.insertRule('* {border: 1px solid red;}', 0)
         : stylesheet.deleteRule(0));
*/


/*
function isWin(row, col) {
   if (board[row].every(i => i == player))
      return true;
   if (board.every(i => i[col] == player))
      return true;
   if (row - col == 0
         && [0, 1, 2].every(i => board[i][i] == player))
      return true;
   if (row + col == 2
         && [0, 1, 2].every(i => board[i][2 - i] == player))
      return true;
   return false;
}

function handleClick(event) {
   row = Number(event.target.dataset.row);
   col = Number(event.target.dataset.col);

   if (!board[row][col]) {
      board[row][col] = player;
      event.target.innerText = player;
      if (isWin(row, col))
         gameOver(player);
      else if (move == 9)
         gameOver();
      player = player == 'O' ? 'X' : 'O';
      move++;
   }
}

function gameOver(player) {
   document.getElementById('game-status')
      .innerText = player
                      ? `${player} wins!`
                      : 'Nobody wins 😐';

   document.getElementById('new-game')
      .style.visibility = 'visible';
   document.getElementById('board')
      .removeEventListener('click', handleClick);
}

let board, player, move;

function newGame() {
   board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']];

   player = 'X';
   move = 1;

   for (e of document.querySelectorAll('.square'))
      e.innerText = '';
   document.getElementById('game-status').innerText = '';
   document.getElementById('new-game')
      .style.visibility = 'hidden';
   document.getElementById('board')
      .addEventListener('click', handleClick);
}

document.getElementById('new-game')
   .addEventListener('click', newGame);

newGame();
*/




// disables double tap to zoom
// (not sure why 'touch-actions: none' is not enough)
document.getElementById('game-chrome-bottom')
   .addEventListener('click', () => {});






// big mvc refactor yay

// cached DOM nodes

const squareList = [...document.querySelectorAll('.square')];
const gameStatus = document.getElementById('game-status');
const newGameButton = document.getElementById('new-game-button');
const board = document.getElementById('board');

const squares = Array.from(Array(3), () => Array(3));

for (const square of squareList)
   squares[square.dataset.row][square.dataset.col] = square;


// view

const resetGame = () => {
   for (const square of squareList)
      square.textContent = '';

   gameStatus.textContent = '';
   newGameButton.style.visibility = 'hidden';
};


const drawSquare = ({row, col, value}) =>
   squares[row][col].textContent = value;


const endGame = ({message}) => {
   gameStatus.textContent = message;
   newGameButton.style.visibility = 'visible';
};


const noop = () => {};


const updates = {
   'ui/reset_game': resetGame,
   'ui/draw_square': drawSquare,
   'ui/end_game': endGame
};


const render = update =>
   (updates[update.type] ?? noop)(update);


// model

const isWin = (board, player, row, col) => {
   if (board[row].every(i => i === player))
      return true;
   if (board.every(i => i[col] === player))
      return true;
   if (row - col === 0
         && [0, 1, 2].every(i => board[i][i] === player))
      return true;
   if (row + col === 2
         && [0, 1, 2].every(i => board[i][2 - i] === player))
      return true;
   return false;
};


const boardClick = (state, action) => {
   const {board, player, winner} = state;
   const {row, col} = action;

   if (board[row][col] !== null
         || winner !== null)
      return state;

   const nextBoard =
      board.map((boardRow, i) =>
         i === row
            ? boardRow.map((cell, j) =>
               j === col
                  ? player
                  : cell)
            : boardRow);

   const nextPlayer =
      player === 'X'
         ? 'O'
         : 'X';

   const nextWinner =
      isWin(nextBoard, player, row, col)
         ? player
      : nextBoard.every(row => row.every(cell => cell !== null))
         ? 'draw'
      : null;

   return {
      board: nextBoard,
      player: nextPlayer,
      winner: nextWinner
   };
};


const newGame = (_state, _action) => ({
   board: Array.from(Array(3), () => Array(3).fill(null)),
   player: 'X',
   winner: null
});


const defaultReducer = (state, _action) =>
   state;


const reducers = {
   'app/board_click': boardClick,
   'app/new_game': newGame
};

const reduce = (state, action) =>
   (reducers[action.type] ?? defaultReducer)(state, action);


// controller

const getUpdates = (prevState, state, action) => {
   const {board: prevBoard} = prevState ?? {};
   const {board, winner} = state;

   const updates = [];

   if (prevState === state)
      return updates;

   if (action.type === 'app/new_game') {
      updates.push({
         type: 'ui/reset_game'
      });

      return updates;
   }

   let row = 0;
   let col = 0;

   while (prevBoard[row] === board[row])
      row++;

   while (prevBoard[row][col] === board[row][col])
      col++;

   updates.push({
      type: 'ui/draw_square',
      row,
      col,
      value: board[row][col]
   });

   if (winner !== null) {
      const message =
         winner === 'draw'
            ? 'It’s a draw.'
            : `${winner} wins!`;

      updates.push({
         type: 'ui/end_game',
         message
      });
   }

   return updates;
};

const dispatch = (() => {
   let state = null;

   return action => {
      const prevState = state;
      state = reduce(state, action);

      for (const update of getUpdates(prevState, state, action))
         render(update);
   };
})();


// initialization and event handlers

dispatch({
   type: 'app/new_game'
});


board.addEventListener('click', event =>
   dispatch({
      type: 'app/board_click',
      row: Number(event.target.dataset.row),
      col: Number(event.target.dataset.col)
   }));


newGameButton.addEventListener('click', () =>
   dispatch({
      type: 'app/new_game'
   }));
