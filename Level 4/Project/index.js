
function init() {
    board = [];
    state = "Pre-Game";
    moves = 0;
    DEFAULT_IMAGE = "default.png";
    imagePath = DEFAULT_IMAGE;
    selected = null;

    // Bind UI elements
    boardDisplay = document.getElementById("board");
    movesUI = document.getElementById("moves");
    stateUI = document.getElementById("state");
    bgUploadUI = document.getElementById("user_image");
    bgSubmitUI = document.getElementById("user_submit");
}

function genBoard() {
    for (var i = 0; i < 16; i++) {
	board[i] = { pos: i, val: i };
    }

    state = "Setup";
    moves = 0;

    bindBoard();
    update();
}

async function bindBoard(image) {
    boardDisplay.innerHTML = "";
    const image_src = new Image(); // for figuring out width and height
    image_src.src = imagePath;
    await image_src.decode();
    const width = 600;
    const height = Math.round(image_src.naturalHeight*(width/image_src.naturalWidth));
    boardDisplay.style.width = width + "px";
    boardDisplay.style.height = height + "px";

    var image = document.createElement("div");
    image.style.backgroundImage = `url(${image_src.src})`;

    image.style.width = `${width/4}px`;
    image.style.height = `${height/4}px`;
    image.style.backgroundSize = `${width}px ${height}px`;
    
    let element;
    for (const square in board) {
	element = image.cloneNode();
	board[square].element = element;
	element.onclick = (event) => {
	    let me = board[square].pos;
	    squareClick(event.currentTarget.style.order)};
	element.style.order = parseInt(square);
	element.style.backgroundPosition =
	    `-${(width/4)*(square%4)}px -${(height/4)*(Math.floor(square/4))}px`;

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
    if (state != "Gaming")
	return;

    if (selected == null) {
	console.log("changed sel: " + index);
	selected = index;
    } else {
	console.log(`switching ${selected} and ${index}`);
	squareMove(selected, index);
	selected = null;
	moves++;
	if (checkWin())
    	    state = "Finished!! (Congrats)";
    }
    update();
}

function squareMove(base, swap) {
    console.log(getAdg(parseInt(base)));
    if (getAdg(parseInt(base)).includes(parseInt(swap))) {
	// Change Actual Items
	let old = board[base];
	board[base]= board[swap];
	board[swap] = old;
	// Make them position aware
	old = board[base].pos;
	board[base].pos = board[swap].pos;
	board[swap].pos = old;
    }
}

function uploadImage() {
    if (imagePath === DEFAULT_IMAGE) {
	imagePath = URL.createObjectURL(bgUploadUI.files[0]);
	bgSubmitUI.innerHTML = "Clear";
    } else {
	imagePath = DEFAULT_IMAGE;
	bgUploadUI.value = "";
	bgSubmitUI.innerHTML = "Upload";
    }
	
}

function checkWin() {
    for (var square in board) {
	console.log(square + " " + board[square].val);
	if (square != board[square].val)
	    return false;
    }
    return true;
}

function startButton() {
    shuffleBoard(200);
    state = "Gaming";
    update();
}
    
function shuffleBoard(fuzz) {
    for (var i = 0; i < fuzz; i++) {
	let first = Math.floor(Math.random()*16);
	let item = getAdg(parseInt(first)).filter((i) => i>=0);
	console.log(item);
	console.log(board);
	let second = item[Math.floor(Math.random()*item.length)];
	console.log(second);
	squareMove(first, second);
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
	board[square].element.style.order = square;
	board[square].element.id = square == selected ? "sel" : "";
    }
}
