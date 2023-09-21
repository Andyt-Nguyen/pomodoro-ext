chrome.storage.onChanged.addListener(async (changes) => {
	const timeStarted = changes.newValue as number;
	if (!timeStarted) return null;
	const tabs = await chrome.tabs.query({});
	const now = new Date().getTime() / 1000;

	const timePassed = getMinutesAndSeconds(now - timeStarted);
	tabs.map((tab) =>
		chrome.tabs.sendMessage(tab?.id ?? 0, {
			minutes: 24 - timePassed.minutes,
			seconds: 60 - timePassed.seconds,
		})
	);
});

chrome.tabs.onCreated.addListener(async (tab) => {
	const timeStarted = (await chrome.storage.local
		.get('timeStarted')
		.catch((err) => console.log('ERREXT', err))) as { timeStarted: number };

	if (timeStarted.timeStarted) {
		await sendAllTabRequestTime();
	}
});

chrome.tabs.onActivated.addListener(async () => {
	const timeStarted = (await chrome.storage.local
		.get('timeStarted')
		.catch((err) => console.log('ERREXT', err))) as { timeStarted: number };

	if (timeStarted.timeStarted) {
		await sendAllTabRequestTime();
	}
});

chrome.tabs.onRemoved.addListener(async () => {
	const tabs = await chrome.tabs.query({});
	if (tabs.length <= 0) {
		await chrome.storage.local.clear();
	}
});

chrome.windows.onRemoved.addListener(async (id) => {
	console.log('WINDOWS CLOSED');
	await chrome.storage.local.clear();
});

async function sendAllTabRequestTime() {
	const timeStarted = (await chrome.storage.local
		.get('timeStarted')
		.catch((err) => console.log('ERREXT', err))) as { timeStarted: number };

	if (!timeStarted) return null;
	const tabs = await chrome.tabs.query({});
	const now = new Date().getTime() / 1000;

	const timePassed = getMinutesAndSeconds(now - timeStarted.timeStarted);
	tabs.map((tab) =>
		chrome.tabs.sendMessage(tab?.id ?? 0, {
			minutes: 24 - timePassed.minutes,
			seconds: 60 - timePassed.seconds,
		})
	);
}

function getMinutesAndSeconds(totalSeconds: number) {
	var min = Math.floor(totalSeconds / 60);
	var sec = totalSeconds % 60;
	return {
		minutes: min,
		seconds: Math.floor(sec),
	};
}
