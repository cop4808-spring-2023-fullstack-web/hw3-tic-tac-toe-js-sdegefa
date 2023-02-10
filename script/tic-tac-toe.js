const statusDisplay = document.querySelector('.status');
const scoreDisplay = document.querySelector('.score');

let gameActive = 1;
let allowButtonPress = true; // Local variable that is used to toggle button presses (see handlecellclicked()) 
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let availableMoves = [0,1,2,3,4,5,6,7,8] // List of moves still possible which is picked from by the computer for each move
let computerScore = 0; // used to keep track of  the series score until the instance is reset
let playerScore = 0;
let draws = 0;


const winningMessage = () => `${displayPlayer = currentPlayer === "O" ? "The Computer Has" : " You Have"} Won!`;        // displayPlayer uses an if else operator to check against the current player
const drawMessage = () => `Game ended in a draw!`;                                                                   // if the player is O (the computer), then Computer will be displayed, 
const currentPlayerTurn = () => `It's  ${displayPlayer = currentPlayer === "O" ? "the Computer's" : " Your"} Turn`; // if the player is X (the human player), then you will be displayed
const score = () => `Computer: ${computerScore} | Draws: ${draws} | Player: ${playerScore}`

statusDisplay.innerHTML = currentPlayerTurn();
scoreDisplay.innerHTML = score();
flipCoin()  // "coinflip" function used to randomly decide who goes first

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
    // takes the floor of the a random number between 0 and 1, mulitplies it by 2 to give a result between either 1 or 2
    coinFlip = Math.floor(Math.random()*2)
    console.log('Coinflip:',coinFlip) // this number result is then printed in the console
    if(coinFlip === 1){currentPlayer = 'O'; console.log('Coinflip: Heads  |  Current Player: the Computer'); computerTurn()} // if the result is 1 (Heads) , the currentPlayer is set to O and the computer takes its turn
    else{currentPlayer = "X"; console.log('Coinflip: Tails  |  Current Player: You')}    // if the result is 0 (Tails), then the currentPlayer is set to X and awaits the player's input
    statusDisplay.innerHTML = currentPlayerTurn();
    
}

// stackoverflow Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function computerTurn(){
    allowButtonPress = 0; // disables button pressing, so the player can't move for the computer
    cellChosen = availableMoves[ Math.floor(Math.random()*availableMoves.length)]; // choses its next move by taking a random number between 0 and the total number of available moves 
                                                                                   // from the availableMoves Array, the result is a number which coincides with the added button ids 
                                                                                   // on the HTML doc.

    await sleep(1000);  // sleep a second to give the illusion of the a sophisticated ai making the highest chess elo decision, all to mask it randomly chosing numbers
    allowButtonPress = 1;                        // Reenables button press registration 
    document.querySelector(`[data-cell-index="${cellChosen}"]`).click()
    // document.getElementById(cellChosen).click(); // and clicks the button that contains the same id as the one that was decided from the array
    // console.log('Computers Chosen Number', cellChosen);  // This decision is then printed to the console  (mainly for debugging)
    
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    
    availableMoves.splice(availableMoves.findIndex(object => {return object === clickedCellIndex}), 1) // once a move has been made the player or computer, the index of the played 
                                                                                                       // cell (0-8) is found within the availableMoves Array and deleted using arr.splice 
    console.log('Player:', currentPlayer === "O" ? "the Computer" : "You",' | Cell Chosen:', clickedCellIndex)   // current player is is displayed alongside their chosen cell 
    
}

function handlePlayerChange() {
    // if current player is X, then set current player to O,
    // if current player is not X (meaning they are O, then set the current player to X)
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    if(currentPlayer === 'O'){computerTurn()} // if its the computer's turn once the the turn changes, then the computer takes its turn
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
            document.querySelector(`[data-cell-index="${winCondition[0]}"]`).style.backgroundColor='Green'; // sets the winning combination to green
            document.querySelector(`[data-cell-index="${winCondition[1]}"]`).style.backgroundColor='Green';
            document.querySelector(`[data-cell-index="${winCondition[2]}"]`).style.backgroundColor='Green';
            if(currentPlayer === 'O'){computerScore=+1; break}                      // adds a point to whoever won
            else{playerScore =+1; break }
            
        }
    }
    
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        console.log(currentPlayer === "O" ? "You really lost to what is essentially a newborn pointing at pretty colors " : "Congrats, you beat an electrified rock") // gives a heartwarming message in the console to track who is winning
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        scoreDisplay.innerHTML = score();
        return;
    }
    
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        draws=+1 // add one to the draw tally before the display is updated
        scoreDisplay.innerHTML = score();
        statusDisplay.innerHTML = drawMessage();
        console.log("Are you telling me you drew to a comp... I'm suprised you are able to dress yourself") // more heartwarming console messages for my own enjoyment
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return;
        
    }
    
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    if(allowButtonPress == 0){return;} // if allowButtonPress is false (0), then the function is exited, essentially voiding any button presses that occur during that period, 
    const clickedCell = clickedCellEvent.target;    // this is to make sure the player doesnt cheat and play for the computer
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    

    




    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    // console.log('ClickedCellEvent:', clickedCellEvent)           // more debugging to see what is being read, mainly to see if there is a different way to chose a cell
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame(newSeries) {
    // a bit convoluted, but just takes the boolean value passed from the eventlistener, checks if it is true, and if so updates the scoreboard to show 0 for all
    if(newSeries == true){computerScore = 0; playerScore = 0; draws = 0; scoreDisplay.innerHTML=score()}
    console.log(newSeries) // more debugging to make sure the correct value is passed
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    availableMoves = [0,1,2,3,4,5,6,7,8] // resets move array for computer
    flipCoin()
    
    
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor="rgb(41, 41, 41)"); // resets the color of all the cells
    
    
    
    
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', () => {handleRestartGame(true)});   // uses arrow functions to pass in a boolean value, which is used to track if the restart is
document.querySelector('.nextGame').addEventListener('click', () => {handleRestartGame(false)}); // meant to go to the next game, or next series








