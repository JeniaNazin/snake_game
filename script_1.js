var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 50; // размер клетки
var count = 0; // скорость
var snake = {
    x: 250,
    y: 250, // нач координаты
    dx: grid,
    dy: 0, // скорость
    cells: [], // хвост
    maxCells: 2  // нач длина
};
var apple = {
    x: 100,
    y: 100 // нач координаты
};
let counter = 0; // счетчик

let btnAgain = document.querySelector("#btnreturn");
btnAgain.addEventListener('click', function() {
    counter = 0;
    document.querySelector("#result").innerHTML = counter;
    btnAgain.style.visibility = "hidden";
    bestResult = localStorage.getItem("bestResult");
    document.querySelector("#bestresult").innerHTML = `BEST RESULT: ${bestResult}`;
    snake.x = 250;
    snake.y = 250;
    snake.cells = [];
    snake.maxCells = 2;
    snake.dx = grid;
    snake.dy = 0;
    apple.x = getRandomInt(0, 10) * grid;
    apple.y = getRandomInt(0, 10) * grid;
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
} // генератор случайных чисел в заданном диапазоне 

function loop() { // игра
    requestAnimationFrame(loop);
    if (++count < 10) {
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.x < 0) {
        snake.cells = [];
        btnAgain.style.visibility = "visible";
      }
      else if (snake.x >= canvas.width) {
        snake.cells = [];
        btnAgain.style.visibility = "visible";
      }
      if (snake.y < 0) {
        snake.cells = [];
        btnAgain.style.visibility = "visible";
      }
      else if (snake.y >= canvas.height) {
        snake.cells = [];
        btnAgain.style.visibility = "visible";
      }
    snake.cells.unshift({
        x: snake.x, 
        y: snake.y
    });
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    context.fillStyle = 'red'; // яблоко
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === apple.x && cell.y === apple.y) { // поедание яблока
            snake.maxCells++;
            counter++;
            localStorage.setItem("bestResult", counter);
            document.querySelector("#result").innerHTML = counter;
            apple.x = getRandomInt(0, 10) * grid; // новое яблоко
            apple.y = getRandomInt(0, 10) * grid;
        }
        // проверка на столкновение
        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.cells = [];
                btnAgain.style.visibility = "visible";
            }
        }
    });
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if (e.key === 'ArrowUp' && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    else if (e.key === 'ArrowRight' && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.key === 'ArrowDown' && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});
requestAnimationFrame(loop);