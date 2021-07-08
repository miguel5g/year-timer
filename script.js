const ONE_DAY = 1000 * 60 * 60 * 24,
  ONE_HOUR = 1000 * 60 * 60,
  ONE_MINUTE = 1000 * 60,
  ONE_SECOND = 1000;

document.addEventListener("DOMContentLoaded", function () {
  const timerDays = document.querySelector("div.timer-days strong"),
    timerHours = document.querySelector("div.timer-hours strong"),
    timerMinutes = document.querySelector("div.timer-minutes strong"),
    timerSeconds = document.querySelector("div.timer-seconds strong");

  function format(time, len = 2) {
    return Math.floor(time).toString().padStart(len, "0");
  }

  function updateTimer() {
    const { days, hours, minutes, seconds } = getTimerData();

    timerDays.innerText = format(days, 3);
    timerHours.innerText = format(hours);
    timerMinutes.innerText = format(minutes);
    timerSeconds.innerText = format(seconds);
  }

  const { seconds } = getTimerData();
  updateTimer();
  setTimeout(() => {
    updateTimer();
    setInterval(updateTimer, ONE_SECOND);
  }, Math.floor((seconds - Math.floor(seconds)) * 1000));

  fetch("./assets/background.jpg")
    .then((response) => response.blob())
    .then((blob) => {
      var reader = new FileReader();
      reader.onload = function () {
        document.querySelector(
          "body"
        ).style.backgroundImage = `url("${this.result}")`;
      };
      reader.readAsDataURL(blob);
    });
});

function getTimerData() {
  const timeLeft = new Date("2021", "11", "32").getTime() - Date.now();

  const days = timeLeft / ONE_DAY;
  const hours = (timeLeft % ONE_DAY) / ONE_HOUR;
  const minutes = (timeLeft % ONE_HOUR) / ONE_MINUTE;
  const seconds = (timeLeft % ONE_MINUTE) / ONE_SECOND;

  return { days, hours, minutes, seconds };
}
