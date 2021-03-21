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
    [oShape, "lightgreen"],
    [lShape, "brown"],
    [tShape, "white"],
    [iShape, "black"]
]

let p = new Piece(PIECES[0][0], PIECES[0][1])

function Piece(shape, color) {
    this.shape = shape;
    this.color = color;
    this.number = 0;
    this.active = this.shape[this.number];
    this.x = 3;
    this.y = -2;
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


Piece.prototype.goDown = function () {
    if (this.collision(0, 1, this.active)) {
        this.y++;
        this.draw();
    }
}

Piece.prototype.goRight = function () {
    if (this.collision(1, 0, this.active)) {
        this.x++;
        this.draw();
    }
}

Piece.prototype.goLeft = function () {
    if (this.collision(-1, 0, this.active)) {
        this.x--;
        this.draw();
    }
    else {

    }
}

Piece.prototype.rotation = function () {
    let rotated =  this.shape[(this.number + 1) % this.shape.length];

    if (this.collision(0, 0, rotated)) {
        this.number = (this.number + 1) % this.shape.length;
        this.active = this.shape[this.number];
        this.draw();
    }
    else {

    }
}

Piece.prototype.collision = function (x, y, Piece) {
    for (r = 0; r < Piece.length; r++) {
        for (c = 0; c < Piece.length; c++) {
            if (!Piece[r][c]) {
                // continue;
                r++;
                c++;
            }
            let newX = this.x + c + x;
            let newY = this.y + c; + y;

            if (newX < 0 || newX >= COLS || newY >= ROW) {
                return false;
            }
            if(newY < 0){
                continue;
            }
            if (board[newY][newX] != EMPTY) {
                return false;
            }
        }
    }
    return true;
}

document.addEventListener("keydown", CONTROL);
function CONTROL(event) {
    drawBoard();
    if (event.keyCode == 37) {
        p.goLeft();
        startTime = Date.now();
    } else if (event.keyCode == 38) {
        p.rotation();
        startTime = Date.now();
    } else if (event.keyCode == 39) {
        p.goRight();
        startTime = Date.now();
    } else if (event.keyCode == 40) {
        p.goDown();
    }
}

let startTime = Date.now();
function fall() {
    p.draw();
    let time = Date.now();
    if ((time - startTime) > 100) {
        drawBoard();
        p.goDown();
        startTime = Date.now();
    }
    requestAnimationFrame(fall);
}

fall();