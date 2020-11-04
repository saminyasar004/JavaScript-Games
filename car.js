const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};


let player = {
  speed: 5,
  score: 0,
};

startScreen.addEventListener("click", start);

document.addEventListener("keyup", keyUp);
document.addEventListener("keydown", keyDown);

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = true;
}

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.left > bRect.right ||
    aRect.right < bRect.left
  );
}

function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y >= 700) {
      item.y -= 750;
    }

    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function endGame() {
  player.start = false;
  startScreen.classList.remove("hide");
  startScreen.innerHTML =
    "Game Over. Your Final Score is: <b>" +
    (player.score + 1) +
    "</b><br> If You Want Restsrt The Game Click Here.";
  startScreen.setAttribute("style", "font-size: 18px;line-height: 30px;");
}

function moveEnimy(car) {
  let enimy = document.querySelectorAll(".enimy");
  enimy.forEach(function (item) {
    if (isCollide(car, item)) {
      endGame();
    }

    if (item.y >= 750) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
      item.style.background = randomColor();
    }

    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function playGame() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();

  if (player.start) {
    moveLines();
    moveEnimy(car);

    if (keys.ArrowDown && player.y > road.top + 130) {
      player.y -= player.speed;
    }
    if (keys.ArrowUp && player.y < road.bottom - 100) {
      player.y += player.speed;
    }
    if (keys.ArrowRight && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowLeft && player.x < road.width - 50) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(playGame);

    player.score++;
    score.innerText = "Your Score: " + player.score;
  }
}

function start() {
  // gameArea.classList.remove("hide");
  score.classList.remove("hide");
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";

  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(playGame);

  for (i = 0; i < 25; i++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = i * 150;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }

  let car = document.createElement("div");
  gameArea.appendChild(car);
  car.setAttribute("class", "car");

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  for (i = 0; i < 3; i++) {
    let enimyCar = document.createElement("div");
    enimyCar.setAttribute("class", "enimy");
    enimyCar.y = (i + 1) * 350 * -1;
    enimyCar.style.top = enimyCar.y + "px";
    enimyCar.style.left = Math.floor(Math.random() * 350) + "px";
    enimyCar.style.background = randomColor();
    gameArea.appendChild(enimyCar);
  }
}

function randomColor() {
  function c() {
    let hex = Math.floor(Math.random() *256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return "#" + c() + c() + c();
}

// document.addEventListener("keydown", function (e) {
//   let keyValue = e.key;
//   let car = document.querySelector(".car");
//   player.x = car.offsetLeft;
//   player.y = car.offsetTop;
//   if (keyValue === "ArrowUp" && player.y > 111) {
//     player.y -= player.speed;
//   } else if (keyValue === "ArrowDown" && player.y < 385) {
//     player.y += player.speed;
//   } else if (keyValue === "ArrowRight" && player.x < 300) {
//     player.x += player.speed;
//   } else if (keyValue === "ArrowLeft" && player.x > 0) {
//     player.x -= player.speed;
//   }

//   car.style.top = player.y + "px";
//   car.style.left = player.x + "px";
// });
