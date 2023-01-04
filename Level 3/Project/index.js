
function init() {
    board = [];
    state = "init";
    moves = 0;
    blank = 0;

    // Bind UI elements
    boardDisplay = document.getElementById("board");
    movesUI = document.getElementById("moves");
    stateUI = document.getElementById("state");
}

function genBoard() {
    for (var i = 0; i < 16; i++) {
	board[i] = { value: i };
    }

    bindBoard();
}

function startGame() {
    if (state != "before")
	return;
    console.log("start");

    state = "playing";
    update();
};

function bindBoard() {
    let element;
    boardDisplay.innerHTML = "";
    for (const square in board) {
	element = document.createElement("div");
	board[square].element = element;
	element.onclick = () => {squareClick(square)};
	if (board[square].value == 0) {
	    element.id = "open";
	    blank = square;
	}
	else
	    element.appendChild(document.createTextNode(board[square].value));

	boardDisplay.appendChild(board[square].element);
    }
}

const WIDTH = 4;
const HEIGHT = 4;
const getAdg = (i) => ([
    Math.max(i-4, -1),
    (((i+4 + HEIGHT) % (WIDTH*HEIGHT + HEIGHT)) - HEIGHT),
    (i % 4 == 0 ? -1 : i-1),
    (i % 4 == 3 ? -1 : i + 1)]);

function squareClick(index) {
    if (state == "before")
	return;
	
    squareMove(index);
    moves++;
    if (checkWin())
	state = "Finished!! (Congrats)";
    update();
}

function squareMove(index) {
    console.log(getAdg(parseInt(blank)));
    if (getAdg(parseInt(parseInt(blank))).includes(parseInt(index))) {
	console.log("yes", index);
	let old = board[blank].value;
	board[blank].value = board[index].value;
	board[index].value = old;
	blank = index;
    }

    update();
}

function checkWin() {
    for (const square in board)
	if (board[square].value != square)
	    return false;
    return true;
}

function shuffleBoard(fuzz) {
    for (var i = 0; i < fuzz; i++) {
	let item = getAdg(parseInt(blank)).filter((i) => i>=0);
	console.log(item);
	let choice = item[Math.floor(Math.random()*item.length)];
	console.log(choice);
	squareMove(choice);
    }
};

function generateGame() {
    genBoard();
    shuffleBoard(1000);
    state = "before";
    moves = 0;

    update();
};

function update() {
    movesUI.innerHTML = moves;
    stateUI.innerHTML = state;
    updateBoard();
}
    
function updateBoard() {
    for (const square in board) {
	if (board[square].value == 0) {
	    board[square].element.id = "open";
	    board[square].element.innerHTML = "";
	    blank = square;
	}
	else {
	    board[square].element.id = "";
	    board[square].element.innerHTML = board[square].value;
	}
    }
}

