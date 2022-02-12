// Array of words 
words = [
  "Playing",
    "Python",
    "HTML"
    
];

// set levels
const lvls = {
    "Easy":6,
    "Normal":3,
    "Hard":2
};
//Defualt level 
let defaultLevelName = "Normal";
let defualtLevelSeconds = lvls[defaultLevelName];


// Catch selectors

let startButton = document.querySelector(".start");
let lvlNamespan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");

let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector("input");

let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");

let finishMessage = document.querySelector(".finish");


lvlNamespan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defualtLevelSeconds;

timeLeftSpan.innerHTML = defualtLevelSeconds;
scoreTotal.innerHTML = words.length;

input.onpaste = function() {
    return false
}

startButton.onclick = function() {
    this.remove();
    input.focus();
    getWords();

}

function getWords(){
    // Get Random Word from Array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let getWordIndex = words.indexOf(randomWord);
    //Remove from Array
    words.splice(getWordIndex,1);
    //Show the random word
    theWord.innerHTML = randomWord;
    //Empty upcoming-words
    upcomingWords.innerHTML='';
    for(let i=0;i<words.length;i++){

        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    startPlay();

}

// set timeout
let startPlay = function(){

    timeLeftSpan.innerHTML = defualtLevelSeconds;
    let start = setInterval(() => {

        timeLeftSpan.innerHTML -= 1;
        if (timeLeftSpan.innerHTML === "0"){
            clearInterval(start);
            if(theWord.innerHTML.toLocaleLowerCase() === input.value.toLocaleLowerCase()) {
                // Clear input Field
                input.value = "";
                // increase score value
                scoreGot.innerHTML = "";
                scoreGot.innerHTML += 1;
                theWord.innerHTML = "";

                if (words.length > 0){
                    getWords();
                }else {
                    let span = document.createElement("span");
                    span.className = "good";
                    let txtgood = document.createTextNode("Congratz");
                    span.appendChild(txtgood);
                    finishMessage.appendChild(span);
                }
            }else {
                let span = document.createElement("span");
                span.className="game-over";
                let spanTxt = document.createTextNode("Game Over");
                span.appendChild(spanTxt);
                finishMessage.appendChild(span);
            
            }

            
        }
    },1000)

}
