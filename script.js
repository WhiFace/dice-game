'use strict';

// initialize variables

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

let isPlaying = true;
 


const gameAudio = new Audio('reset.mp3');


 
if (typeof gameAudio.loop == 'boolean')
{
    gameAudio.loop = true;
}
else
{
    gameAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
gameAudio.play();



btnRoll.addEventListener('click', function(){

    if(isPlaying){
//create a random number
    const diceAudio = new Audio('dice-sound.mp3');
    diceAudio.play();

    const randomDice = Math.trunc(Math.random() * 6) + 1;

    //display the dice according to the random number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomDice}.png`;

    //check if the random num is equal to 1: then switch to next player
    if(randomDice !== 1) {
        currentScore += randomDice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;  
    } else {
        // switch to next player  
        switchPlayer();
    }
    }
    
});


btnHold.addEventListener('click', function(){
if(isPlaying){
//add current score to active

    let holdAudio = new Audio('holdPoints.mp3');
    holdAudio.play();

    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


//check if player score is >= 100 finish game 
if(scores[activePlayer] >= 100) {
    isPlaying = false;
    endGame();
} else {
    //switch if not 
    switchPlayer();
}

}  
    
});

btnNew.addEventListener('click', resetGame);

//functions:

function switchPlayer(){

    
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


function endGame(){
    let winner = new Audio('winner.mp3');
    winner.play();

    gameAudio.pause();
    document.getElementById(`name--${activePlayer}`).textContent = activePlayer === 0 ? 'Player 1 won!' : 'Player 2 won!';
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    diceEl.classList.add('hidden');
    
}

function resetGame(){
    gameAudio.play();
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;

    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';

    
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    player1El.classList.remove('player--winner');
    
    

    
}

