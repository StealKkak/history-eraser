export async function getStopRecording() {
    const result = await chrome.storage.local.get('stopRecording');
    return result.stopRecording ?? '1';
}

export async function setStopRecording(value) {
    await chrome.storage.local.set({ stopRecording: value });
}

export function updateActiveState(activeBtn, deactiveBtn, value) {
    if (value === '1') {
        activeBtn.classList.add('active');
        deactiveBtn.classList.remove('active');
    } else {
        activeBtn.classList.remove('active');
        deactiveBtn.classList.add('active');
    }
}

export function clearHistory() {
    chrome.history.deleteAll(() => {
        alert('모든 방문 기록이 삭제되었습니다.');
    });
}
