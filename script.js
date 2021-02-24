const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.querySelector(".complete-info");
const completeBtn = document.querySelector(".complete-button");

const timeTable = [24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000, 1000];
let countdownTitle = "",
  countdownDate = "",
  countdownValue = Date,
  countdownActive;

//set date min with today
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

//convert msecs to days,hours....
const converter = (a, b) => [Math.floor(a / b), a % b];

//count down completed
function completed() {
  countdownEl.hidden = true;
  inputContainer.hidden = true;
  clearInterval(countdownActive);
  completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
  completeEl.hidden = false;
}

//find how much time we have to final date
function remainingTime() {
  const now = new Date().getTime();
  let distance = countdownValue - now < 0 ? 0 : countdownValue - now;
  //check wheter countdown is finished or not
  if (!distance) {
    completed();
    return;
  }
  //shoow remaining time
  timeElements.forEach(
    (el, i) => ([el.textContent, distance] = converter(distance, timeTable[i]))
  );
}

function updateDOM() {
  //guard clause for empty submitted inputs
  if (!countdownDate) return;
  remainingTime();
  //guard clause for completed countdown
  if (!completeEl.hidden) return;
  //hide input, show countdown
  inputContainer.hidden = true;
  countdownEl.hidden = false;
  //start countdown every second
  countdownActive = setInterval(remainingTime, 1000);
}

function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  countdownValue =
    new Date(countdownDate).getTime() +
    new Date().getTimezoneOffset() * timeTable[2];
  updateDOM();
}

function reset() {
  //hide countdown, show Input
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  completeEl.hidden = true;
  //stop countdown
  clearInterval(countdownActive);
  //reset values
  countdownTitle = "";
  countdownDate = "";
  countdownForm.reset();
}

//eventlisteners
countdownForm.addEventListener("submit", updateCountdown);
[countdownBtn, completeBtn].forEach(el => el.addEventListener("click", reset));
