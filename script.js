'use strict';


// variable intialisation.
let secretNumber = Math.trunc((Math.random() * 20)) + 1;
let score = 20;
let highScore = 0;
const localhighScore = localStorage.getItem('highScore');

function displayMessage(message) {
    document.querySelector('.message').textContent = message;
}

// if localstorage highscore has higher value than display it on the screen.
if (localhighScore) {
    highScore = Number(localhighScore);
    document.querySelector('.highscore').textContent = `🥇 Highscore: ${highScore}`;
}

// when click on check button.
document.querySelector('.check').addEventListener('click', function () {
    const inpNum = Number(document.querySelector('.guess').value);
    if (!inpNum || (inpNum<1 || inpNum>20) ) {
        displayMessage('🚫 No valid quess');              
    }
    else if (secretNumber === inpNum) {
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('.number').style.width = '30rem';
        displayMessage('✔️ Correct guess');        
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.check').disabled = true;
        if (highScore < score) {
            document.querySelector('.highscore').textContent = `🥇 Highscore: ${score}`;
            localStorage.setItem('highScore', score);
            highScore = score;
        }
    }
    else {
        score--
        if (score) {
            document.querySelector('.score').textContent = `💯 Score: ${score}`;
            displayMessage(
            inpNum > secretNumber ? '📈 Too high!' : '📉 Too low!');
        }
        else {
            displayMessage('👎 You lost the game!');
            document.querySelector('.score').textContent = `💯 Score: 0`;
            document.querySelector('.check').disabled = true;
        }
    }
});

// when click on again button
document.querySelector('.again').addEventListener('click', function() {
    displayMessage('Start Guessing...');
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.score').textContent = `💯 Score: 20`;
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.check').disabled = false;
    document.querySelector('.guess').value = '';
    secretNumber = Math.trunc((Math.random() * 20)) + 1;
    score = 20;    
});