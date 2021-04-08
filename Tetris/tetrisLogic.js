const cvs = document.getElementById("tetrisGround");
const ctx = cvs.getContext("2d");
const ROWS = 20;
const COLS = 10;
const SS = 20; // square size
const EMPTY = "#3f3f3f"; // backgound color to fill empty places of the ground
const scoreElement = document.getElementById("score");
let board = [];
var gameOver = false;
let score = 0;
const checkbox = document.getElementById("checkbox");



function drawSquare(x, y, color) {
    // drawing a single square
    ctx.fillStyle = color;                  // color of the square
    ctx.fillRect(x * SS, y * SS, SS, SS);

    ctx.strokeStyle = "#5f5f5f";              // frame of the square
    ctx.strokeRect(x * SS, y * SS, SS, SS);
}

// creating empty board
for (r = 0; r < ROWS; r++) {
    board[r] = [];
    for (c = 0; c < COLS; c++) {
        board[r][c] = EMPTY;
    }
}
score = 0;

function drawBoard() {
    for (r = 0; r < ROWS; r++) {
        for (c = 0; c < COLS; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

// New piece
function generate() {
    var randN = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[randN][0], PIECES[randN][1]);
}

var p = generate();

// Main function
function main() {
    var startTime = Date.now();
    let gameOver = false;
    let stop = false;
    drawBoard();

    // Key listener
    document.addEventListener("keydown", CONTROL);
    function CONTROL(event) {
        if (event.keyCode == 37) { // Left key
            p.goLeft();
        }
        else if (event.keyCode == 38) { // Up key
            p.rotation();
        }
        else if (event.keyCode == 39) { // Right key
            p.goRight();
        }
        else if (event.keyCode == 40) { // Down key
            p.goDown();
        }
    }

    function fall() {
        var time = Date.now();
        if ((time - startTime) > 300) {
            p.goDown();
            startTime = Date.now();
        }
        if (!gameOver) {
            requestAnimationFrame(fall);
        }
    }
    fall();
}
main();