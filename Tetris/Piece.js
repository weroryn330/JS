const PIECES = [
    [zShape, "#ff5252"],
    [jShape, "#fcc290"],
    [sShape, "#90fcdc"],
    [oShape, "#90d4fc"],
    [lShape, "#dc58fc"],
    [tShape, "#fc90f1"],
    [iShape, "#fcfc90"]
]

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

// movements
Piece.prototype.goDown = function () {
    if (!this.isCollision(0,1,this.active)){
        drawBoard();
        this.y++;
        this.draw();
    } 
    else {
        this.lock();
        p = generate();
    }
}

Piece.prototype.goRight = function () {
    if (!this.isCollision(1, 0, this.active)) {
        drawBoard();
        this.x++;
        this.draw(this.color);
    }
}

Piece.prototype.goLeft = function () {
    if (!this.isCollision(-1, 0, this.active)) {
        drawBoard();
        this.x--;
        this.draw();
    }
}

// shape rotation
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

Piece.prototype.isCollision = function(x, y, piece){
    for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            if(!piece[r][c]){
                continue;
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            
            if(newX < 0 || newX >= COLS || newY >= ROWS){
                return true;
            }
            if(newY < 0){
                continue;
            }
            if( board[newY][newX] != EMPTY){
                return true;
            }
        }
    }
    return false;
}

Piece.prototype.lock = function(){
    for( r = 0; r < this.active.length; r++){
        for(c = 0; c < this.active.length; c++){
            if( !this.active[r][c]){
                continue;
            }
            if(this.y + r < 0){
                alert("Game Over");
                gameOver = true;
                break;
            }
            board[this.y+r][this.x+c] = this.color;
        }
    }
    for(r = 0; r < ROWS; r++) {
        let isRowFull = true;
        for( c = 0; c < COLS; c++) {
            isRowFull = isRowFull && (board[r][c] != EMPTY);
        }
        if(isRowFull){
            for( y = r; y > 1; y--) {
                for( c = 0; c < COLS; c++) {
                    board[y][c] = board[y-1][c];
                }
            }
            for( c = 0; c < COLS; c++) {
                board[0][c] = EMPTY;
            }
            score += COLS;
        }
    }
    drawBoard();
    
    scoreElement.innerHTML = score;
}