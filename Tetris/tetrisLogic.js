const cvs = document.getElementById("tetrisGround");
const ctx = cvs.getContext("2d");
const ROWS = 20;
const COLS = 10;
const SS = 20; // square size
const EMPTY = "#4f4f4f"; // backgound color to fill empty places of the ground
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

function generate () {
    let randN = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[randN][0], PIECES[randN][1]);
}

let p = generate();

function Piece(shape, color) {
    this.shape = shape;
    this.color = color;
    this.number = 0;
    this.active = this.shape[this.number];
    this.x = 3;
    this.y = -2;
}

Piece.prototype.draw = function (color) {
    for (r = 0; r < this.active.length; r++) {
        for (c = 0; c < this.active.length; c++) {
            if (this.active[r][c]) {
                drawSquare(this.x + c, this.y + r, this.color);
            }
        }
    }
}


Piece.prototype.goDown = function () {
    if (!this.isCollision(0, 1, this.active)) {
        drawBoard();
        this.y++;
        this.draw();
    }
    else {
        p = generate();
    }
}

Piece.prototype.goRight = function () {
    if (!this.isCollision(1, 0, this.active)) {
        drawBoard();
        this.x++;
        this.draw();
    }
}

Piece.prototype.goLeft = function () {
    if (!this.isCollision(-1, 0, this.active)) {
        drawBoard();
        this.x--;
        this.draw();
    }
}

Piece.prototype.rotation = function () {
    let rotated =  this.shape[(this.number + 1) % this.shape.length];
    let move = 0;
    if (this.isCollision(0, 0, rotated)) {
        if (this.x > COLS/2) {
           if (!this.isCollision(-1, 0, rotated)) {
                drawBoard();
                this.x -= 1;
                this.number = (this.number + 1) % this.shape.length;
                this.active = this.shape[this.number];
                this.draw();
           }
        }
        else {
            if (!this.isCollision(1, 0, rotated)) {
                drawBoard();
                this.x += 1;
                this.number = (this.number + 1) % this.shape.length;
                this.active = this.shape[this.number];
                this.draw();
           }
        }
    }
    if (!this.isCollision(move, 0, rotated)) {
        drawBoard();
        this.number = (this.number + 1) % this.shape.length;
        this.active = this.shape[this.number];
        this.draw();
    }
}

Piece.prototype.isCollision = function(x, y, Piece) {
    for (r = 0; r < Piece.length; r++) {
        for (c = 0; c < Piece.length; c++) {
            if (!Piece[r][c]) {
                continue; 
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y;

            if (newX < 0 || newX >= COLS || newY >= ROWS) {
                return true;
            }
            if(newY < 0) {
                continue;
            }
            if (board[newY][newX] != EMPTY) {
                return true;
            }
        }
    }
    return false;
}

document.addEventListener("keydown", CONTROL);
function CONTROL(event) {
    drawBoard();
    p.generate();
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
    if ((time - startTime) > 300) {
        drawBoard();
        p.goDown();
        startTime = Date.now();
    }
    requestAnimationFrame(fall);
}

fall();