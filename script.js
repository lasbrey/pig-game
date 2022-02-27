var scores, roundScore, activePlayer, gamePlaying;
var lastScore;

init();

//roll btn
document.querySelector('.btn--roll').addEventListener('click', function(){
    if (gamePlaying){
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceTwo = Math.floor(Math.random() * 6) + 1;

    var diceDOM = document.querySelector('.dice');
    var diceDOM2 = document.querySelector('.dice2');

    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + diceTwo + '.png';

    // Store detail of the lastdice roll
    lastScore = dice;

    if (lastScore === 6 && dice === 6 && diceTwo === 6){
        roundScore = 0;
        nextPlayer();
    } else if (dice !== 1){
        //Add score
        roundScore += dice + diceTwo;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
    } else {
        // Next player
        nextPlayer();
    }
}

});

//btn hold
document.querySelector('.btn--hold').addEventListener('click', function(){
    if (gamePlaying){
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update the ui
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

    //Find value of input
    var finalInput = document.querySelector('.final-answer').value;
    var winScore;

    if (finalInput){
        winScore = finalInput;
    } 
    else {
        winScore = 100;
    }

    //player win
    if (scores[activePlayer] >= winScore) {
        document.querySelector('#name--' + activePlayer).textContent = 'Winner';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        document.querySelector('.player--' + activePlayer).classList.add('player--winner');
        document.querySelector('.player--' + activePlayer).classList.remove('player--active');
        gamePlaying = false;
    }
    else{
        //Next player
        nextPlayer();
    }
    
}
});

// Next player
function nextPlayer(){
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
    // alert('you rolled a 1 so all your current points get deleted ');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
};

//btn new
document.querySelector('.btn--new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0; 
    gamePlaying = true;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('score--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
};








