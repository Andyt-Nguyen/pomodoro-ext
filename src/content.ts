import Timer from './helpers/timer';

(async function () {
	/* Body Tag */
	const bodyTag: HTMLBodyElement = document.querySelector(
		'body'
	) as HTMLBodyElement;
	/* Head Tag */
	const headTag: HTMLHeadElement = document.querySelector(
		'head'
	) as HTMLHeadElement;
	/* Container Div */
	const container: HTMLDivElement = document.createElement('div');
	/* Timer Div */
	const timerDiv: HTMLDivElement = document.createElement('div');
	setupHtml();

	const timer: Timer = new Timer(1, 1, timerDiv);
	timer.startTimer();

	// opens on existing tabs
	chrome.runtime.onMessage.addListener(function (request) {
		console.log('REQUEST', request);
		timer.minutes = request.minutes;
		timer.seconds = request.seconds;
		renderTimer();
	});

	function renderTimer() {
		container.classList.remove('hidden');
		container.classList.add('__timer-container');
		container.classList.add('animate__animated');
		container.classList.add('animate__bounceInRight');
	}
	function setupHtml() {
		const cssStyleSheet = `
		.__timer-container {
			position: fixed;
			bottom: 0;
			right: 0;
			transition: 400ms all linear;
			background: rgba(35,35,35,0.8);
			color: white;
			font-size: 16px;
			font-family: Helvetica, Sans-Serif;
			border-top-left-radius: 5px;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 150px;
			height: 50px;
		}

		.__timer-container:hover {
			width: 300px;
			height: 100px;
		}

		.__timer-container .timer {
			font-size: 2.5em; 
		}

		.__timer-container button[type='button'] {
			padding: 0.5rem 1.2rem;
			border-radius: 0.1rem;
			border: none;
			font-size: 1rem;
			text-transform: uppercase;
		}

		.hidden {
			display: none;
		}
	`;

		container.classList.add('hidden');

		timerDiv.classList.add('timer');
		container.appendChild(timerDiv);

		const wrapper = document.createElement('div');
		const styleTag = document.createElement('style');
		styleTag.innerHTML = cssStyleSheet;

		const animateCssLibrary =
			'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

		const animateCssLink = document.createElement('link');
		animateCssLink.setAttribute('rel', 'stylesheet');
		animateCssLink.setAttribute('href', animateCssLibrary);

		headTag.appendChild(styleTag);
		headTag.appendChild(animateCssLink);
		wrapper.appendChild(container);
		bodyTag.appendChild(wrapper);
	}
})();
