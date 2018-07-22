/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'), 
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again even listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess 
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // check if won
  // GAME OVER WON
  if(guess === winningNum){
    // Game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);

  } else {
    // wrong number
    guessesLeft -= 1

    if(guessesLeft === 0) {
    // GAME OVER LOST

    gameOver(false, `GAME OVER!!! You Lost. The correct number was ${winningNum}`);
    
    } else {
      // GAME CONTINUES - ANSWER WRONG

      // change border color
      guessInput.style.borderColor = 'red';

      // Clear input field
      guessInput.value = '';

      // Tell user its the wrong number and update guesses left
      setMessage(`${guess} is not corret, ${guessesLeft} guesses left`, 'red')
      
    }
  }
});

// GAME OVER 
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // set text color
  message.style.color = color;
  // set message for winning number
  setMessage(msg);

  // PLAY AGAIN
  guessBtn.value = 'Play Again'
  guessBtn.className += 'play-again'
}

// Get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

