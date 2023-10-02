let boardGame = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const board = document.querySelector("#board");
let message = document.querySelector("#message");
let resetBtn = document.querySelector("#reset-btn");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

message.textContent = `Now it's ${currentPlayer} turn`;

function createCells(e) {
  boardGame.forEach((element, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('square');
    cellElement.id = index;
    cellElement.addEventListener('click', makeMove);
    board.appendChild(cellElement);

  });
}
createCells();

function makeMove(e) {
  if (boardGame[e.target.id] === '' && gameActive) {
    boardGame[e.target.id] = currentPlayer;
    const move = document.createElement('div');
    move.classList.add(currentPlayer === 'X' ? 'cross' : 'circle');
    e.target.appendChild(move);
    //e.target.removeEventListener('click', makeMove);
    if (checkWinner()) {
      message.textContent = `${currentPlayer} Wins!`;
      gameActive = false;
    } else if (!boardGame.includes('')) {
      gameActive = false;
      message.textContent = `It's a draw!`;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Now it's ${currentPlayer} turn`;
    }
  }
}

function checkWinner() {
  for (let combination of winningCombinations) {
    let [a, b, c] = combination;
    if (
      boardGame[a] === currentPlayer &&
      boardGame[b] === currentPlayer &&
      boardGame[c] === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function reset(){
    boardGame = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.textContent = '';
        square.firstChild?.remove();
    });
}

resetBtn.addEventListener("click",reset)