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

// render

const squaresList = [...document.querySelectorAll('.square')];
const gameStatus = document.getElementById('game-status');
const newGameButton = document.getElementById('new-game-button');


const render = ({board, winner}) => {
   for (const square of squaresList)
      square.textContent =
         board[square.dataset.row][square.dataset.col]
            ?? '';

   gameStatus.textContent =
      winner === 'draw'
         ? 'It’s a draw'
      : winner !== null
         ? `${winner} wins!`
      : '';

   newGameButton.style.visibility =
      winner === null
         ? 'hidden'
         : 'visible';
};


// reducer helpers

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


const applyBoardClick = (state, {row, col}) => {
   const {board, currentPlayer, winner} = state;

   if (board[row][col] !== null
         || winner !== null)
      return state;

   const nextBoard =
      board.map((boardRow, i) =>
         i === row
            ? boardRow.map((cell, j) =>
               j === col
                  ? currentPlayer
                  : cell)
            : boardRow);

   const nextWinner =
      isWin(nextBoard, currentPlayer, row, col)
         ? currentPlayer
      : nextBoard.every(row => row.every(cell => cell !== null))
         ? 'draw'
      : null;

   return {
      board: nextBoard,
      currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
      winner: nextWinner
   };
};


const initialState = {
   board: Array.from(Array(3), () => Array(3).fill(null)),
   currentPlayer: 'X',
   winner: null
};


const startNewGame = () => ({
   ...initialState
});


// main reducer

const reduce = (state, action) =>
   action.type === 'BOARD_CLICK'
      ? applyBoardClick(state, action)
   : action.type === 'NEW_GAME'
      ? startNewGame()
   : state;


// controller

const dispatch = (() => {
   let state = null;

   return action => {
      state = reduce(state, action);
      render(state);
   };
})();


// initialize before registering event handlers

dispatch({type: 'NEW_GAME'});


// event listeners/event handlers

document.getElementById('board')
   .addEventListener('click', event =>
      dispatch({
         type: 'BOARD_CLICK',
         row: Number(event.target.dataset.row),
         col: Number(event.target.dataset.col)
      }));


document.getElementById('new-game-button')
   .addEventListener('click', () =>
      dispatch({type: 'NEW_GAME'}));
