const PIECES = [
    [zShape, "red"],
    [jShape, "orange"],
    [sShape, "yellow"],
    [oShape, "lightgreen"],
    [lShape, "brown"],
    [tShape, "white"],
    [iShape, "black"]
]
function Piece(shape, color) {
    this.shape = shape;
    this.color = color;
    this.number = 0;
    this.active = this.shape[this.number];
    this.x = 3;
    this.y = -2;
    this.locked = false;
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
        this.draw(EMPTY);
        this.y++;
        this.draw();
    }
    else {
        this.locked = true;
        p = generate();
    }
}

Piece.prototype.goRight = function () {
    if (!this.isCollision(1, 0, this.active)) {
        this.draw(EMPTY);
        this.x++;
        this.draw(this.color);
    }
}

Piece.prototype.goLeft = function () {
    if (!this.isCollision(-1, 0, this.active)) {
        this.draw(EMPTY);
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
                this.draw (this.color);
                this.x -= 1;
                this.number = (this.number + 1) % this.shape.length;
                this.active = this.shape[this.number];
                this.draw();
           }
        }
        else {
            if (!this.isCollision(1, 0, rotated)) {
                this.draw(EMPTY);
                this.x += 1;
                this.number = (this.number + 1) % this.shape.length;
                this.active = this.shape[this.number];
                this.draw();
           }
        }
    }
    if (!this.isCollision(move, 0, rotated)) {
        this.draw(EMPTY);
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