const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 12;
const paddleHeight = 100;
const ballSize = 12;

let playerY = canvas.height / 2 - paddleHeight / 2;
let computerY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 3;

let upPressed = false;
let downPressed = false;

let playerScore = 0;
let computerScore = 0;

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    upPressed = true;
  }
  if (event.key === "ArrowDown") {
    downPressed = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") {
    upPressed = false;
  }
  if (event.key === "ArrowDown") {
    downPressed = false;
  }
});

function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawBall() {
  ctx.fillStyle = "white";
  ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

function drawNet() {
  for (let i = 0; i < canvas.height; i += 30) {
    drawRect(canvas.width / 2 - 2, i, 4, 20, "#00ffcc");
  }
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "28px Arial";
  ctx.fillText(playerScore, canvas.width / 4, 40);
  ctx.fillText(computerScore, canvas.width * 3 / 4, 40);
}

function movePlayer() {
  if (upPressed && playerY > 0) {
    playerY -= 6;
  }
  if (downPressed && playerY < canvas.height - paddleHeight) {
    playerY += 6;
  }
}

function moveComputer() {
  let computerCenter = computerY + paddleHeight / 2;

  if (computerCenter < ballY) {
    computerY += 4;
  } else if (computerCenter > ballY) {
    computerY -= 4;
  }

  if (computerY < 0) {
    computerY = 0;
  }
  if (computerY > canvas.height - paddleHeight) {
    computerY = canvas.height - paddleHeight;
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (
    ballX <= 20 &&
    ballY + ballSize >= playerY &&
    ballY <= playerY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ballX + ballSize >= canvas.width - 20 &&
    ballY + ballSize >= computerY &&
    ballY <= computerY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX < 0) {
    computerScore++;
    resetBall();
  }

  if (ballX > canvas.width) {
    playerScore++;
    resetBall();
  }
}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, "black");
  drawNet();
  drawScore();

  drawRect(10, playerY, paddleWidth, paddleHeight, "white");
  drawRect(canvas.width - 22, computerY, paddleWidth, paddleHeight, "white");
  drawBall();
}

function update() {
  movePlayer();
  moveComputer();
  moveBall();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
