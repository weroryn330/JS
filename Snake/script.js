const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
const box = 30;

var snake;

(function setUp() {
    snake = new Snake();
    window.setInterval(() => {
        snake.update();
        snake.draw();
    }, 500);
}());

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = box * 1;
    this.ySpeed = 0;

    this.draw = function() {
        context.fillStyle = "#8cffec";
        context.fillRect(this.x, this.y, box, box);
    }

    this.update = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
}