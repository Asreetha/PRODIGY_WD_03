const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartBtn = document.querySelector('#restart');
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute('data-index');

  if (gameState[cellIndex] !== "" || !isGameActive()) {
    return;
  }

  updateCell(cell, cellIndex);
  checkWin();
}

function updateCell(cell, index) {
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  if (!checkWin()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('next-player').textContent = currentPlayer;
  }
}

function checkWin() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    setGameInactive();
    return true;
  } else if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    setGameInactive();
    return true;
  }
  return false;
}

function setGameInactive() {
  cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function isGameActive() {
  return gameState.includes("");
}

function restartGame() {
  currentPlayer = 'X';
  gameState = ["", "", "", "", "", "", "", "", ""];
  document.getElementById('next-player').textContent = currentPlayer;
  statusText.textContent = 'Next player: X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleCellClick);
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

// Initial setup
restartGame();
