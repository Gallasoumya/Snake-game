const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set up game variables
let snake = [];
let food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
let direction = 'right';
let score = 0;

// Draw the game board
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake body
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = snake[i].color;
    ctx.fillRect(snake[i].x * 20, snake[i].y * 20, 20, 20);
  }

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

  // Draw score
  ctx.fillStyle = 'white';
  ctx.font = '24px Arial';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Score: ${score}`, 10, 10);
}

// Update game logic
function update() {
  // Move snake
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }

  switch (direction) {
    case 'up':
      snake[0].y -= 1;
      break;
    case 'down':
      snake[0].y += 1;
      break;
    case 'left':
      snake[0].x -= 1;
      break;
    case 'right':
      snake[0].x += 1;
      break;
    default:
      break;
  }

  // Check for collisions with food
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    food = { x: Math.floor(Math.random() * (canvas.width / 20)), y: Math.floor(Math.random() * (canvas.height / 20)) };
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
    snake[snake.length - 1].color = '#00FF00';
    setTimeout(() => {
      snake.pop();
    }, 100);
    return;
  }

   // Check for collisions with walls and self
   if (snake[0].x < -1 || snake[0].x >= canvas.width / canvas.width || 
       snake[0].y < -1 || snake[0].y >= canvas.height / canvas.height || 
       hasCollision(snake)) {
     alert('Game Over!');
     return;
   }
}

// Check for collision with self
function hasCollision(snake) {
   for (let i = snake.length -2 ; i >=0; i--) {
     if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
       return true;
     }
   }
   return false;
}

// Handle user input
document.addEventListener('keydown', (event) => {
   switch (event.key) {
     case 'ArrowUp':
       direction = 'up';
       break;
     case 'ArrowDown':
       direction = 'down';
       break;
     case 'ArrowLeft':
       direction = 'left';
       break;
     case 'ArrowRight':
       direction = 'right';
       break;
   }
});

// Main game loop
setInterval(() => {
   draw();
   update();
},16);