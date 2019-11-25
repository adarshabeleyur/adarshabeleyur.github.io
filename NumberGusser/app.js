// Game values
let min = 0,
  max = 10,
  winningNumber = getRandomNum(min, max),
  guessesLeft = 3;

console.log(winningNumber);

// UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  // minInput = document.querySelector('#min-input'),
  // maxInput = document.querySelector('#max-input'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assign UI min and max
// function keyUpValue(el, param1) {
//   el.addEventListener('keyup', function() {
//     param1 = this.value;
//     // console.log(param1);
//   });
// }

// keyUpValue(minInput, min);
// // minInput.addEventListener('keyup', function() {
// //   min = this.value;
// //   console.log(min);
// // });
// maxInput.addEventListener('keyup', function() {
//   // console.log(this.value);
//   max = this.value;
// });

// min = minInput.value;
// max = maxInput.value;

minNum.textContent = min;
maxNum.textContent = max;

// console.log(min);
// console.log(max);

// Play again event listner
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // Validate
  // if (minInput.value === '' || minInput.value === '-1') {
  //   setMessage(`Please enter a minimum number`, 'red');
  // } else if (maxInput.value === '' || maxInput.value === '-1') {
  //   setMessage(`Please enter a maximum number`, 'red');
  // } else if (isNaN(guess) || guess < min || guess > max) {
  //   setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  // }

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNumber) {
    // Game over - Won
    gameOver(true, `${winningNumber} is correct, YOU WIN!`);
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - Lost
      gameOver(
        false,
        `Game over, YOU LOST, The correct number is ${winningNumber}`
      );
    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear the input
      guessInput.value = '';

      // Tel user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

// game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  // Disble input
  guessInput.disabled = true;

  // Change border color
  guessInput.style.borderColor = color;

  // Set message
  setMessage(msg, color);

  // Play again?
  guessBtn.value = 'Play Again ?';
  guessBtn.className += 'play-again';
}

// Get winnign number
function getRandomNum(min, max) {
  // console.log(Math.floor(Math.random() * (max - min + 1) + min));
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
