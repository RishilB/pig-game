'use strict';

/* ----------------------------------------- Initialize all Elements STARTS ----------------------------------------- */

// Selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const curr0El = document.getElementById('current--0');
const curr1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// How to Play Modal Elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.btn--how');

// New Game Modal Elements
const newGameModal = document.querySelector('.init--modal');
const btnCloseNewGameModal = document.querySelector('.close-init-modal');
const btnSinglePlayerStart = document.querySelector('.btn-pig-bot-1');
const btnDoublePlayerStart = document.querySelector('.btn-pig-bot-2');
const inputPlayer1 = document.getElementById('player-1-name');
const inputPlayer2 = document.getElementById('player-2-name');
const overlayNewGame = document.querySelector('.overlay-newgame');
let pigBot = false;

/* ----------------------------------------- Initialize all Elements ENDS ----------------------------------------- */

/* ----------------------------------------- New Game Functions STARTS ----------------------------------------- */

// Open New Game Modal function
const openNewGameModal = function () {
  newGameModal.classList.remove('hidden');
  overlayNewGame.classList.remove('hidden');
};

// Close New Game Modal function
const closeNewGameModal = function () {
  newGameModal.classList.add('hidden');
  overlayNewGame.classList.add('hidden');
};

// Player 1 Input Box Border Color
const inputPlayer1Border = function (borderColor) {
  inputPlayer1.style.border = borderColor;
};

// Player 2 Input Box Border Color
const inputPlayer2Border = function (borderColor) {
  inputPlayer2.style.border = borderColor;
};

// Open New Game Modal on Page Refresh
openNewGameModal();

// Click on New Game Button
btnNew.addEventListener('click', function () {
  // Open New Game Modal when clicking on "New Game" Button
  openNewGameModal();
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  curr0El.textContent = 0;
  curr1El.textContent = 0;
  activePlayer = 0;
  playing = true;
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  inputPlayer1Border('0px');
  inputPlayer2Border('0px');
  diceEl.classList.add('hidden');
  currentScore = 0;
});

// New Game with Dual Player Start
btnDoublePlayerStart.addEventListener('click', function () {
  pigBot = false;
  if (inputPlayer1.value.length > 0 && inputPlayer2.value.length > 0) {
    document.getElementById('name--0').textContent = inputPlayer1.value;
    document.getElementById('name--1').textContent = inputPlayer2.value;
    closeNewGameModal();
  } else {
    if (inputPlayer1.value.length === 0 && inputPlayer2.value.length === 0) {
      inputPlayer1Border('2px solid #CD5C5C');
      inputPlayer2Border('2px solid #CD5C5C');
    } else if (inputPlayer1.value.length === 0) {
      inputPlayer1Border('2px solid #CD5C5C');
      inputPlayer2Border('0px');
    } else if (inputPlayer2.value.length === 0) {
      inputPlayer2Border('2px solid #CD5C5C');
      inputPlayer1Border('0px');
    }
  }
});

btnSinglePlayerStart.addEventListener('click', function () {
  pigBot = true;
  document.getElementById('name--0').textContent = 'Pig Bot';
  document.getElementById('name--1').textContent = 'You';
  closeNewGameModal();
  activePlayer = 1;
  player1.classList.add('player--active');
  player0.classList.remove('player--active');
});

/* ----------------------------------------- New Game Functions ENDS ----------------------------------------- */

/* ----------------------------------------- How To Play Functions STARTS ----------------------------------------- */

// Open How to Play Modal function
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Close How to Play Modal function
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Open How to Play Modal
btnOpenModal.addEventListener('click', openModal);

// Close How to Play Modal
btnCloseModal.addEventListener('click', closeModal);

// Click on Overlay to Close the Modal
overlay.addEventListener('click', closeModal);

// ESC Key to Close the Modal
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* ----------------------------------------- How To Play Functions ENDS ----------------------------------------- */

/* ----------------------------------------- Initialize Current Score + Total Score + Dice Value STARTS ----------------------------------------- */

let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Intialize Score as 0 and hide the Dice
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

/* ----------------------------------------- Initialize Current Score + Total Score + Dice Value ENDS ----------------------------------------- */

/* ----------------------------------------- Switch Player Function STARTS ----------------------------------------- */

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  if (pigBot === true && activePlayer === 0 && playing) {
    let curr = 0;
    let bot = Number(Math.trunc(Math.random() * 4) + 1);
    for (let i = 1; i <= bot; i++) {
      let autoDice = Number(Math.trunc(Math.random() * 6) + 1);
      if (autoDice !== 1) {
        curr = curr + autoDice;
      } else {
        curr = 0;
        break;
      }
    }
    document.getElementById(`score--0`).textContent =
      Number(document.getElementById(`score--0`).textContent) + curr;
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
    activePlayer = 1;
    if (document.getElementById(`score--0`).textContent >= 20) {
      playing = false;
      btnHold.classList.add('hidden');
      btnRoll.classList.add('hidden');
      document.querySelector(`.player--0`).classList.add('player--winner');
      document.querySelector(`.player--0`).classList.remove('player--active');
      diceEl.classList.add('hidden');
    }
  }
};

/* ----------------------------------------- Switch Player Function ENDS ----------------------------------------- */

/* ----------------------------------------- Roll Dice Click Event STARTS ----------------------------------------- */

btnRoll.addEventListener('click', function () {
  if (playing) {
    if (pigBot === false) {
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
    } else if (pigBot === true && activePlayer === 1) {
      // 1. Generating a Random Dice Roll
      let dice = Number(Math.trunc(Math.random() * 6) + 1);

      // 2.Display the Dice
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;

      // 3. Check for rolled 1: if true, make current score 0 and switch to next player
      if (dice !== 1) {
        // Add Dice to current Score
        currentScore += dice;
        document.getElementById(`current--1`).textContent = currentScore;
      } else {
        switchPlayer();
      }
    }
  }
});

/* ----------------------------------------- Roll Dice Click Event ENDS ----------------------------------------- */

// Click on Hold Button
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

// let curr = 0;
// let bot = Number(Math.trunc(Math.random() * 4) + 1);
// console.log(`Bot Value is ${bot}`);
// for (let i = 1; i <= bot; i++) {
//   let ice = Number(Math.trunc(Math.random() * 6) + 1);
//   if (ice !== 1) {
//     console.log(`Dice Value is ${ice}.`);
//     curr = curr + ice;
//     console.log(`Current Value is ${curr}.`);
//   } else {
//     console.log(`Dice Value is ${ice}.`);
//     curr = 0;
//     console.log(`Current Value is ${curr}.`);
//     break;
//   }
// }
