const WORK_MIN = 25;
const CHILL_MIN = 5;
const MAX_SECONDS = 60;

export default class Timer {
	minutes;
	seconds;
	timingInterval;
	isBreakTime;
	renderEl;
	constructor(
		minutes: number = 25,
		seconds: number = 0,
		renderEl: HTMLElement
	) {
		this.minutes = minutes;
		this.seconds = seconds;
		this.timingInterval = 0;
		this.isBreakTime = false;
		this.renderEl = renderEl;
	}

	startTimer() {
		this.timingInterval = setInterval(() => {
			if ((this.minutes <= 0 && this.seconds <= 0)) {
				clearInterval(this.timingInterval);
				this.switchTimer();
				return;
			}
			if (this.seconds <= 0) {
				this.seconds = MAX_SECONDS;
			}
			if (this.seconds >= MAX_SECONDS) {
				this.minutes--;
			}
			this.seconds--;
			this.renderTimer();
		}, 1000);
	}

	pauseTimer() {
		clearInterval(this.timingInterval);
	}

	switchTimer() {
		this.isBreakTime = !this.isBreakTime;
		if (this.isBreakTime) {
			this.minutes = CHILL_MIN;
			this.seconds = MAX_SECONDS;
		} else {
			this.minutes = WORK_MIN;
			this.seconds = MAX_SECONDS;
		}
		this.renderTimer();
	}

	renderTimer() {
		const minFormat = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
		const secFormat = this.seconds < 10 ? `0${this.seconds}` : this.seconds;

		if (this.seconds === MAX_SECONDS) {
			this.renderEl.innerText = `${minFormat}:00`;
			return;
		}

		this.renderEl.innerText = `${minFormat}:${secFormat}`;
	}
}
