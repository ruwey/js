function init() {
    time = 7;
    timeDisplay = document.getElementById("time");
    guesses = [];
    guessesDisplay = document.getElementById("guessList");
    code = genCode();
    currentGuess = "";
    currentGuessDisplay = document.getElementById("currentGuess");
    console.log("Code: ", code);

}

function genCode() {
    let code = "";
    for (let i = 0; i < 3; i++) {
	code += Math.floor(Math.random() * 3.0 + 1);
    }
    return code;
}

function enterKey(key) {
    currentGuess += key;

    if (currentGuess.length == 3)
	 tryCode(currentGuess);

    display();
}

function clearKeypad() {
    currentGuess = "";

    display();
}

function tryCode(testCode) {
    time--;
    if (time == 0) {
	resetGame();
	guesses.splice(0, 0, "LOSS");
	currentGuess = "";
	return;
    }

    let relation;
    if (code > testCode)
	relation =  -1;
    else if (code < testCode)
	relation = 1;
    else {
	relation = 0;
	// Reset on Correct
	resetGame();
    }

    guesses.splice(0, 0, [testCode, relation]);
    currentGuess = "";
}

function resetGame() {
    code = genCode();
    time = 7;
}

function display() {
    timeDisplay.innerHTML = time;
    currentGuessDisplay.innerHTML = currentGuess;

    let guessList = "";
    for (entry of guesses) {
	if (entry == "LOSS")
	    guessList += "You Lost!! New Game Begins";
	else
	    guessList += "Tried " + entry[0] + " which is " +
	        (entry[1] == 0 ? "a success!" :
		 entry[1] == 1 ? "too large" : "too small");
	guessList += "<br/>";
    }

    guessesDisplay.innerHTML = guessList;
}
