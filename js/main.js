let blackjackGame = {
  you: { scoreSpan: "#yourResult", div: "#yourBox", score: 0 },
  dealer: { scoreSpan: "#dealerResult", div: "#dealerBox", score: 0 },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "Q", "J", "A"],
  cardsMap: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    K: 10,
    Q: 10,
    J: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draw: 0,
  standMode: false,
  turnsOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio("sounds/cash.mp3");
const lostSound = new Audio("sounds/aww.mp3");

document.getElementById("btnHit").addEventListener("click", blackjackHit);
document.getElementById("btnStand").addEventListener("click", blackjackStand);
document.getElementById("btnDeal").addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["standMode"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function randomCard() {
  let randomNumber = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomNumber];
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let img = document.createElement("img");
    img.src = `img/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(img);
    hitSound.play();
  }
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function blackjackStand() {
  blackjackGame["standMode"] = true;

  while (DEALER["score"] < 16 && blackjackGame["standMode"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }
  blackjackGame["turnsOver"] = true;
  let winner = computeResult();
  showResult(winner);
}

function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["standMode"] = false;
    resetAll();
    let yourImages = document.querySelector("#yourBox").querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealerBox")
      .querySelectorAll("img");

    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove("img");
    }

    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove("img");
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;
    document.querySelector(YOU["scoreSpan"]).textContent = 0;
    document.querySelector(YOU["scoreSpan"]).style.color = "#fff";
    document.querySelector(DEALER["scoreSpan"]).textContent = 0;
    document.querySelector(DEALER["scoreSpan"]).style.color = "#fff";

    blackjackGame["turnsOver"] = true;
  }
}

function resetAll() {
  document.querySelector("#resultBox").textContent = "Let's play";
  document.querySelector("#resultBox").style.color = "black";
}

function computeResult() {
  let winner;

  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blackjackGame["losses"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draw"]++;
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blackjackGame["losses"]++;
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draw"]++;
  }
  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (blackjackGame["turnsOver"] === true) {
    if (winner === YOU) {
      document.getElementById("winResult").textContent = blackjackGame["wins"];
      message = "You Won!";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.getElementById("lostResult").textContent =
        blackjackGame["losses"];
      message = "You Lost!";
      messageColor = "red";
      lostSound.play();
    } else {
      document.getElementById("drawResult").textContent = blackjackGame["draw"];
      message = "Match Drew!";
      messageColor = "black";
    }

    document.querySelector("#resultBox").textContent = message;
    document.querySelector("#resultBox").style.color = messageColor;
  }
}
