let numGuess=0;
let number = Math.floor(Math.random()*100)+1;

//Draw inputs from these elements
const guessField = document.getElementById("guess");
const submitor = document.getElementById("submit");
//Modify these elements
const guesses = document.querySelector(".guessRecord");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
let resetButton;
let mask;

function devToolsTest(){
    alert("The test works!");
    console.log(`Cheater mode: The answer is ${number}`);
}

function handleGuess(){
    numGuess++;
    const userG = (Number)(guessField.value);
    console.log(`User Guess: ${userG}\n`);
    if(numGuess>=10){
        lastResult.textContent="Sorry, you ran out of guesses";
        lowOrHi.textContent="";
    }else{
        if(numGuess===1){
        guesses.textContent="Previous Guesses: ";
        }
        console.log(`User has guessed ${numGuess} times`);
        guesses.textContent=`${guesses.textContent} ${userG}`;
        if(userG===number){
            lastResult.textContent="Congratulations, you won! The number was "+ number;
            lastResult.style.backgroundColor = "gold";
            const celebration = document.createElement("img");
            celebration.src = "Resources/confetti.png";
            lowOrHi.appendChild(celebration);
            celebration.style.left="45%";
            setGameOver();
        }else if(userG>number){
            lastResult.textContent="Incorrect! You have " +(10-numGuess)+" guesses left";
            lowOrHi.textContent="Your guess is high";
            lowOrHi.style.backgroundColor="green";
            guessField.value="";
            guessField.focus();

        }else{
            lastResult.textContent="Incorrect! You have " +(10-numGuess)+" guesses left";
            lowOrHi.textContent="Your guess is low";
            lowOrHi.style.backgroundColor="red";
            guessField.value="";
            guessField.focus();
        }
    }
}
function setGameOver(){
    guessField.disabled=false;
    submitor.disabled=false;
    resetButton = document.createElement("button");
    mask = document.createElement("div");
    document.body.appendChild(mask);
    mask.style.position="absolute";
    mask.style.left="0px";
    mask.style.top="0px";
    mask.style.width="100%";
    mask.style.height="100%";
    mask.style.backgroundColor="rgb(0, 0, 0, 0.2)";
    mask.appendChild(resetButton);
    resetButton.textContent="Reset Game";
    resetButton.addEventListener("click", reset);
}

function reset(){
    const outputs = document.querySelector(".outputPara");
    for (const out in outputs){
        out.textContent="";
    }
    numGuess=0;
    number = Math.floor(Math.random()*100)+1;

    guessField.disabled=false;
    submitor.disabled=false;
    lowOrHi.style.backgroundColor="White";
    resetButton.parentNode.removeChild(resetButton);
    mask.parentNode.removeChild(mask);
    celebration.parentNode.removeChild(celebration);
}

submitor.addEventListener("click", handleGuess);