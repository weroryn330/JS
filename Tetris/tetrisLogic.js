const cvs =  document.getElementById("tetrisGround");
const ctx = cvs.getContext("2d");

const ROWS = 20;
const COLS = 10;
const SS = 20;
const EMPTY = "#4f4f4f" // backgound color to fill empty places of the ground

// drawing a square
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 10, 10); 