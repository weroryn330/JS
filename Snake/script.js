const cheq = document.getElementById("chequered")
const context = cheq.getContext('2d')

window.onload = draw()

const box = 30;

let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 17 + 1) * box
}
// 14:26

let score = 0

function draw() {
    for (let i = 0; i < snake.length; i++) {
        cheq.innerHTML = '<div class="head">frgrfefefegrgr</div>'
        context.fillStyle = (i == 0) ? "green" : "white"
        context.fillRect(snake[i].x, snake[i].y, box, box)
        context.strokeStyle = "red";
        context.strokeRext(snake[i].x, snake[i].y, box, box);
    }
    cheq.innerHTML = '<div class="head"></div>'
    setTimeout("draw()", 1000);
}
