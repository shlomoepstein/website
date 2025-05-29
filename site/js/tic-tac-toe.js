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



function isWin(row, col) {
   if (board[row].every(i => i == player))
      return true;
   if (board.every(i => i[col] == player))
      return true;
   if (row - col == 0 && [0, 1, 2].every(i => board[i][i] == player))
      return true;
   if (row + col == 2 && [0, 1, 2].every(i => board[i][2 - i] == player))
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

   player = 'O';
   move = 1;

   for (e of document.querySelectorAll('.square'))
      e.innerText = '';
   document.getElementById('game-status').innerText = '';
   document.getElementById('new-game')
      .style.visibility = 'hidden';
   document.getElementById('board')
      .addEventListener('click', handleClick);
}

// disables double tap to zoom
// (not sure why 'touch-actions: none' is not enough)
function doNothing() {}
document.getElementById('board')
   .addEventListener('click', doNothing);
document.getElementById('game-status')
   .addEventListener('click', doNothing);
document.getElementById('output')
   .addEventListener('click', doNothing);

document.getElementById('new-game')
   .addEventListener('click', newGame);

newGame();
