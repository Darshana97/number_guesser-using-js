//game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');


//assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listner
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();

    }
    
});

//listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    

    //validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, `red`);

    }

    //check if won
    if(guess === winningNum){

        //game over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else{

        //wrong number
        guessesLeft  -= 1;

        if(guessesLeft === 0){

            //game over - lost
             gameOver(false, `Game over, you lost. The correct number was ${winningNum} `);

        } else {
            //game continues - answer wrong

            //change border color
            guessInput.style.borderColor = 'red';

            //set text color
            message.style.color = 'red';

            //clear input
            guessInput.value = '';

            //tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, `red`);
 

        }

    }

});

//game over
function gameOver(won, msg){

    let color;
    won === true ? color = 'green' : color = 'red';

     //disable input
     guessInput.disabled = true;

     //change border color
     guessInput.style.borderColor = color;

     //set test color
     message.style.color = color;

     //set message
     setMessage(msg);

     //play again
     guessBtn.value = 'Play Again';
     guessBtn.className += 'play-again';

}

//get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max-min+1)+min);

}



//set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}