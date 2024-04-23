import Notiflix from 'notiflix';

const delayValue = document.querySelector('[name = "delay"]');
const stepValue = document.querySelector('[name = "step"]');
const amountValue = document.querySelector('[name = "amount"]');
const button = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      } else {
        Notiflix.Notify.warning(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      }
    }, delay);
  });
}

button.addEventListener('click', ev => {
  ev.preventDefault();
  let currentDelay = parseInt(delayValue.value);

  for (let i = 0; i < amountValue.value; i++) {
    createPromise(i + 1, currentDelay);

    currentDelay += parseInt(stepValue.value);
  }
});
