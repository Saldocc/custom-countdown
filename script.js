const inputContainer = document.querySelector("#input-container");
const countdownForm = document.querySelector("#countdownForm");
const dateEl = document.querySelector("#date-picker");

const countdownEle = document.querySelector("#countdown");
const countdownEleTitle = document.querySelector("#countdown-title");
const countdownBtn = document.querySelector("#countdown-button");
const timeElements = countdownEle.querySelectorAll("span");

const completeEle = document.querySelector("#complete");
const completeEleInfo = document.querySelector("#complete-info");
const completeEleBtn = document.querySelector("#complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//set minimum value of date input
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    inputContainer.hidden = true;

    if (distance < 0) {
      countdownEle.hidden = true;
      clearInterval(countdownActive);
      completeEleInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEle.hidden = false;
    } else {
      countdownEleTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEle.hidden = true;
      countdownEle.hidden = false;
    }
  }, second);
}

function updateCountdouwn(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
      title:countdownTitle,
      date:countdownDate,
  }
  localStorage.setItem("countdown", JSON.stringify(savedCountdown))
  //get number version of current datei updateDOM
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
}

function restorePreviousCountdown(){
    if(localStorage.getItem("countdown")){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem("countdown"))
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

function resetCountdown() {
  countdownEle.hidden = true;
  completeEle.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown")
}

//Events
countdownForm.addEventListener("submit", updateCountdouwn);
countdownBtn.addEventListener("click", resetCountdown);
completeEleBtn.addEventListener("click", resetCountdown);

//on Load
restorePreviousCountdown()