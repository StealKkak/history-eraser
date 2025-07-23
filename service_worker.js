const badgeColors = {
    green: [50, 199, 80, 160],
    red: [220, 27, 37, 160]
};

async function updateBadge(colorKey, text) {
    const color = badgeColors[colorKey] || [128, 128, 128, 160];
    await chrome.action.setBadgeBackgroundColor({ color });
    await chrome.action.setBadgeText({ text });
}

chrome.runtime.onInstalled.addListener(async () => {
    await chrome.storage.local.set({ stopRecording: 1 });
    await updateBadge('green', 'on');
});

chrome.runtime.onStartup.addListener(async () => {
    const result = await chrome.storage.local.get('stopRecording');
    const state = result.stopRecording ?? 1;
    await updateBadge(state == 1 ? 'green' : 'red', state == 1 ? 'on' : 'off');
});

chrome.history.onVisited.addListener(async (historyItem) => {
    const result = await chrome.storage.local.get('stopRecording');
    if (result.stopRecording == 1) {
        chrome.history.deleteUrl({ url: historyItem.url });
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'updateBadge') {
        const color = message.state === 'on' ? 'green' : 'red';
        updateBadge(color, message.state);
    }
});
