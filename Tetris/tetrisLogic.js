const cvs =  document.getElementById("tetrisGround");
const ctx = cvs.getContext("2d");
const ROWS = 20;
const COLS = 10;
const SS = 20; // square size
const EMPTY = "#4f4f4f" // backgound color to fill empty places of the ground

function drawSquare(x, y, color) {
    // drawing a square
    ctx.fillStyle = color;
    ctx.fillRect(x * SS, y * SS, SS, SS); 

    ctx.strokeStyle = "black";
    ctx.strokeRect(x * SS, y * SS, SS, SS); 
}

let board = [];
function drawBoard() {
    for(r=0; r<ROWS; r++) {
        board[r] = [];
        for(c=0; c<COLS; c++) {
            board[r][c] = EMPTY;
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();
// shape with it's color

let p = new Piece(PIECES[0][0], PIECES[0][1]) 

function Piece(shape, color) {
    this.shape = shape;
    this.color = color;
    this.active = this.shape[0];
    this.x = 0;
    this.y = 0;
}

Piece.prototype.draw = function() {
    for(r = 0; r < this.active.length; r++) {
        for (c = 0; c < this.active.length; c++) {
            if (this.active[r][c]) {
                drawSquare(this.x + c, this.y + r, p.color);
            }
        }
    }
}