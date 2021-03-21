const cvs = document.getElementById("tetrisGround");
const ctx = cvs.getContext("2d");
const ROWS = 20;
const COLS = 10;
const SS = 20; // square size
const EMPTY = "#4f4f4f" // backgound color to fill empty places of the ground
let board = [];

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
        }
    }
}

drawBoard();
// shape with it's color

const PIECES = [
    [zShape, "red"],
    [jShape, "orange"],
    [sShape, "yellow"],
    [oShape, "lightgreen"]
]    

let p = new Piece(PIECES[0][0], PIECES[0][1])

function Piece(shape, color) {
    this.shape = shape;
    this.color = color;
    this.active = this.shape[0];
    this.x = 3;
    this.y = -1;
}

Piece.prototype.draw = function () {
    for (r = 0; r < this.active.length; r++) {
        for (c = 0; c < this.active.length; c++) {
            if (this.active[r][c]) {
                drawSquare(this.x + c, this.y + r, this.color);
            }
        }
    }
}

p.draw();

Piece.prototype.goDown = function () {
    this.y++;
    this.draw();
    if (this.y >= 17){
        this.y = 17;
    }
}

Piece.prototype.goRight = function () {
    drawBoard();
    this.x++;
    this.draw();
    if (this.x > 6){
        this.x = 6;
    }
}

Piece.prototype.goLeft = function () {
    drawBoard();
    this.x--;
    this.draw();
    if (this.x < 1 ){
        this.x = 1;
    }
}

let startTime = Date.now();
function fall(){
    let time = Date.now();
    if((time-startTime) > 100){
        drawBoard();
        p.goDown();
        startTime = Date.now();
    }
    requestAnimationFrame(fall);
}

fall();