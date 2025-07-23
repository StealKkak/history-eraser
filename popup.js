const toggleBtn = document.getElementById('toggleRecording');
const clearBtn = document.getElementById('clearHistory');

function updateButton(state) {
    if (state === 1 || state === '1') {
        toggleBtn.textContent = '기록 저장 중지 (ON)';
        toggleBtn.classList.add('active');
    } else {
        toggleBtn.textContent = '기록 저장 시작 (OFF)';
        toggleBtn.classList.remove('active');
    }
}

chrome.storage.local.get('stopRecording', (result) => {
    const state = result.stopRecording ?? 1;
    updateButton(state);
});

toggleBtn.addEventListener('click', () => {
    chrome.storage.local.get('stopRecording', (result) => {
        let current = result.stopRecording ?? 1;
        let newState = current == 1 ? 0 : 1;
        chrome.storage.local.set({ stopRecording: newState }, () => {
            updateButton(newState);
            chrome.runtime.sendMessage({ type: 'updateBadge', state: newState == 1 ? 'on' : 'off' });
        });
    });
});

clearBtn.addEventListener('click', () => {
    if (confirm('모든 방문 기록을 삭제하시겠습니까?')) {
        chrome.history.deleteAll(() => {
            alert('모든 방문 기록이 삭제되었습니다.');
        });
    }
});