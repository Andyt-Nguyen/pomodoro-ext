import Timer from './helpers/timer';

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

	const timerEl: HTMLHeadingElement = document.querySelector(
		'.clock'
	) as HTMLHeadingElement;

	const timer = new Timer(25, 60, timerEl);

	timer.renderTimer();

	startBtn.addEventListener('click', async () => {
		startBtn.classList.add('hidden');
		pauseBtn.classList.remove('hidden');
		pauseBtn.classList.add('animate__fadeInLeft');
		timer.startTimer();
	});

	pauseBtn.addEventListener('click', () => {
		pauseBtn.classList.add('hidden');
		startBtn.classList.remove('hidden');
		startBtn.classList.add('animate__fadeInLeft');
		timer.pauseTimer();
	});

	breakBtn.addEventListener('click', function () {
		timer.pauseTimer();
		timer.switchTimer();
		console.log('Break time', timer.isBreakTime);
		if (timer.isBreakTime) {
			body.classList.remove('bg-black');
			body.classList.add('bg-blue');
		} else {
			body.classList.remove('bg-blue');
			body.classList.add('bg-black');
		}
		this.classList.add('hidden');
		continueBtn.classList.remove('hidden');
		continueBtn.classList.add('animate__fadeInRight');

		if (startBtn.classList.contains('hidden')) {
			startBtn.classList.remove('hidden');
			pauseBtn.classList.add('hidden');
			startBtn.classList.add('animate__fadeInLeft');
		}
	});

	continueBtn.addEventListener('click', function () {
		timer.pauseTimer();
		timer.switchTimer();
		if (!timer.isBreakTime) {
			body.classList.remove('bg-blue');
			body.classList.add('bg-black');
		}
		this.classList.add('hidden');
		breakBtn.classList.remove('hidden');
		breakBtn.classList.add('animate__fadeInRight');
	});
})();
