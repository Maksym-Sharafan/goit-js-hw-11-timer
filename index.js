const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
}

class CountdownTimer {

  constructor({ targetDate, selector }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.selector = selector;
    this.start()
  }

  start() {
    const finishDate = this.targetDate;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = finishDate - currentTime;

      if (deltaTime <= 0) {
        return;
      }

      const time = this.getTimeComponents(deltaTime);

      this.updateClockFace(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, mins, secs };
  }

  updateClockFace({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 28, 2022'),
});