const clock = document.querySelector("h2#clock");
const todayDate = document.querySelector("h4#todayDate");

const date = new Date();

function getClock() {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}`;
}

const yoil = "일월화수목금토일";

function getDate() {
  todayDate.innerText = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${yoil[date.getDay()]}요일`;
}

getClock();
getDate();
setInterval(getClock, 1000);
