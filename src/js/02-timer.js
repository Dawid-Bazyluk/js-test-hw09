import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('[data-start]');
const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');

startButton.disabled = true;
let selectedDate;
let nowDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= nowDate) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

const addLeadingZero = value => {
  return value.padStart(2, 0);
};

function convertMs(ms) {
  nowDate = new Date();
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

  daysCounter.innerText = addLeadingZero(String(days));
  hoursCounter.innerText = addLeadingZero(String(hours));
  minutesCounter.innerText = addLeadingZero(String(minutes));
  secondsCounter.innerText = addLeadingZero(String(seconds));
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  const interval = setInterval(() => {
    let dateDifference = selectedDate.getTime() - nowDate.getTime();
    if (dateDifference > 0) {
      convertMs(dateDifference);
    } else {
      clearInterval(interval);
    }
  }, 1000);
});
