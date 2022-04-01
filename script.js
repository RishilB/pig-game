'use strict';

// Selecting Elements
//const totalScore = document.getElementById(`score--${activePlayer}`);
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
//const currScore0EL = document.getElementById('current--0');
//const currScore1EL = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Intialize Score as 0 and hide the Dice
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a Random Dice Roll
    let dice = Number(Math.trunc(Math.random() * 6) + 1);

    // 2.Display the Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, make current score 0 and switch to next player
    if (dice !== 1) {
      // Add Dice to current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Add current Score to Total Score
btnHold.addEventListener('click', function () {
  if (playing) {
    document.getElementById(`score--${activePlayer}`).textContent =
      Number(document.getElementById(`score--${activePlayer}`).textContent) +
      currentScore;

    if (document.getElementById(`score--${activePlayer}`).textContent >= 20) {
      playing = false;
      btnHold.classList.add('hidden');
      btnRoll.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }
    switchPlayer();
  }
});
