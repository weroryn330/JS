const cvs = document.getElementById("tetrisGround");
const ctx = cvs.getContext("2d");
const ROWS = 20;
const COLS = 10;
const SS = 20; // square size
const EMPTY = "#4f4f4f"; // backgound color to fill empty places of the ground
let board = [];
let gameOver = false;

function drawSquare(x, y, color) {
    // drawing a square
    ctx.fillStyle = color;
    ctx.fillRect(x * SS, y * SS, SS, SS);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x * SS, y * SS, SS, SS);
}

function drawBoard() {
    for (r = 0; r < ROWS; r++) {
        board[r] = [];
        for (c = 0; c < COLS; c++) {
            board[r][c] = EMPTY;
            drawSquare(c, r, board[r][c]);
            if (this.locked){
                drawSquare(c, r, this.color);
            }
        }
    }
}

drawBoard();

// New piece
function generate () {
    let randN = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[randN][0], PIECES[randN][1]);
}

let p = generate();

// Key listener
document.addEventListener("keydown", CONTROL);
function CONTROL(event) {
    if (event.keyCode == 37) { // Left key
        p.goLeft();
        startTime = Date.now();
    } else if (event.keyCode == 38) { // Up key
        p.rotation();
        startTime = Date.now();
    } else if (event.keyCode == 39) { // Right key
        p.goRight();
        startTime = Date.now();
    } else if (event.keyCode == 40) { // Down key
        p.goDown();
    }
}

let startTime = Date.now();
function fall() {
    drawBoard(); // todo
    p.draw(); // todo
    let time = Date.now();
    if ((time - startTime) > 300) {
        p.goDown();
        startTime = Date.now();
    }
    requestAnimationFrame(fall);
}

fall();