'use strict';

let currentScore0 = document.getElementById('current--0');
let currentScore1 = document.getElementById('current--1');
let scoreBoard0 = document.getElementById('score--0');
let scoreBoard1 = document.getElementById('score--1');
let dicePic = document.querySelector('.dice');
let btnRoll = document.querySelector('.btn--roll');
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let btnHold = document.querySelector('.btn--hold');
let btnRestart = document.querySelector('.btn--new');

let help = document.querySelector('.help');
let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let modalX = document.querySelector('.xbtn');

let scores, currentScore, activePlayer, playing;

function OpenCloseModal() {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}

function starting() {
  scores = [0, 0]; //its the scoreboards
  scoreBoard0.textContent = 0;
  scoreBoard1.textContent = 0;
  currentScore = 0;
  activePlayer = 0; //1st player is 0
  playing = true;

  dicePic.classList.add('hidden');

  playing = true;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}

starting();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

btnRoll.addEventListener('click', () => {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    dicePic.classList.remove('hidden');
    dicePic.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      dicePic.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnRestart.addEventListener('click', () => {
  starting();
});

help.addEventListener('click', () => {
  OpenCloseModal();
});

modalX.addEventListener('click', () => {
  OpenCloseModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    OpenCloseModal();
  }
});
