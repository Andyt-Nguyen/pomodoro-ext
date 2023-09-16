(function () {
	const startBtn: HTMLButtonElement = document.querySelector(
		'#start-btn'
	) as HTMLButtonElement;
	const breakBtn: HTMLButtonElement = document.querySelector(
		'#break-btn'
	) as HTMLButtonElement;
	const pauseBtn: HTMLButtonElement = document.querySelector(
		'#pause-btn'
	) as HTMLButtonElement;
	const continueBtn: HTMLButtonElement = document.querySelector(
		'#continue-btn'
	) as HTMLButtonElement;

	const body: HTMLBodyElement = document.querySelector(
		'body'
	) as HTMLBodyElement;

	const timer: HTMLHeadingElement = document.querySelector(
		'.clock'
	) as HTMLHeadingElement;

	const WORK_MIN = 25;
	const CHILL_MIN = 5;
	const SECONDS = 60;

	let isBreakTime = false;
	let seconds = SECONDS;
	let minutes = WORK_MIN;
	let timingInterval: number | undefined;

	renderTimer(WORK_MIN, SECONDS);

	startBtn.addEventListener('click', () => {
		startBtn.classList.add('hidden');
		pauseBtn.classList.remove('hidden');
		pauseBtn.classList.add('animate__fadeInLeft');
		startTimer();
	});

	pauseBtn.addEventListener('click', () => {
		pauseBtn.classList.add('hidden');
		startBtn.classList.remove('hidden');
		startBtn.classList.add('animate__fadeInLeft');
		clearInterval(timingInterval);
	});

	breakBtn.addEventListener('click', function () {
		clearInterval(timingInterval);
		switchTimer();
		this.classList.add('hidden');
		continueBtn.classList.remove('hidden');
		continueBtn.classList.add('animate__fadeInRight');
	});

	continueBtn.addEventListener('click', function () {
		clearInterval(timingInterval);
		switchTimer();
		this.classList.add('hidden');
		breakBtn.classList.remove('hidden');
		breakBtn.classList.add('animate__fadeInRight');
	});

	function renderTimer(min: number, sec: number) {
		const minFormat = min < 10 ? `0${min}` : min;
		const secFormat = sec < 10 ? `0${sec}` : sec;
		if (sec === 60) {
			timer.textContent = `${minFormat}:00`;
			return;
		}
		timer.textContent = `${minFormat}:${secFormat}`;
		return;
	}

	function startTimer() {
		timingInterval = setInterval(() => {
			if (minutes <= 0 && seconds <= 0) {
				clearInterval(timingInterval);
				switchTimer();
				return;
			}
			if (seconds === 0) {
				seconds = SECONDS;
			}
			if (seconds === 60) {
				minutes--;
			}
			seconds--;
			renderTimer(minutes, seconds);
		}, 1000);
	}

	function switchTimer() {
		isBreakTime = !isBreakTime;
		if (isBreakTime) {
			body.classList.remove('bg-black');
			body.classList.add('bg-blue');
			minutes = CHILL_MIN;
			seconds = SECONDS;
		} else {
			body.classList.remove('bg-blue');
			body.classList.add('bg-black');
			minutes = WORK_MIN;
			seconds = SECONDS;
		}

		if (startBtn.classList.contains('hidden')) {
			startBtn.classList.remove('hidden');
			pauseBtn.classList.add('hidden');
			startBtn.classList.add('animate__fadeInLeft');
		}
		renderTimer(minutes, seconds);
	}


	function btnSwitch(btnToRemove: HTMLButtonElement, btnToAdd: HTMLButtonElement, className: string) {
		
	}
})();
