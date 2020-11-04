const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const result = document.querySelector(".result");
const humanBox = document.querySelector(".humanBox");
const botBox = document.querySelector(".botBox");

function rndm1() {
  return Math.floor(Math.random() * 6);
}

function rndm2() {
  return Math.floor(Math.random() * 6);
}

document.addEventListener("keyup", keyUp);

function keyUp(e) {
  let key = e.key;
  // console.log(key);
  if (key == "ArrowUp") {
    shuffle();
    deal();
    computeResult();
  } else if (key == "ArrowDown") {
    let allDivs1 = humanBox.querySelectorAll("div");
    let allDivs2 = botBox.querySelectorAll("div");
    for (let i = 0; i < allDivs1.length; i++) {
      allDivs1[i].remove("div");
    }
    for (let i = 0; i < allDivs2.length; i++) {
      allDivs2[i].remove("div");
    }
    result.innerHTML = " ";
  }
}

btn1.addEventListener("click", () => {
  shuffle();
  deal();
  computeResult();
});

function shuffle() {
  if (humanBox.innerHTML == "") {
    for (let i = 0; i <= rndm1(); i++) {
      let humanDiv = document.createElement("div");
      humanDiv.setAttribute("class", "humanValues");
      humanBox.appendChild(humanDiv);
    }
  }
}

function deal() {
  if (botBox.innerHTML == "") {
    for (let i = 0; i <= rndm2(); i++) {
      let botDiv = document.createElement("div");
      botDiv.setAttribute("class", "botValues");
      botBox.appendChild(botDiv);
    }
  }
}

btn2.addEventListener("click", () => {
  let allDivs1 = humanBox.querySelectorAll("div");
  let allDivs2 = botBox.querySelectorAll("div");
  for (let i = 0; i < allDivs1.length; i++) {
    allDivs1[i].remove("div");
  }
  for (let i = 0; i < allDivs2.length; i++) {
    allDivs2[i].remove("div");
  }
  result.innerHTML = " ";
});

function computeResult() {
  let humanDivNum = humanBox.querySelectorAll("div");
  let botDivNum = botBox.querySelectorAll("div");
  if (humanDivNum.length > botDivNum.length) {
    result.innerHTML = "You Win.";
    result.style.color = "green";
  } else if (humanDivNum.length < botDivNum.length) {
    result.innerHTML = "You Lost.";
    result.style.color = "red";
  } else {
    result.innerHTML = "You Draw.";
    result.style.color = "black";
  }
}
