// Define the size of the game board
const boardSize = { width: 20, height: 20 };

// Define the initial state of the snake
const snake = {
    body: [{ x: 5, y: 5 }], // Initial position of the snake
    direction: { x: 1, y: 0 }, // Moving right initially
};

// Define the initial state of the food
let food = { x: 10, y: 10 };

// Set game running state to false until the user starts the game
let gameRunning = false;

// Snake movements
function moveSnake() {
    // Get the current head position
    const head = { ...snake.body[0] };

    // Update the head position based on the direction
    head.x += snake.direction.x;
    head.y += snake.direction.y;

    // Add the new head position to the front of the snake body
    snake.body.unshift(head);

    // Remove the last segment of the snake body
    snake.body.pop();
}

// Food consumption checks
function checkFoodConsumption() {
    const head = snake.body[0];
    if (head.x === food.x && head.y === food.y) {
        // Extend the snake body
        snake.body.push({ ...snake.body[snake.body.length - 1] });

        // Generate a new food position
        food = {
            x: Math.floor(Math.random() * boardSize.width),
            y: Math.floor(Math.random() * boardSize.height),
        };
    }
}

// Collision checks
function checkCollision() {
    const head = snake.body[0];

    // Log the position for debugging
    console.log(`Snake position: x=${head.x}, y=${head.y}`);

    // Check wall collision
    if (
        head.x < 0 ||
        head.x >= boardSize.width ||
        head.y < 0 ||
        head.y >= boardSize.height
    ) {
        console.log("Collision with wall detected");
        showGameOverText(); // Show "Game Over!" text
        gameRunning = false;
        return true;
    }

    // Check self collision
    for (let i = 1; i < snake.body.length; i++) {
        if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
            console.log("Self-collision detected");
            showGameOverText(); // Show "Game Over!" text
            gameRunning = false;
            return true;
        }
    }

    return false;
}

// Show "Game Over!" text
function showGameOverText() {
    const gameOverText = document.getElementById("game-over-text");
    if (gameOverText) {
        gameOverText.style.display = "block";
        gameOverText.innerText = "Game Over!";
    }
}

// Hide "Game Over!" text
function hideGameOverText() {
    const gameOverText = document.getElementById("game-over-text");
    if (gameOverText) {
        gameOverText.style.display = "none";
    }
}

// Game loop
function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        console.log("Game Over!");
        return;
    }
    checkFoodConsumption();
    renderGame();
    setTimeout(gameLoop, 200);
}

// Render the game, snake & food
function renderGame() {
    const gameBoard = document.getElementById("game-board");
    if (gameBoard) {
        gameBoard.innerHTML = "";

        // Render the snake
        snake.body.forEach((segment) => {
            console.log(`Rendering snake segment at x=${segment.x}, y=${segment.y}`);
            const snakeElement = document.createElement("div");
            snakeElement.style.left = `${segment.x * 20}px`;
            snakeElement.style.top = `${segment.y * 20}px`;
            snakeElement.classList.add("snake-segment");
            gameBoard.appendChild(snakeElement);
        });

        // Render the food
        console.log(`Rendering food at x=${food.x}, y=${food.y}`);
        const foodElement = document.createElement("div");
        foodElement.style.left = `${food.x * 20}px`;
        foodElement.style.top = `${food.y * 20}px`;
        foodElement.classList.add("food");
        gameBoard.appendChild(foodElement);
    } else {
        console.error("Game board element not found!");
    }
}

// Event listener for user keystrokes
document.addEventListener("keydown", (event) => {
    // Start the game if it's over and Enter is pressed
    if (event.key === "Enter" && !gameRunning) {
        StartGame();
        gameRunning = true;  // Set gameRunning to true to start the game
    } else if (gameRunning) {
        // Game controls for snake movement
        switch (event.key) {
            case "ArrowUp":
                if (snake.direction.y !== 1) snake.direction = { x: 0, y: -1 };
                break;
            case "ArrowDown":
                if (snake.direction.y !== -1) snake.direction = { x: 0, y: 1 };
                break;
            case "ArrowLeft":
                if (snake.direction.x !== 1) snake.direction = { x: -1, y: 0 };
                break;
            case "ArrowRight":
                if (snake.direction.x !== -1) snake.direction = { x: 1, y: 0 };
                break;
        }
    }
});

// Starting the game
function StartGame() {
    // Reset snake position, direction, and body
    snake.body = [{ x: 5, y: 5 }];
    snake.direction = { x: 1, y: 0 };

    // Reset food position
    food = { x: 10, y: 10 };

    // Hide the "Game Over!" text
    hideGameOverText();

    // Start the game loop
    gameLoop();
}