chrome.storage.onChanged.addListener((changes, namespace) => {
	console.log('Changes', changes);
	console.log('namespace', namespace);
});
chrome.tabs.onUpdated.addListener((tabId, tab) => {});
