const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const pvpBtn = document.getElementById('pvpBtn');
const pvcBtn = document.getElementById('pvcBtn');

let board;
let currentPlayer;
let gameMode;
let isGameActive;

const PLAYER_X = 'X';
const PLAYER_O = 'O';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = (mode) => {
    board = Array(9).fill(null);
    currentPlayer = PLAYER_X;
    isGameActive = true;
    gameMode = mode;
    statusDisplay.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
};

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');
    if (!isGameActive || board[index]) return;
    updateCell(index);
    if (checkWin()) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (checkDraw()) {
        statusDisplay.textContent = 'Draw!';
        isGameActive = false;
    } else {
        switchPlayer();
        if (gameMode === 'pvc' && currentPlayer === PLAYER_O) {
            setTimeout(computerMove, 500);
        }
    }
};

const updateCell = (index) => {
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    statusDisplay.textContent = `${currentPlayer}'s turn`;
};

const checkWin = () => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
};

const checkDraw = () => {
    return board.every(cell => cell !== null);
};

const computerMove = () => {
    let availableCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    let move = availableCells[Math.floor(Math.random() * availableCells.length)];
    updateCell(move);
    if (checkWin()) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (checkDraw()) {
        statusDisplay.textContent = 'Draw!';
        isGameActive = false;
    } else {
        switchPlayer();
    }
};

const resetGame = () => {
    startGame(gameMode);
};

pvpBtn.addEventListener('click', () => startGame('pvp'));
pvcBtn.addEventListener('click', () => startGame('pvc'));
resetBtn.addEventListener('click', resetGame);

startGame('pvp'); // Default game mode is Player vs Player
