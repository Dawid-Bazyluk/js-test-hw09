import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('[data-start]');
const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate <= now) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
      startButton.dataset.start = selectedDate;
    }
  },
};

flatpickr('input#datetime-picker', options);

startButton.addEventListener('click', ev => {
  const { start } = ev.currentTarget.dataset;
  const timeThen = new Date(start);
  let interval = null;
  interval = setInterval(() => {
    const timeNow = new Date();
    const timeLeft = timeThen.getTime() - timeNow.getTime();

    const timeLeftObj = convertMs(timeLeft);

    if (timeLeft >= 0) {
      daysCounter.innerText = `${timeLeftObj.days}`.padStart(2, '0');
      hoursCounter.innerText = `${timeLeftObj.hours}`.padStart(2, '0');
      minutesCounter.innerText = `${timeLeftObj.minutes}`.padStart(2, '0');
      secondsCounter.innerText = `${timeLeftObj.seconds}`.padStart(2, '0');
    }

    if (timeLeft <= 0) clearInterval(interval);
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
