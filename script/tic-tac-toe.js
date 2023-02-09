const statusDisplay = document.querySelector('.status');
const scoreDisplay = document.querySelector('.score');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let availableMoves = [0,1,2,3,4,5,6,7,8]
let computerScore = 0;
let playerScore = 0;


const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's the ${displayPlayer = currentPlayer === "X" ? "Computer" : " Player"}'s turn`;
const score = () => `Computer: ${computerScore} | Player: ${playerScore}`

statusDisplay.innerHTML = currentPlayerTurn();
scoreDisplay.innerHTML = score();
flipCoin()

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


function flipCoin(){
    
    coinFlip = Math.floor(Math.random()*2)
    console.log('Coinflip:',coinFlip)
    if(coinFlip === 1){currentPlayer = 'X'; console.log('Coinflip: Heads  |  Current Player: Computer')}
    else{currentPlayer = 'O'; console.log('Coinflip: Tails  |  Current Player: Player')}
    statusDisplay.innerHTML = currentPlayerTurn();
}

// stackoverflow Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function computerTurn(){
    cellChosen = availableMoves[ Math.floor(Math.random()*availableMoves.length)]
    // sleep a second to give the illusion of the a sophisticated ai making the highest chess elo decision, all to mask it randomly chosing numbers
    await sleep(1000)
    document.getElementById(cellChosen).click()
    console.log('Computer Number', cellChosen)
    
}



function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    
    availableMoves.splice(availableMoves.findIndex(object => {return object === clickedCellIndex}), 1)
    console.log('Player:', displayPlayer,' | Cell Chosen:', clickedCellIndex)
    
}

function handlePlayerChange() {
    // if current player is X, then set current player to O,
    // if current player is not X (meaning they are O, then set the current player to X)
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    if(currentPlayer === 'X'){computerTurn()}
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            if(currentPlayer === 'X'){computerScore=+1; break}
            else{playerScore =+1; break }
            
        }
    }
    
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        scoreDisplay.innerHTML = score();
        return;
    }
    
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return;
    }
    
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    availableMoves = [0,1,2,3,4,5,6,7,8]
    flipCoin()
    
    
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    
    
    
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);



while(currentPlayer === 'X'){computerTurn(); console.log('Working')}





